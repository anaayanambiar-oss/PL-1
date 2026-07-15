import type { CivicElement } from "@/lib/society-config";

interface Props {
  element:   CivicElement;
  unlocking: boolean;
  onConfirm: () => void;
  onClose:   () => void;
}

export default function UnlockModal({ element, unlocking, onConfirm, onClose }: Props) {
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center
                 justify-center px-4"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="bg-white rounded-3xl shadow-card-lg border border-black/[0.07]
                   w-full max-w-sm p-7 text-center animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Building icon */}
        <div className={`w-20 h-20 rounded-3xl ${element.lightColor} flex items-center
                          justify-center text-5xl mx-auto mb-4`}>
          {element.icon}
        </div>

        {/* Heading */}
        <h2 className="font-display font-black text-2xl text-ink mb-1">
          Build {element.name}?
        </h2>
        <p className="text-sm text-ink-soft leading-relaxed mb-4">
          {element.description}
        </p>

        {/* Population reward */}
        <div className={`flex items-center justify-center gap-2 ${element.lightColor}
                          rounded-2xl px-5 py-3 mb-2 border ${element.borderColor}`}>
          <span className="text-xl">👥</span>
          <span className={`font-bold text-sm ${element.textColor}`}>
            +{element.population.toLocaleString()} residents join your city
          </span>
        </div>

        {/* Civic fact */}
        <p className="text-xs text-mid leading-relaxed mb-6 italic">
          Did you know? {element.fact}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-2 border-black/10 text-ink
                       font-semibold text-sm hover:border-mid transition-colors"
          >
            Not yet
          </button>
          <button
            onClick={onConfirm}
            disabled={unlocking}
            className={`flex-[2] py-3 rounded-full text-white font-bold text-sm
                         ${element.color} hover:-translate-y-0.5 hover:shadow-lg
                         transition-all disabled:opacity-50 disabled:translate-y-0`}
          >
            {unlocking ? "Building…" : `✓ Build ${element.name}`}
          </button>
        </div>
      </div>
    </div>
  );
}
