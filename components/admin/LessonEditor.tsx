// components/admin/LessonEditor.tsx
"use client";

import { useState } from "react";
import type { LessonContent, Slide, SlideType } from "@/lib/lesson-types";
import SlideCard from "./SlideCard";
import AddSlideMenu from "./AddSlideMenu";

interface Props {
  lesson: LessonContent;
  mode:   "edit" | "new";
}

export default function LessonEditor({ lesson, mode }: Props) {
  const [slides,   setSlides]   = useState<Slide[]>(lesson.slides ?? []);
  const [title,    setTitle]    = useState(lesson.title ?? "");
  const [xp,       setXp]       = useState(lesson.xpReward ?? 50);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [preview,  setPreview]  = useState(false);

  // Add a new blank slide of given type
  function addSlide(type: SlideType) {
    const id    = `${lesson.id}-s${Date.now()}`;
    const order = slides.length + 1;

    const blanks: Record<SlideType, Slide> = {
      overview: {
        id, type: "overview", order,
        lessonTitle: title,
        goal: "",
        bulletPoints: ["", "", ""],
      } as any,
      explanation: {
        id, type: "explanation", order,
        heading: "", body: "", imageEmoji: "",
      } as any,
      video: {
        id, type: "video", order,
        title: "", videoUrl: "", duration: "", sourceCredit: "",
      } as any,
      mcq: {
        id, type: "mcq", order,
        question: "", isRolePlay: false, roleContext: "",
        imageEmoji: "", explanation: "",
        options: [
          { id:"a", text:"", icon:"", isCorrect: true  },
          { id:"b", text:"", icon:"", isCorrect: false },
          { id:"c", text:"", icon:"", isCorrect: false },
          { id:"d", text:"", icon:"", isCorrect: false },
        ],
      } as any,
      completion: {
        id, type: "completion", order,
        xpEarned: xp, badgeId: lesson.badgeId ?? "",
        badgeName: "", badgeIcon: "",
      } as any,
    };

    setSlides((prev) => [...prev, blanks[type]]);
  }

  // Update a single slide
  function updateSlide(index: number, updated: Slide) {
    setSlides((prev) => prev.map((s, i) => (i === index ? updated : s)));
  }

  // Remove a slide
  function removeSlide(index: number) {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }

  // Move slide up or down
  function moveSlide(index: number, direction: "up" | "down") {
    const next = [...slides];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    // Re-number orders
    setSlides(next.map((s, i) => ({ ...s, order: i + 1 })));
  }

  // Save — generates the TypeScript code for lesson-content.ts
  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/lessons", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          title,
          xpReward: xp,
          slides,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">

      {/* Lesson metadata */}
      <div className="bg-gray-900 rounded-2xl border border-white/[0.06] p-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
          Lesson Info
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Lesson Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. What is a Government?"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-white/10
                         text-white text-sm placeholder:text-gray-600
                         focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              XP Reward
            </label>
            <input
              type="number"
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              min={0} max={500} step={25}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-white/10
                         text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Lesson ID
            </label>
            <input
              value={lesson.id}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-white/5
                         text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Slides ({slides.length})
        </h2>
        <button
          onClick={() => setPreview(!preview)}
          className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg
                     hover:bg-white/10 transition-all"
        >
          {preview ? "Edit Mode" : "Preview Mode"}
        </button>
      </div>

      {slides.length === 0 && (
        <div className="bg-gray-900 rounded-2xl border border-dashed border-white/10
                        p-10 text-center mb-4">
          <p className="text-gray-500 text-sm mb-2">No slides yet</p>
          <p className="text-gray-600 text-xs">
            Use the button below to add your first slide
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-4">
        {slides.map((slide, i) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            index={i}
            total={slides.length}
            preview={preview}
            onChange={(updated) => updateSlide(i, updated)}
            onRemove={() => removeSlide(i)}
            onMoveUp={() => moveSlide(i, "up")}
            onMoveDown={() => moveSlide(i, "down")}
          />
        ))}
      </div>

      {/* Add slide menu */}
      <AddSlideMenu onAdd={addSlide} />

      {/* Save bar */}
      <div className="sticky bottom-0 mt-8 bg-gray-950/90 backdrop-blur-sm
                      border-t border-white/[0.06] -mx-8 px-8 py-4
                      flex items-center justify-between">
        <div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {saved && <p className="text-sm text-green-400">✓ Lesson saved</p>}
          {!error && !saved && (
            <p className="text-xs text-gray-600">
              {slides.length} slide{slides.length !== 1 ? "s" : ""} ·{" "}
              Changes are saved to the database
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/lessons/${lesson.id}`}
            target="_blank"
            className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white
                       hover:bg-white/10 transition-all"
          >
            Preview ↗
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
                       text-white text-sm font-bold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
}
