import Link from "next/link";
import type { ReactNode } from "react";
import { Show } from "@clerk/nextjs";

type StartButtonProps = {
  className?: string;
  /** Label for visitors who are not signed in. */
  children: ReactNode;
  /** Label for signed-in users; falls back to `children`. */
  signedInLabel?: ReactNode;
  /** Optional handler (used by the mobile menu to close itself). */
  onClick?: () => void;
};

// Signed-out visitors go to sign-up; signed-in users go straight to the
// dashboard, so the CTA never dead-ends on the landing page.
//
// Clerk v7 replaced <SignedIn>/<SignedOut> with <Show when="signed-in">.
// Show resolves on the server inside RSCs and on the client inside client
// components, so this one component works in both Hero/CtaSection and Navbar.
export default function StartButton({
  className,
  children,
  signedInLabel,
  onClick,
}: StartButtonProps) {
  return (
    <Show
      when="signed-in"
      fallback={
        <Link href="/sign-up" className={className} onClick={onClick}>
          {children}
        </Link>
      }
    >
      <Link href="/dashboard" className={className} onClick={onClick}>
        {signedInLabel ?? children}
      </Link>
    </Show>
  );
}
