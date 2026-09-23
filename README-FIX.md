# Fix: sign-in flow broken

Drop these files over the project root, keeping the folder structure.
All six replace existing files. Nothing new to install, no DB changes.

    components/ui/StartButton.tsx          1. deploy is failing
    proxy.ts                               2. sign-in redirects inconsistent / off-site
    app/layout.tsx                         2. + 3. post-sign-in lands on "/"
    app/onboarding/page.tsx                4. onboarding fails silently
    components/onboarding/WelcomeStep.tsx  4. shows the error
    .env.local.example                     comment only

## 1. Every deploy since commit 9a3da19 fails, so none of it is live
`main` still has the first StartButton, which imports `SignedIn`/`SignedOut`.
Clerk v7 removed both, so `next build` fails and Vercel keeps serving the
last good deploy. Replaced with Clerk v7's `<Show when="signed-in">`.

## 2. Signed-out users were sent to Clerk's hosted page, or not protected at all
`proxy.ts` only protected `/dashboard`, and no sign-in URL was set in code.
Signed-out request results, tested with the redirect env vars unset:

    route         before                              after
    /dashboard    -> https://<x>.accounts.dev/sign-in  -> /sign-in?redirect_url=...
    /onboarding   200 (no protection)                  -> /sign-in?redirect_url=...
    /lessons      -> /sign-in (no return URL)          -> /sign-in?redirect_url=...
    /society      -> /sign-in (no return URL)          -> /sign-in?redirect_url=...
    /admin        -> /sign-in (no return URL)          -> /sign-in?redirect_url=...

The fix protects all five routes, which is also what SETUP.md step 4 asks for,
and passes `signInUrl`/`signUpUrl` to `clerkMiddleware`. Each route now
sends users to your own branded sign-in page and back again afterwards.
`/`, `/sign-in`, `/sign-up` and the API routes are unchanged (the API still
answers 401 itself).

## 3. After signing in, users could land back on the landing page
Clerk reads every redirect setting only from `NEXT_PUBLIC_CLERK_*` env vars,
which `.env.local.example` marked "optional". If they are missing in Vercel,
Clerk sends users to "/" after sign-in and links "Sign up" to its hosted page.
`ClerkProvider` in `app/layout.tsx` now sets:

    signInUrl="/sign-in"   signInFallbackRedirectUrl="/dashboard"
    signUpUrl="/sign-up"   signUpFallbackRedirectUrl="/dashboard"

`/dashboard` then forwards new users to `/onboarding`, as before.
Env vars are still optional overrides.

## 4. A failed onboarding save left new users stuck with no message
If `/api/onboarding` failed, the error only went to the browser console and the
button re-enabled itself. Now the API's error message appears above the
button. A 401 (session expired mid-onboarding) sends the user back through
sign-in and returns them to `/onboarding`.

## Verified
- `next build` on Next 16.2.2: compiles, TypeScript passes, 23/23 routes.
- `next start` with the redirect env vars unset, requesting each route while
  signed out: results are in the table above.
- Rendered `/sign-in` carries the four ClerkProvider props above.

## Not verified — please check after deploying
The sandbox this was built in cannot reach Clerk's servers, so a real signed-in
round trip (sign in -> /dashboard -> /onboarding -> save) was not exercised.
After deploying, test one real sign-in and one new sign-up. If onboarding
now shows an error message, read it: it comes straight from
`/api/onboarding`. A "Something went wrong" there usually means the `users`
table is missing a column the API writes (grade, interest, created_at,
updated_at...). The base `users` schema is not in this repo, so that could
not be checked here.
