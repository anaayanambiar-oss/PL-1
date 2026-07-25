// app/lessons/[lessonId]/not-found.tsx
import Link from "next/link";

export default function LessonNotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center
                     justify-center px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="font-display font-black text-2xl text-ink mb-2">
        Lesson not found
      </h1>
      <p className="text-mid text-sm mb-8 text-center max-w-xs">
        This lesson doesn&apos;t exist yet — it might be coming soon!
      </p>
      <Link
        href="/dashboard"
        className="px-8 py-3.5 rounded-full bg-brand-orange text-white
                   font-bold shadow-orange hover:-translate-y-0.5 transition-all"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
