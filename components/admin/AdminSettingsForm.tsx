// components/admin/AdminSettingsForm.tsx
"use client";
import { useState } from "react";

interface Props {
  settings:     Record<string, string>;
  descriptions: Record<string, string>;
}

const SETTING_LABELS: Record<string, string> = {
  maintenance_mode: "Maintenance Mode",
  allow_signups:    "Allow New Sign-ups",
  announcement:     "Dashboard Announcement",
  current_version:  "Platform Version",
};

export default function AdminSettingsForm({ settings, descriptions }: Props) {
  const [values,  setValues]  = useState<Record<string, string>>(settings);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function renderField(key: string, value: string) {
    const label = SETTING_LABELS[key] ?? key;
    const desc  = descriptions[key] ?? "";

    // Boolean toggle
    if (value === "true" || value === "false") {
      return (
        <div key={key}
          className="flex items-center justify-between py-4 border-b border-white/[0.06]">
          <div>
            <p className="text-sm font-medium text-white">{label}</p>
            {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
          </div>
          <button
            onClick={() => setValues((v) => ({
              ...v, [key]: value === "true" ? "false" : "true"
            }))}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200
                         ${value === "true" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white
                              shadow transition-transform duration-200
                              ${value === "true" ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      );
    }

    // Text input
    return (
      <div key={key} className="py-4 border-b border-white/[0.06]">
        <label className="block text-sm font-medium text-white mb-1">{label}</label>
        {desc && <p className="text-xs text-gray-500 mb-2">{desc}</p>}
        <input
          type="text"
          value={value}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-white/10
                     text-white text-sm placeholder:text-gray-600
                     focus:outline-none focus:border-blue-500 transition-colors"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-white/[0.06] overflow-hidden">
      <div className="divide-y divide-white/[0.04] px-6">
        {Object.entries(values).map(([key, value]) => renderField(key, value))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex items-center justify-between bg-gray-950/50">
        {error && <p className="text-sm text-red-400">{error}</p>}
        {saved && <p className="text-sm text-green-400">✓ Settings saved</p>}
        {!error && !saved && <span />}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white
                     text-sm font-bold transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
