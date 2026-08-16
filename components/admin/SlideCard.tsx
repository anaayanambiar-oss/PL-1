// components/admin/SlideCard.tsx
"use client";

import { useState } from "react";
import type { Slide, OverviewSlide, ExplanationSlide, VideoSlide, MCQSlide, CompletionSlide } from "@/lib/lesson-types";

interface Props {
  slide:      Slide;
  index:      number;
  total:      number;
  preview:    boolean;
  onChange:   (updated: Slide) => void;
  onRemove:   () => void;
  onMoveUp:   () => void;
  onMoveDown: () => void;
}

const SLIDE_LABELS: Record<string, { label: string; color: string }> = {
  overview:    { label: "Overview",    color: "text-blue-400   bg-blue-500/10   border-blue-500/20"   },
  explanation: { label: "Explanation", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  video:       { label: "Video",       color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  mcq:         { label: "MCQ",         color: "text-green-400  bg-green-500/10  border-green-500/20"  },
  completion:  { label: "Completion",  color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function TInput({ value, onChange, placeholder, mono = false }: {
  value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean;
}) {
  return (
    <input
      type="text" value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 rounded-lg bg-gray-800 border border-white/10
                  text-white text-sm placeholder:text-gray-600
                  focus:outline-none focus:border-blue-500 transition-colors
                  ${mono ? "font-mono" : ""}`}
    />
  );
}

function TArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value} rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-white/10
                 text-white text-sm placeholder:text-gray-600 resize-none
                 focus:outline-none focus:border-blue-500 transition-colors"
    />
  );
}

export default function SlideCard({
  slide, index, total, preview, onChange, onRemove, onMoveUp, onMoveDown,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const meta = SLIDE_LABELS[slide.type] ?? { label: slide.type, color: "text-gray-400 bg-gray-800 border-white/10" };

  function update(partial: Partial<Slide>) {
    onChange({ ...slide, ...partial } as Slide);
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-white/[0.06] overflow-hidden">

      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
        <span className="text-gray-600 text-xs font-mono w-5 text-center">
          {index + 1}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${meta.color}`}>
          {meta.label}
        </span>
        <span className="text-gray-600 text-xs flex-1 truncate font-mono">
          {slide.id}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={onMoveUp} disabled={index === 0}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-600
                       hover:text-white hover:bg-white/10 transition-all disabled:opacity-20">
            ↑
          </button>
          <button onClick={onMoveDown} disabled={index === total - 1}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-600
                       hover:text-white hover:bg-white/10 transition-all disabled:opacity-20">
            ↓
          </button>
          <button onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-600
                       hover:text-white hover:bg-white/10 transition-all text-xs">
            {collapsed ? "▼" : "▲"}
          </button>
          <button onClick={onRemove}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-600
                       hover:text-red-400 hover:bg-red-500/10 transition-all text-xs">
            ✕
          </button>
        </div>
      </div>

      {/* Card body */}
      {!collapsed && (
        <div className="p-4 grid grid-cols-2 gap-3">

          {/* ── OVERVIEW ────────────────────── */}
          {slide.type === "overview" && (() => {
            const s = slide as OverviewSlide;
            return (
              <>
                <div className="col-span-2">
                  <Field label="Lesson Title">
                    <TInput value={s.lessonTitle} placeholder="Lesson title shown on the overview card"
                      onChange={(v) => update({ lessonTitle: v } as any)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Learning Goal">
                    <TArea value={s.goal} rows={2} placeholder="By the end of this lesson, you will be able to..."
                      onChange={(v) => update({ goal: v } as any)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Bullet Points (one per line)">
                    <TArea
                      value={s.bulletPoints.join("\n")} rows={4}
                      placeholder={"Point 1\nPoint 2\nPoint 3"}
                      onChange={(v) => update({ bulletPoints: v.split("\n") } as any)}
                    />
                  </Field>
                </div>
              </>
            );
          })()}

          {/* ── EXPLANATION ─────────────────── */}
          {slide.type === "explanation" && (() => {
            const s = slide as ExplanationSlide;
            return (
              <>
                <div className="col-span-2">
                  <Field label="Heading">
                    <TInput value={s.heading} placeholder="Slide heading"
                      onChange={(v) => update({ heading: v } as any)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Body Text">
                    <TArea value={s.body} rows={4} placeholder="Explanation text — keep it simple for ages 7–13"
                      onChange={(v) => update({ body: v } as any)} />
                  </Field>
                </div>
                <Field label="Emoji Icon">
                  <TInput value={s.imageEmoji ?? ""} placeholder="🏛️"
                    onChange={(v) => update({ imageEmoji: v } as any)} />
                </Field>
                <Field label="Collapsed Video URL (optional)">
                  <TInput value={s.videoUrl ?? ""} placeholder="https://youtube.com/embed/..."
                    onChange={(v) => update({ videoUrl: v } as any)} />
                </Field>
              </>
            );
          })()}

          {/* ── VIDEO ───────────────────────── */}
          {slide.type === "video" && (() => {
            const s = slide as VideoSlide;
            return (
              <>
                <div className="col-span-2">
                  <Field label="Video Title">
                    <TInput value={s.title} placeholder="Video title shown above the embed"
                      onChange={(v) => update({ title: v } as any)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="YouTube Embed URL">
                    <TInput value={s.videoUrl} mono
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                      onChange={(v) => update({ videoUrl: v } as any)} />
                  </Field>
                </div>
                <Field label="Duration">
                  <TInput value={s.duration} placeholder="5 min"
                    onChange={(v) => update({ duration: v } as any)} />
                </Field>
                <Field label="Source Credit">
                  <TInput value={s.sourceCredit} placeholder="TED-Ed"
                    onChange={(v) => update({ sourceCredit: v } as any)} />
                </Field>
              </>
            );
          })()}

          {/* ── MCQ ─────────────────────────── */}
          {slide.type === "mcq" && (() => {
            const s = slide as MCQSlide;
            return (
              <>
                <div className="col-span-2 flex items-center gap-3">
                  <Field label="Role Play?">
                    <button
                      onClick={() => update({ isRolePlay: !s.isRolePlay } as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                                  ${s.isRolePlay
                                    ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                                    : "bg-gray-800 border-white/10 text-gray-500"}`}
                    >
                      {s.isRolePlay ? "🎭 Role Play ON" : "Role Play OFF"}
                    </button>
                  </Field>
                  <Field label="Emoji">
                    <TInput value={s.imageEmoji ?? ""} placeholder="🤔"
                      onChange={(v) => update({ imageEmoji: v } as any)} />
                  </Field>
                </div>
                {s.isRolePlay && (
                  <div className="col-span-2">
                    <Field label="Role Play Context">
                      <TArea value={s.roleContext ?? ""} rows={2}
                        placeholder="You are the Prime Minister of India..."
                        onChange={(v) => update({ roleContext: v } as any)} />
                    </Field>
                  </div>
                )}
                <div className="col-span-2">
                  <Field label="Question">
                    <TArea value={s.question} rows={2} placeholder="The question text..."
                      onChange={(v) => update({ question: v } as any)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Answer Options (mark one as correct)
                  </p>
                  <div className="flex flex-col gap-2">
                    {s.options.map((opt, oi) => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <button
                          onClick={() => update({
                            options: s.options.map((o, i) => ({
                              ...o, isCorrect: i === oi,
                            })),
                          } as any)}
                          className={`w-6 h-6 rounded-full border-2 flex-shrink-0
                                      flex items-center justify-center text-xs font-bold
                                      transition-all
                                      ${opt.isCorrect
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-600 text-gray-600 hover:border-green-500"}`}
                        >
                          {opt.isCorrect ? "✓" : ""}
                        </button>
                        <input value={opt.icon} placeholder="🎭"
                          onChange={(e) => update({
                            options: s.options.map((o, i) =>
                              i === oi ? { ...o, icon: e.target.value } : o
                            ),
                          } as any)}
                          className="w-12 px-2 py-1.5 rounded-lg bg-gray-800 border border-white/10
                                     text-white text-sm text-center focus:outline-none focus:border-blue-500"
                        />
                        <input value={opt.text}
                          placeholder={`Option ${opt.id.toUpperCase()}`}
                          onChange={(e) => update({
                            options: s.options.map((o, i) =>
                              i === oi ? { ...o, text: e.target.value } : o
                            ),
                          } as any)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-gray-800 border border-white/10
                                     text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <Field label="Explanation (shown after answering)">
                    <TArea value={s.explanation} rows={2} placeholder="Why the correct answer is right..."
                      onChange={(v) => update({ explanation: v } as any)} />
                  </Field>
                </div>
              </>
            );
          })()}

          {/* ── COMPLETION ──────────────────── */}
          {slide.type === "completion" && (() => {
            const s = slide as CompletionSlide;
            return (
              <>
                <Field label="XP Earned">
                  <input type="number" value={s.xpEarned} min={0} max={500} step={25}
                    onChange={(e) => update({ xpEarned: Number(e.target.value) } as any)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-white/10
                               text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </Field>
                <Field label="Badge ID (optional)">
                  <TInput value={s.badgeId ?? ""} placeholder="first-lesson"
                    onChange={(v) => update({ badgeId: v } as any)} />
                </Field>
                <Field label="Badge Name">
                  <TInput value={s.badgeName ?? ""} placeholder="First Steps"
                    onChange={(v) => update({ badgeName: v } as any)} />
                </Field>
                <Field label="Badge Icon (emoji)">
                  <TInput value={s.badgeIcon ?? ""} placeholder="👶"
                    onChange={(v) => update({ badgeIcon: v } as any)} />
                </Field>
              </>
            );
          })()}

        </div>
      )}
    </div>
  );
}
