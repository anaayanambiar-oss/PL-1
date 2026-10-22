-- ============================================================
-- PoliticaLearn — Coins, Society Builder and Badges (guideline v2.0)
-- Run in Neon Dashboard → SQL Editor BEFORE deploying the new code.
--
-- Safe to re-run: every step is idempotent. The whole file runs in one
-- transaction, so a failure part-way leaves the database unchanged.
-- ============================================================

BEGIN;

-- ── 1. Coins and MCQ streak on users (guideline 5) ──────────────
ALTER TABLE users ADD COLUMN IF NOT EXISTS coins_earned INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mcq_streak   INTEGER NOT NULL DEFAULT 0;

-- ── 2. First-attempt MCQ results (one row per student per question, ever) ──
CREATE TABLE IF NOT EXISTS mcq_results (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id          TEXT NOT NULL,
  lesson_id         TEXT NOT NULL,
  slide_id          TEXT NOT NULL,
  first_try_correct BOOLEAN NOT NULL,
  answered_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (clerk_id, slide_id)
);
CREATE INDEX IF NOT EXISTS idx_mcq_results_clerk_lesson
  ON mcq_results (clerk_id, lesson_id);

-- ── 3. One row per Society Builder purchase ─────────────────────
CREATE TABLE IF NOT EXISTS society_items (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id     TEXT NOT NULL,
  item_id      TEXT NOT NULL,
  copy_no      INTEGER NOT NULL DEFAULT 1,
  price_paid   INTEGER NOT NULL CHECK (price_paid >= 0),
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (clerk_id, item_id, copy_no)
);

-- ── 4. Defaults on the society row ──────────────────────────────
-- The purchase route creates a society row with only clerk_id, so it no
-- longer has to know about the legacy unlocked/population columns. Those
-- columns stay in place (nothing reads them any more) but need defaults.
ALTER TABLE society ALTER COLUMN city_name   SET DEFAULT 'My City';
ALTER TABLE society ALTER COLUMN unlocked    SET DEFAULT '{}';
ALTER TABLE society ALTER COLUMN population  SET DEFAULT 0;
ALTER TABLE society ALTER COLUMN coins_spent SET DEFAULT 0;
UPDATE society SET coins_spent = 0 WHERE coins_spent IS NULL;

-- ── 5.1 Backfill coins for existing students ────────────────────
-- Recomputed from completed lessons (old XP is on a different scale).
-- Only touches students still at 0, so a re-run never wipes coins earned
-- after launch. Keep these amounts in sync with lib/coin-config.ts.
UPDATE users u SET coins_earned = COALESCE((
  SELECT SUM(m.coins)
  FROM (VALUES
    ('l1-1',10),('l1-2',12),('l1-3',12),('l1-4',11),('l1-5',11),
    ('l2-1',11),('l2-2',13),('l2-3',12),('l2-4',10),('l2-5',11),
    ('l3-1',10),('l3-2',12),('l3-3',10),('l3-4',10)
  ) AS m(id, coins)
  WHERE m.id = ANY(COALESCE(u.lessons_completed, '{}'))
), 0)
WHERE u.coins_earned = 0;

-- ── 5.2 Migrate old badge ids ───────────────────────────────────
-- Renames the four level badges and drops the four retired ones.
-- Unlike the guideline's version, badges with any OTHER id are kept, so
-- re-running after launch does not delete students' new badges.
UPDATE users SET badges = ARRAY(
  SELECT DISTINCT CASE b
    WHEN 'first-lesson'     THEN 'first-steps'
    WHEN 'level-1-complete' THEN 'foundation-builder'
    WHEN 'level-2-complete' THEN 'institution-insider'
    WHEN 'level-3-complete' THEN 'citizen-champion'
    ELSE b
  END
  FROM unnest(COALESCE(badges, '{}')) AS b
  WHERE b NOT IN ('streak-7', 'streak-30', 'perfect-score', 'all-complete')
)
WHERE badges IS NULL
   OR badges && ARRAY['first-lesson','level-1-complete','level-2-complete','level-3-complete',
                      'streak-7','streak-30','perfect-score','all-complete'];

-- ── 5.3 Carry old Society Builder buildings over ────────────────
-- One free society_items row per building a student had unlocked.
-- Old ids are mapped to the new catalog ids. A no-op if nobody had any.
INSERT INTO society_items (clerk_id, item_id, copy_no, price_paid)
SELECT s.clerk_id,
       CASE old.id
         WHEN 'municipality' THEN 'panchayat-office'
         WHEN 'parliament'   THEN 'parliament-house'
         ELSE old.id
       END,
       1, 0
FROM society s
CROSS JOIN LATERAL unnest(COALESCE(s.unlocked, '{}')) AS old(id)
WHERE old.id IN ('school', 'hospital', 'municipality', 'park', 'parliament')
ON CONFLICT (clerk_id, item_id, copy_no) DO NOTHING;

COMMIT;
