import Link from "next/link";
import type { ReactNode } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

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
// dashboard. Clerk resolves SignedIn/SignedOut on the server, so there is no
// flash of the wrong link on first paint.
export default function StartButton({
  className,
  children,
  signedInLabel,
  onClick,
}: StartButtonProps) {
  return (
    <>
      <SignedOut>
        <Link href="/sign-up" className={className} onClick={onClick}>
          {children}
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" className={className} onClick={onClick}>
          {signedInLabel ?? children}
        </Link>
      </SignedIn>
    </>
  );
}
