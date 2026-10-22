// lib/badges.ts
// Badge engine (guideline v2.0, section 10). Every rule is re-evaluated after
// every lesson completion and every purchase — cheap, and it means no event
// has to know which badge it might trigger.
import sql from "@/lib/db";
import { CURRICULUM } from "@/lib/curriculum";
import { LESSONS } from "@/lib/lesson-content";
import { BADGES } from "@/lib/constants";
import { BADGE_BONUS, LESSON_REFS, levelLessonIds } from "@/lib/coin-config";
import { SOCIETY_ITEMS, TIERS } from "@/lib/society-config";

export interface NewBadge {
  id:    string;
  bonus: number;
}

export interface BadgeState {
  lessonsCompleted: string[];
  coinsEarned:      number;
  mcqStreak:        number;
  badges:           string[];
  firstTry:         Record<string, boolean>; // slide_id → first_try_correct
  itemCounts:       Record<string, number>;  // item_id → copies owned
}

const QUIZ_WHIZ_STREAK        = 5;
const COIN_COLLECTOR_COINS    = 100;
const SOCIETY_ARCHITECT_ITEMS = 10;

// MCQ slide ids for a set of lessons, or null if any lesson has no content
// yet or there are no MCQs at all. null means "cannot be aced": an empty
// set must never count as every-question-correct.
function mcqIdsFor(lessonIds: string[]): string[] | null {
  if (lessonIds.length === 0) return null;
  const ids: string[] = [];
  for (const id of lessonIds) {
    const lesson = LESSONS[id];
    if (!lesson) return null;
    ids.push(...lesson.slides.filter((s) => s.type === "mcq").map((s) => s.id));
  }
  return ids.length > 0 ? ids : null;
}

function acedOnFirstTry(lessonIds: string[], firstTry: Record<string, boolean>): boolean {
  const ids = mcqIdsFor(lessonIds);
  return ids !== null && ids.every((id) => firstTry[id] === true);
}

function completedAll(lessonIds: string[], completed: string[]): boolean {
  return lessonIds.length > 0 && lessonIds.every((id) => completed.includes(id));
}

// Pure rule evaluation: which badges does this state earn? Returns every
// earned id, including ones already owned.
export function evaluateBadges(state: BadgeState): string[] {
  const { lessonsCompleted: done, firstTry, itemCounts } = state;
  const earned = new Set<string>();

  const firstLessonId = CURRICULUM[0]?.lessons[0]?.id;
  if (firstLessonId && done.includes(firstLessonId))       earned.add("first-steps");
  if (completedAll(levelLessonIds(1), done))                earned.add("foundation-builder");
  if (completedAll(levelLessonIds(2), done))                earned.add("institution-insider");
  if (completedAll(levelLessonIds(3), done))                earned.add("citizen-champion");
  if (state.mcqStreak >= QUIZ_WHIZ_STREAK)                  earned.add("quiz-whiz");
  if (CURRICULUM.some((lvl) => acedOnFirstTry(levelLessonIds(lvl.number), firstTry)))
                                                            earned.add("perfect-scholar");
  if (done.includes(LESSON_REFS.voting))                    earned.add("voting-champion");
  if (done.includes(LESSON_REFS.constitution) &&
      acedOnFirstTry([LESSON_REFS.constitution], firstTry)) earned.add("constitution-keeper");

  const totalItems = Object.values(itemCounts).reduce((a, n) => a + n, 0);
  if (totalItems >= SOCIETY_ARCHITECT_ITEMS)                earned.add("society-architect");
  const ownedTiers = new Set(
    SOCIETY_ITEMS.filter((i) => (itemCounts[i.id] ?? 0) > 0).map((i) => i.tier)
  );
  if (TIERS.every((t) => ownedTiers.has(t.tier)))           earned.add("master-builder");

  // Coin Collector uses lifetime coins, projected to include the bonuses this
  // same run is about to pay — a +15 level bonus can be what crosses 100.
  const pendingBonus = [...earned]
    .filter((id) => !state.badges.includes(id))
    .reduce((sum, id) => sum + (BADGE_BONUS[id] ?? 0), 0);
  if (state.coinsEarned + pendingBonus >= COIN_COLLECTOR_COINS) earned.add("coin-collector");

  // Complete Citizen last: every lesson, plus all 11 other badges — counting
  // both those already owned and those earned in this run.
  const allLessonIds = CURRICULUM.flatMap((lvl) => lvl.lessons.map((l) => l.id));
  const owned = new Set([...state.badges, ...earned]);
  if (completedAll(allLessonIds, done) &&
      BADGES.every((b) => b.id === "complete-citizen" || owned.has(b.id))) {
    earned.add("complete-citizen");
  }

  return [...earned];
}

