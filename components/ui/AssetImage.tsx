// components/ui/AssetImage.tsx
// An <img> that falls back to an emoji when the file is missing. Coin, badge
// and society artwork is uploaded separately (guideline section 15), so the
// UI must look right before, during and after those uploads.
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src?:       string;
  fallback:   string;   // emoji shown when src is missing or fails to load
  alt:        string;
  size:       number;   // px, square
  className?: string;
  muted?:     boolean;  // greyed-out "locked" look
}

export default function AssetImage({ src, fallback, alt, size, className = "", muted = false }: Props) {
  const [failed, setFailed] = useState(!src);
  const imgRef = useRef<HTMLImageElement>(null);

  // A server-rendered <img> can fail before hydration attaches onError, so
  // also check on mount whether it has already failed.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  const mutedCls = muted ? "grayscale opacity-50" : "";

  if (failed || !src) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`inline-flex items-center justify-center leading-none select-none ${mutedCls} ${className}`}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.8) }}
      >
        {fallback}
      </span>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`object-contain ${mutedCls} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
