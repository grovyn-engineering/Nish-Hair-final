import { MoveHorizontal } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  afterLabel?: string;
  beforeLabel?: string;
  /**
   * Visual classes (border, radius, background, aspect ratio) for the outer
   * container, replacing the default. Defaults to the original try-on preview
   * styling so existing callers (src/routes/try-on.tsx) render pixel-identical
   * output.
   */
  className?: string;
  /**
   * Classes applied to both the before and after <img> elements, replacing the
   * default sizing. Defaults to the original try-on preview sizing so existing
   * callers (src/routes/try-on.tsx) render pixel-identical output.
   */
  imgClassName?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  afterLabel = "After",
  beforeLabel = "Before",
  className = "rounded-2xl border border-border bg-sand",
  imgClassName = "block h-[380px] w-full object-contain sm:h-[540px]",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full touch-none overflow-hidden select-none ${className}`.trim()}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img
        src={afterSrc}
        alt={`${afterLabel}: your virtual try-on preview`}
        className={imgClassName}
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <img src={beforeSrc} alt="" className={imgClassName} draggable={false} />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold tracking-wider text-espresso">
        {beforeLabel.toUpperCase()}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-espresso/90 px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground">
        {String(afterLabel).toUpperCase()}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-background/90"
        style={{ left: `${position}%` }}
      >
        <span className="pointer-events-none absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-[var(--shadow-soft)]">
          <MoveHorizontal className="size-5 text-espresso" aria-hidden="true" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Reveal more of the before or after image"
        className="absolute inset-x-0 bottom-4 mx-auto w-[85%] cursor-ew-resize accent-[var(--espresso)]"
      />
    </div>
  );
}
