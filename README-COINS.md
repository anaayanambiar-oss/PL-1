# Coins, Society Builder and Badges (guideline v2.0)

## Install, in this order
1. **Run `migrations/coins-badges-society-v2.sql` in the Neon SQL Editor first.**
   The new code reads columns and tables this creates. It is safe to re-run.
2. Unzip over the project root, keeping folders. 37 files are added or replaced.
3. **Delete these 5 files.** Their replacements are in this zip, and the old
   files import config that no longer exists, so the build fails if they stay:

       app/api/onboarding/society/unlock/route.ts
       components/society/CityMap.tsx
       components/society/CityStats.tsx
       components/society/ElementsList.tsx
       components/society/UnlockModal.tsx

## Verified
- `next build` (Next 16.2.2): compiles, TypeScript passes, 25/25 routes.
- The routes' SQL, extracted word for word from the code, run against Postgres 16:
  48/48 checks pass, including forced two-session races. Covered: a double-click on
  Build, two purchases competing for one balance, concurrent badge awards,
  concurrent lesson completion, and concurrent first answers. All charged or paid
  exactly once.
- The migration was run twice against a copy of the current schema; the second run
  changed nothing.
- Badge rules and catalog: 38/38 unit tests.
- **Not verified:** the screens in a browser. Clerk can't be reached from the
  build sandbox, so nobody could sign in. Click through a lesson and the
  Society page once after deploying.

## Changes from the guideline (bugs found while testing)
- **Migration 5.1 and 5.2 were unsafe to re-run.** 5.2 kept only the 4 old badge
  ids, so a second run would wipe every student's new badges. 5.1 would erase coins
  earned after launch. Both are now guarded.
- **Badge award:** "newly earned" is now decided inside the SQL, which locks the
  user row. The guideline compared the badges it read before the update with
  those returned after it, so two racing calls both showed the same badge as new.
  The coins were still only paid once.
- **Perfect Scholar / Constitution Keeper:** a level or lesson with no MCQ content
  no longer counts as "every question correct". Levels 2 and 3 have no content
  yet, so without this everyone would have been awarded Perfect Scholar on day one.
- **Coin Collector** counts a level bonus earned in the same run (90 + 15 = 105).
- **Lesson complete:** `alreadyCompleted` now comes from the UPDATE itself. A
  separate SELECT let two racing requests both report "+coins".
- **MCQ answer:** no first attempt is recorded for a student who has no `users` row,
  so their bonus can't be lost.
- **Purchase:** the guideline says a racing second click "fails as a whole". In
  practice the first statement makes it wait, then re-check against fresh data:
  a once-only item is refused (402), an unlimited item becomes a correctly paid
  copy 2. The unique key still guards against duplicate purchases (409, no
  charge), which was tested.

## Also fixed
- **Build and rename were broken in production:** the UI called
  `/api/society/unlock`, but the route lived at `/api/onboarding/society/unlock`,
  so both returned 404. The new `/api/society/purchase` and `/api/society/rename`
  routes are at the paths the UI calls.
- **Levels 2 and 3 showed as locked for everyone** (guideline Phase 0): the level
  now comes from completed lessons, on the dashboard, lessons page and admin.

## Decisions still needed from Anaaya
1. **Curriculum (guideline 2.1).** The code still uses today's 12 lessons. The
   topic-linked ids are kept in one place, `LESSON_REFS` in `lib/coin-config.ts`.
   Right now **Voting Champion is awarded for `l1-4` "The Constitution Explained"**
   and Constitution Keeper is tied to `l2-1` "Your Fundamental Rights". Fix by
   changing the ids there, or by adopting the 14-lesson list.
2. **Economy (guideline 11):** a perfect student earns about 340 coins; the
   catalog costs 1,093. Options A, B or C are number changes in config files.
3. Prices, and the +15 level-badge bonus, are proposals. Confirm them.

## Assets
- **Hospital and Panchayat Office now have artwork.** It was taken from your
  `public/images/colored*/bnw*` files, losslessly, into `public/society/*.webp`
  (a coloured and a locked version each).
- **These 4 uploads are NOT images:** `constitutionmonument…json`,
  `mediatower…json`, `nationalflagplaza…json` and `stretlight icon…json` are image
  *metadata* from an online converter. They contain no picture data. Upload the
  original PNG/JPEG files instead.
- Everything else shows an emoji until its file exists:
  - `/public/coins/coin.svg`
  - `/public/badges/{badge-id}.png` (12 files)
  - `/public/society/{item-id}.png` (add `image:` for the item in
    `lib/society-config.ts`)
  - `/public/animations/coin-bag.json` (the existing mascot animation plays
    until then)
- Use lowercase, hyphen-only file names; the build is case-sensitive.

## Unrelated, noticed in passing
`package-lock.json` is out of sync with `package.json`: it's missing
`@neondatabase/serverless` and the Lottie player. `npm ci` fails, but Vercel's
`npm install` works. Run `npm install` locally and commit the lockfile.
