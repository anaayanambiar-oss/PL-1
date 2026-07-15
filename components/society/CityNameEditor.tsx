"use client";

import { useState } from "react";

interface Props {
  cityName: string;
  onRename: (name: string) => Promise<void>;
}

export default function CityNameEditor({ cityName, onRename }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(cityName);
  const [saving,  setSaving]  = useState(false);

  async function handleSave() {
    if (!draft.trim() || draft.trim() === cityName) {
      setEditing(false);
      setDraft(cityName);
      return;
    }
    setSaving(true);
    await onRename(draft.trim());
    setSaving(false);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") { setEditing(false); setDraft(cityName); }
          }}
          maxLength={30}
          autoFocus
          className="font-display font-black text-2xl text-ink bg-transparent
                     border-b-2 border-brand-blue outline-none w-48 leading-tight"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-xs font-bold text-white bg-brand-blue px-3 py-1.5
                     rounded-full disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={() => { setEditing(false); setDraft(cityName); }}
          className="text-xs font-medium text-mid hover:text-ink"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2"
    >
      <h1 className="font-display font-black text-2xl text-ink leading-tight">
        {cityName}
      </h1>
      <span className="text-xs text-soft opacity-0 group-hover:opacity-100
                       transition-opacity font-medium">
        ✏️ rename
      </span>
    </button>
  );
}