async function loadBadgeState(userId: string): Promise<BadgeState | null> {
  const [users, mcq, items] = await Promise.all([
    sql`SELECT lessons_completed, coins_earned, mcq_streak, badges
        FROM users WHERE clerk_id = ${userId} LIMIT 1`,
    sql`SELECT slide_id, first_try_correct FROM mcq_results WHERE clerk_id = ${userId}`,
    sql`SELECT item_id, COUNT(*)::integer AS qty
        FROM society_items WHERE clerk_id = ${userId} GROUP BY item_id`,
  ]);
  const u = users[0];
  if (!u) return null;
  return {
    lessonsCompleted: u.lessons_completed ?? [],
    coinsEarned:      Number(u.coins_earned ?? 0),
    mcqStreak:        Number(u.mcq_streak ?? 0),
    badges:           u.badges ?? [],
    firstTry:   Object.fromEntries(mcq.map((r) => [r.slide_id, r.first_try_correct === true])),
    itemCounts: Object.fromEntries(items.map((r) => [r.item_id, Number(r.qty)])),
  };
}

// Evaluate every rule and grant any new badges plus their coin bonuses.
// Returns only the badges this call actually added.
export async function awardBadges(userId: string): Promise<NewBadge[]> {
  const state = await loadBadgeState(userId);
  if (!state) return [];

  const ids = evaluateBadges(state).filter((id) => !state.badges.includes(id));
  if (ids.length === 0) return [];
  const bonuses = ids.map((id) => BADGE_BONUS[id] ?? 0);

  // One statement. `cur` locks the user row, so a concurrent call waits here,
  // then re-reads the badges this call added and adds nothing itself. `add`
  // is therefore exactly the set granted now: each bonus is paid once and
  // each badge is reported as new to exactly one caller.
  const rows = await sql`
    WITH cur AS (
      SELECT COALESCE(badges, '{}') AS badges
      FROM users WHERE clerk_id = ${userId}
      FOR UPDATE
    ),
    add AS (
      SELECT t.id, t.bonus
      FROM unnest(${ids}::text[], ${bonuses}::integer[]) AS t(id, bonus), cur
      WHERE NOT (t.id = ANY(cur.badges))
    )
    UPDATE users SET
      badges       = COALESCE(users.badges, '{}') || ARRAY(SELECT id FROM add),
      coins_earned = users.coins_earned + COALESCE((SELECT SUM(bonus) FROM add), 0)::integer,
      updated_at   = NOW()
    WHERE clerk_id = ${userId}
    RETURNING
      -- Same ORDER BY in both, so added_ids[i] pairs with added_bonuses[i].
      (SELECT COALESCE(array_agg(id    ORDER BY id), '{}') FROM add) AS added_ids,
      (SELECT COALESCE(array_agg(bonus ORDER BY id), '{}') FROM add) AS added_bonuses
  `;

  const addedIds: string[] = rows[0]?.added_ids ?? [];
  const addedBonuses: number[] = rows[0]?.added_bonuses ?? [];
  return addedIds.map((id, i) => ({ id, bonus: Number(addedBonuses[i] ?? 0) }));
}
