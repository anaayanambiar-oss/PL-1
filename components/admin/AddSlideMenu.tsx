// components/admin/AddSlideMenu.tsx
"use client";
import { useState } from "react";
import type { SlideType } from "@/lib/lesson-types";

const SLIDE_TYPES: { type: SlideType; icon: string; label: string; desc: string }[] = [
  { type:"overview",    icon:"📋", label:"Overview",    desc:"Pre-lesson summary with bullet points" },
  { type:"explanation", icon:"📖", label:"Explanation", desc:"Text + emoji + optional video" },
  { type:"video",       icon:"🎬", label:"Video",       desc:"Embedded YouTube or NotebookLM video" },
  { type:"mcq",         icon:"❓", label:"MCQ",         desc:"Multiple choice question with feedback" },
  { type:"completion",  icon:"🎉", label:"Completion",  desc:"End-of-lesson celebration with XP + badge" },
];

interface Props {
  onAdd: (type: SlideType) => void;
}

export default function AddSlideMenu({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-3 rounded-2xl border-2 border-dashed border-white/10
                   text-gray-500 hover:text-white hover:border-white/20
                   text-sm font-medium transition-all flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span> Add Slide
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          {/* Menu */}
          <div className="absolute bottom-full mb-2 left-0 right-0 z-20
                          bg-gray-900 rounded-2xl border border-white/10
                          shadow-xl overflow-hidden">
            {SLIDE_TYPES.map((s) => (
              <button
                key={s.type}
                onClick={() => { onAdd(s.type); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3
                           hover:bg-white/[0.05] transition-colors text-left
                           border-b border-white/[0.04] last:border-0"
              >
                <span className="text-xl w-7 text-center flex-shrink-0">{s.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
