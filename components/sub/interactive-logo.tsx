"use client";

/**
 * InteractiveLogo — "AMAN×MAHOUR"
 * Full 3D mouse-tracking with:
 *   • Wrapper sets perspective, inner div rotates in 3D
 *   • Per-letter spring translate + rotate
 *   • Cursor-following blue radial glow
 *   • Light sweep on enter
 *   • × rotation + scale
 *   • prefers-reduced-motion safe
 */

import React, { useEffect, useRef, useCallback } from "react";

// ─── Spring config ────────────────────────────────────────────
const LERP_SLOW  = 0.055;   // tilt / glow (sluggish = dramatic)
const LERP_FAST  = 0.10;    // letters (snappier)
const LERP_CROSS = 0.12;    // × (fastest)

// ─── Amplitude ───────────────────────────────────────────────
const TILT_X   = 14;   // deg — perspective X tilt
const TILT_Y   = 20;   // deg — perspective Y tilt
const MAX_TX   = 10;   // px  — letter horizontal shift
const MAX_TY   = 6;    // px  — letter vertical shift
const MAX_ROT  = 3.5;  // deg — letter rotation
const CROSS_ROT = 30;  // deg — × rotation

const WORDS_A = ["A","M","A","N"];
const WORDS_B = ["M","A","H","O","U","R"];
const ALL_LETTERS = [...WORDS_A, ...WORDS_B];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const InteractiveLogo: React.FC = () => {
  const outerRef   = useRef<HTMLDivElement>(null);   // perspective wrapper
  const innerRef   = useRef<HTMLDivElement>(null);   // rotates in 3D
  const glowRef    = useRef<HTMLDivElement>(null);   // cursor glow
  const sweepRef   = useRef<HTMLDivElement>(null);
  const crossRef   = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>(
    new Array(ALL_LETTERS.length).fill(null)
  );
  const rafRef     = useRef<number | null>(null);
  const reduced    = useRef(false);

  // Animated state (no React state — direct DOM)
  const cur = useRef({
    tiltX: 0, tiltY: 0,
    glowX: 50, glowY: 50,     // percent
    crossRot: 0, crossScale: 1,
    letters: ALL_LETTERS.map(() => ({ tx: 0, ty: 0, rot: 0 })),
  });

  // Target state
  const tar = useRef({
    tiltX: 0, tiltY: 0,
    glowX: 50, glowY: 50,
    crossRot: 0, crossScale: 1,
    letters: ALL_LETTERS.map(() => ({ tx: 0, ty: 0, rot: 0 })),
  });

  const isOver = useRef(false);

  // ── Pointer handlers ────────────────────────────────────────
  const onMove = useCallback((e: PointerEvent) => {
    if (reduced.current) return;
    const box = outerRef.current?.getBoundingClientRect();
    if (!box) return;

    // Normalised [-1, 1]
    const nx = ((e.clientX - box.left)  / box.width  - 0.5) * 2;
    const ny = ((e.clientY - box.top)   / box.height - 0.5) * 2;

    tar.current.tiltX = -ny * TILT_X;   // mouse up → tilt toward viewer
    tar.current.tiltY =  nx * TILT_Y;

    // Glow follows cursor as % of container
    tar.current.glowX = ((e.clientX - box.left) / box.width)  * 100;
    tar.current.glowY = ((e.clientY - box.top)  / box.height) * 100;

    // × rotation
    tar.current.crossRot   = nx * CROSS_ROT;
    tar.current.crossScale = 1.15 + Math.abs(ny) * 0.1;

    // Per-letter: column position [-1,1], letters near cursor shift more
    const total = ALL_LETTERS.length;
    ALL_LETTERS.forEach((_, i) => {
      const col  = (i / (total - 1)) * 2 - 1;
      const prox = 1 - Math.abs(col - nx) * 0.45;
      tar.current.letters[i].tx  = nx * MAX_TX  * prox;
      tar.current.letters[i].ty  = ny * MAX_TY  * prox;
      tar.current.letters[i].rot = nx * MAX_ROT * (col * 0.5);
    });
  }, []);

  const onEnter = useCallback(() => {
    isOver.current = true;
    if (glowRef.current)  glowRef.current.style.opacity  = "1";

    // Trigger sweep
    if (sweepRef.current) {
      sweepRef.current.style.transition = "none";
      sweepRef.current.style.transform  = "translateX(-120%) skewX(-20deg)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sweepRef.current) {
            sweepRef.current.style.transition = "transform 1s cubic-bezier(0.4,0,0.2,1)";
            sweepRef.current.style.transform  = "translateX(220%) skewX(-20deg)";
          }
        });
      });
    }
  }, []);

  const onLeave = useCallback(() => {
    isOver.current = false;

    // Reset all targets
    tar.current.tiltX = 0; tar.current.tiltY = 0;
    tar.current.glowX = 50; tar.current.glowY = 50;
    tar.current.crossRot = 0; tar.current.crossScale = 1;
    tar.current.letters.forEach((l) => { l.tx = 0; l.ty = 0; l.rot = 0; });

    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  // ── RAF animation loop ───────────────────────────────────────
  const tick = useCallback(() => {
    const c = cur.current;
    const t = tar.current;

    // Tilt
    c.tiltX = lerp(c.tiltX, t.tiltX, LERP_SLOW);
    c.tiltY = lerp(c.tiltY, t.tiltY, LERP_SLOW);

    if (innerRef.current) {
      innerRef.current.style.transform =
        `rotateX(${c.tiltX}deg) rotateY(${c.tiltY}deg)`;
    }

    // Glow
    c.glowX = lerp(c.glowX, t.glowX, LERP_SLOW);
    c.glowY = lerp(c.glowY, t.glowY, LERP_SLOW);
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(
        circle at ${c.glowX}% ${c.glowY}%,
        rgba(37,99,235,0.22) 0%,
        rgba(96,165,250,0.10) 35%,
        transparent 65%
      )`;
    }

    // ×
    c.crossRot   = lerp(c.crossRot,   t.crossRot,   LERP_CROSS);
    c.crossScale = lerp(c.crossScale, t.crossScale, LERP_CROSS);
    if (crossRef.current) {
      crossRef.current.style.transform =
        `rotate(${c.crossRot}deg) scale(${c.crossScale})`;
    }

    // Letters
    c.letters.forEach((l, i) => {
      l.tx  = lerp(l.tx,  t.letters[i].tx,  LERP_FAST);
      l.ty  = lerp(l.ty,  t.letters[i].ty,  LERP_FAST);
      l.rot = lerp(l.rot, t.letters[i].rot, LERP_FAST);
      const el = letterRefs.current[i];
      if (el) {
        el.style.transform =
          `translate(${l.tx}px, ${l.ty}px) rotate(${l.rot}deg)`;
      }
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Mount ────────────────────────────────────────────────────
  useEffect(() => {
    reduced.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = outerRef.current;
    if (!el) return;

    el.addEventListener("pointermove",  onMove,  { passive: true });
    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove",  onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onMove, onEnter, onLeave, tick]);

  // ── Letter renderer ──────────────────────────────────────────
  const renderWord = (chars: string[], startIdx: number) =>
    chars.map((ch, i) => {
      const idx = startIdx + i;
      return (
        <span
          key={idx}
          ref={(el) => { letterRefs.current[idx] = el; }}
          style={{
            display: "inline-block",
            willChange: "transform",
            transformOrigin: "center bottom",
          }}
        >
          {ch}
        </span>
      );
    });

  // ── Render ───────────────────────────────────────────────────
  return (
    <section
      id="logo-banner"
      className="relative w-full z-[20] select-none overflow-visible"
    >
      {/* Separator top */}
      <div
        style={{
          width: "100%", height: "1px",
          background: "linear-gradient(90deg, transparent, #1e3a5f 20%, #2563eb 50%, #1e3a5f 80%, transparent)",
          opacity: 0.5,
        }}
      />

      {/* ── PERSPECTIVE WRAPPER — sets 3D stage ── */}
      <div
        ref={outerRef}
        style={{
          perspective: "700px",
          perspectiveOrigin: "50% 50%",
          cursor: "default",
          padding: "28px 0 32px",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Cursor glow — covers entire outer area */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.35s ease",
            zIndex: 2,
          }}
        />

        {/* Light sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 3,
          }}
        >
          <div
            ref={sweepRef}
            style={{
              position: "absolute",
              top: "-20%",
              left: 0,
              width: "35%",
              height: "140%",
              background:
                "linear-gradient(105deg, transparent 25%, rgba(147,197,253,0.18) 50%, transparent 75%)",
              transform: "translateX(-120%) skewX(-20deg)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── INNER CARD — this rotates in 3D ── */}
        <div
          ref={innerRef}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            position: "relative",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Main outlined text */}
          <div
            style={{
              fontFamily: "'Inter', 'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 9.5vw, 9rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1.6px #1e3a5f",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "baseline",
              gap: "0.02em",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            {/* AMAN */}
            <span style={{ display: "inline-flex", gap: "0.01em" }}>
              {renderWord(WORDS_A, 0)}
            </span>

            {/* × */}
            <span
              ref={crossRef}
              style={{
                display: "inline-block",
                color: "#2563eb",
                WebkitTextStroke: "0px",
                fontWeight: 900,
                margin: "0 0.05em",
                willChange: "transform",
                transformOrigin: "center center",
                filter: "drop-shadow(0 0 10px rgba(37,99,235,0.7)) drop-shadow(0 0 24px rgba(96,165,250,0.35))",
                transition: "filter 0.3s ease",
              }}
            >
              ×
            </span>

            {/* MAHOUR */}
            <span style={{ display: "inline-flex", gap: "0.01em" }}>
              {renderWord(WORDS_B, WORDS_A.length)}
            </span>
          </div>

          {/* Sub-label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "14px",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "rgba(30,58,95,0.6)" }} />
            <p
              style={{
                fontSize: "clamp(0.5rem, 1.1vw, 0.72rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#1e3a5f",
                fontFamily: "'Inter', monospace",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Portfolio · Fullstack Dev · Creative Technologist
            </p>
            <div style={{ width: "60px", height: "1px", background: "rgba(30,58,95,0.6)" }} />
          </div>
        </div>
      </div>

      {/* Separator bottom */}
      <div
        style={{
          width: "100%", height: "1px",
          background: "linear-gradient(90deg, transparent, #1e3a5f 20%, #2563eb 50%, #1e3a5f 80%, transparent)",
          opacity: 0.5,
        }}
      />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #logo-banner * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
