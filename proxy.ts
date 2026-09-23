import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

// Routes that require authentication.
// /onboarding is a client page with no server-side auth check of its own, so
// without it here a signed-out visitor could fill in every step and only then
// hit a silent 401 when saving. The other pages also guard themselves with
// auth(); listing them keeps the redirect consistent.
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/lessons(.*)",
  "/society(.*)",
  "/admin(.*)",
]);

const clerkHandler = clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  },
  {
    // Set in code so auth.protect() always sends signed-out visitors to our own
    // /sign-in page. Without these (and without the NEXT_PUBLIC_CLERK_* env
    // vars) Clerk falls back to its hosted Account Portal on *.accounts.dev.
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  }
);

// Next.js 16 uses "proxy" as the named export (middleware.ts is deprecated)
export function proxy(request: NextRequest, event: Parameters<typeof clerkHandler>[1]) {
  return clerkHandler(request, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
