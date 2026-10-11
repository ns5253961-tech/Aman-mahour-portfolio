"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaReact, FaAws, FaNodeJs, FaGitAlt } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiFirebase,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";

interface Particle {
  t: number;
  speed: number;
  orbitIndex: number;
  offsetU: number;
  offsetV: number;
  size: number;
  baseAlpha: number;
  color: string;
}

const techCards = [
  {
    id: "react",
    name: "React",
    icon: FaReact,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    glowColor: "rgba(34,211,238,0.35)",
    shadowColor: "shadow-cyan-500/30",
    top: "8%",
    left: "14%",
  },
  {
    id: "js",
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-300",
    borderColor: "border-yellow-400/40",
    glowColor: "rgba(250,204,21,0.35)",
    shadowColor: "shadow-yellow-400/30",
    top: "5%",
    left: "52%",
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: SiFirebase,
    color: "text-amber-400",
    borderColor: "border-amber-400/40",
    glowColor: "rgba(251,191,36,0.3)",
    shadowColor: "shadow-amber-400/30",
    top: "30%",
    left: "80%",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-white",
    borderColor: "border-purple-500/40",
    glowColor: "rgba(168,85,247,0.3)",
    shadowColor: "shadow-purple-500/30",
    top: "63%",
    left: "80%",
  },
  {
    id: "ts",
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-400",
    borderColor: "border-blue-500/40",
    glowColor: "rgba(96,165,250,0.35)",
    shadowColor: "shadow-blue-500/30",
    top: "72%",
    left: "48%",
  },
  {
    id: "aws",
    name: "AWS",
    icon: FaAws,
    color: "text-orange-400",
    borderColor: "border-orange-400/40",
    glowColor: "rgba(251,146,60,0.3)",
    shadowColor: "shadow-orange-400/30",
    top: "65%",
    left: "15%",
  },
  {
    id: "node",
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-green-400",
    borderColor: "border-green-500/40",
    glowColor: "rgba(74,222,128,0.3)",
    shadowColor: "shadow-green-500/30",
    top: "30%",
    left: "5%",
  },
  {
    id: "tailwind",
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "text-sky-400",
    borderColor: "border-sky-500/40",
    glowColor: "rgba(56,189,248,0.3)",
    shadowColor: "shadow-sky-400/30",
    top: "10%",
    left: "80%",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-emerald-400",
    borderColor: "border-emerald-400/40",
    glowColor: "rgba(52,211,153,0.3)",
    shadowColor: "shadow-emerald-400/30",
    top: "88%",
    left: "28%",
  },
  {
    id: "git",
    name: "Git",
    icon: FaGitAlt,
    color: "text-red-400",
    borderColor: "border-red-400/40",
    glowColor: "rgba(248,113,113,0.3)",
    shadowColor: "shadow-red-400/30",
    top: "88%",
    left: "68%",
  },
];

export const AtomOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef({ x: 0.25, y: -0.3, vx: 0, vy: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [pulseRing, setPulseRing] = useState(0);

  // Pulse ring animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseRing((p) => (p + 1) % 3);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isMounted = true;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width || container.clientWidth || 500);
      const h = Math.floor(rect.height || container.clientHeight || 500);
      if (w > 0 && h > 0) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    if (containerRef.current) ro.observe(containerRef.current);

    // 5 distinct orbits with varying tilt and size
    const orbits = [
      { rx: 0.65, ry: 0.35, rz: 0.8,  a: 200, b: 110, speed: 0.0006 },
      { rx: -0.75, ry: -0.4, rz: -0.6, a: 205, b: 115, speed: -0.0007 },
      { rx: 0.2,  ry: 1.1,  rz: 0.3,  a: 210, b: 105, speed: 0.0008 },
      { rx: -0.4, ry: 0.85, rz: -1.0, a: 195, b: 112, speed: -0.00065 },
      { rx: 1.0,  ry: -0.6, rz: 0.5,  a: 185, b: 100, speed: 0.00055 },
    ];

    const particleCount = 1800;
    const particles: Particle[] = [];
    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(243, 232, 255, ",
      "rgba(192, 132, 252, ",
      "rgba(168, 85, 247, ",
      "rgba(216, 180, 254, ",
      "rgba(125, 211, 252, ",
      "rgba(167, 243, 208, ",
    ];

    for (let i = 0; i < particleCount; i++) {
      const orbitIndex = i % orbits.length;
      const spread = Math.random() > 0.8 ? 2.2 : 0.9;
      const offsetU = (Math.random() - 0.5) * 14 * spread;
      const offsetV = (Math.random() - 0.5) * 14 * spread;
      particles.push({
        t: Math.random(),
        speed: (0.0007 + Math.random() * 0.0018) * (orbitIndex % 2 === 0 ? 1 : -1),
        orbitIndex,
        offsetU,
        offsetV,
        size: 0.5 + Math.random() * 2.0,
        baseAlpha: 0.2 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function rotate3D(
      x: number, y: number, z: number,
      rx: number, ry: number, rz: number
    ) {
      // Rotate X
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);
      const x1 = x;
      // Rotate Y
      const x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      const y2 = y1;
      // Rotate Z
      const x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      const z3 = z2;
      return { x: x3, y: y3, z: z3 };
    }

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotRef.current.y += dx * 0.005;
      rotRef.current.x += dy * 0.005;
      rotRef.current.vy = dx * 0.002;
      rotRef.current.vx = dy * 0.002;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDraggingRef.current = false; };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;
      rotRef.current.y += dx * 0.006;
      rotRef.current.x += dy * 0.006;
      rotRef.current.vy = dx * 0.002;
      rotRef.current.vx = dy * 0.002;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDraggingRef.current = false; };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let lastTime = performance.now();
    let globalAngle = 0;

    const render = (now: number) => {
      if (!isMounted) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isDraggingRef.current) {
        rotRef.current.y += 0.0025 + rotRef.current.vy;
        rotRef.current.x += 0.0006 + rotRef.current.vx;
        rotRef.current.vx *= 0.94;
        rotRef.current.vy *= 0.94;
      }
      globalAngle += dt * 0.5;

      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }

      const cx = width / 2;
      const cy = height / 2;
      const scaleFactor = Math.min(width, height) / 560;

      ctx.clearRect(0, 0, width, height);

      const focalLength = 500;

      // ─── 1. Background: Subtle Radial Nebula Glow ───
      const nebulaGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 290 * scaleFactor);
      nebulaGrad.addColorStop(0, "rgba(112, 66, 248, 0.06)");
      nebulaGrad.addColorStop(0.5, "rgba(60, 30, 130, 0.04)");
      nebulaGrad.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // ─── 2. Radar Grid: Concentric rings + spokes ───
      ctx.save();
      const ringRadii = [70, 130, 195, 250, 300];
      for (let ri = 0; ri < ringRadii.length; ri++) {
        const alpha = ri === ringRadii.length - 1 ? 0.05 : 0.1;
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.lineWidth = ri === 0 ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadii[ri] * scaleFactor, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Spokes
      const spokes = 12;
      for (let s = 0; s < spokes; s++) {
        const angle = (s * Math.PI) / (spokes / 2);
        const rMax = 305 * scaleFactor;
        ctx.strokeStyle = "rgba(168, 85, 247, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * rMax, cy + Math.sin(angle) * rMax);
        ctx.stroke();
      }

      // Outer dashed ring
      ctx.setLineDash([3, 12]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(cx, cy, 308 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating dotted inner ring
      const dotAngle = now * 0.0004;
      ctx.strokeStyle = "rgba(216, 180, 254, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 18]);
      ctx.lineDashOffset = -now * 0.04;
      ctx.beginPath();
      ctx.arc(cx, cy, 65 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
      void dotAngle;

      ctx.restore();

      // ─── 3. Orbit ribbons + particles ───
      interface RenderItem {
        type: "particle" | "orbit_segment";
        z: number;
        draw: (ctx: CanvasRenderingContext2D) => void;
      }
      const backItems: RenderItem[] = [];
      const frontItems: RenderItem[] = [];

      orbits.forEach((orb, oIdx) => {
        const segments = 140;
        const currentRot = orb.speed * now;
        const pathPoints: { x: number; y: number; z: number; scale: number }[] = [];

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const lx = Math.cos(theta) * orb.a * scaleFactor;
          const ly = Math.sin(theta) * orb.b * scaleFactor;
          const tilted = rotate3D(lx, ly, 0, orb.rx, orb.ry + currentRot, orb.rz);
          const rotated = rotate3D(tilted.x, tilted.y, tilted.z, rotRef.current.x, rotRef.current.y, 0);
          const projScale = focalLength / (focalLength + rotated.z);
          pathPoints.push({
            x: cx + rotated.x * projScale,
            y: cy + rotated.y * projScale,
            z: rotated.z,
            scale: projScale,
          });
        }

        const orbitColors = [
          "rgba(192,132,252,", // purple
          "rgba(125,211,252,", // cyan
          "rgba(216,180,254,", // lavender
          "rgba(167,243,208,", // green
          "rgba(253,186,116,", // peach
        ];

        for (let i = 0; i < pathPoints.length - 1; i++) {
          const p1 = pathPoints[i];
          const p2 = pathPoints[i + 1];
          const avgZ = (p1.z + p2.z) / 2;
          const progress = i / segments;
          const wave = Math.sin(progress * Math.PI * 4 - now * 0.002 + oIdx);
          const alpha = 0.06 + Math.max(0, wave) * 0.4;
          const orbitColor = orbitColors[oIdx % orbitColors.length];

          const item: RenderItem = {
            type: "orbit_segment",
            z: avgZ,
            draw: (c) => {
              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.strokeStyle = `${orbitColor}${alpha})`;
              c.lineWidth = (1.0 + Math.max(0, wave) * 2.5) * p1.scale;
              c.stroke();
            },
          };
          if (avgZ < 0) backItems.push(item);
          else frontItems.push(item);
        }
      });

      // Particles
      particles.forEach((p) => {
        p.t = (p.t + p.speed + 1) % 1;
        const orb = orbits[p.orbitIndex];
        const theta = p.t * Math.PI * 2;
        const lx = (Math.cos(theta) * orb.a + p.offsetU) * scaleFactor;
        const ly = (Math.sin(theta) * orb.b + p.offsetV) * scaleFactor;
        const currentRot = orb.speed * now;
        const tilted = rotate3D(lx, ly, 0, orb.rx, orb.ry + currentRot, orb.rz);
        const rotated = rotate3D(tilted.x, tilted.y, tilted.z, rotRef.current.x, rotRef.current.y, 0);
        const projScale = focalLength / (focalLength + rotated.z);
        const px = cx + rotated.x * projScale;
        const py = cy + rotated.y * projScale;
        const pz = rotated.z;

        const item: RenderItem = {
          type: "particle",
          z: pz,
          draw: (c) => {
            const rad = Math.max(0.4, p.size * projScale);
            const alpha = Math.min(1, Math.max(0.04, p.baseAlpha * projScale));
            c.beginPath();
            c.arc(px, py, rad, 0, Math.PI * 2);
            c.fillStyle = `${p.color}${alpha})`;
            c.fill();
          },
        };
        if (pz < 0) backItems.push(item);
        else frontItems.push(item);
      });

      // Back items
      backItems.sort((a, b) => a.z - b.z);
      backItems.forEach((item) => item.draw(ctx));

      // ─── 4. Central Core Sphere ───
      const sphereRadius = 55 * scaleFactor;

      // Pulsing outer energy ring
      const pulsePhase = (now * 0.001) % (Math.PI * 2);
      const pulseScale = 1 + 0.08 * Math.sin(pulsePhase);
      const ringGrad = ctx.createRadialGradient(cx, cy, sphereRadius * 1.05, cx, cy, sphereRadius * 2.8 * pulseScale);
      ringGrad.addColorStop(0, "rgba(168, 85, 247, 0.35)");
      ringGrad.addColorStop(0.3, "rgba(112, 66, 248, 0.12)");
      ringGrad.addColorStop(0.7, "rgba(60, 20, 120, 0.05)");
      ringGrad.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 2.8 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // Second softer glow layer
      const glow2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius * 1.8);
      glow2.addColorStop(0, "rgba(140, 80, 255, 0.2)");
      glow2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow2;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Sphere base (deep obsidian)
      const sphereGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.3, cy - sphereRadius * 0.3, sphereRadius * 0.04,
        cx, cy, sphereRadius
      );
      sphereGrad.addColorStop(0, "#3b2a60");
      sphereGrad.addColorStop(0.3, "#1e1040");
      sphereGrad.addColorStop(0.7, "#0c0820");
      sphereGrad.addColorStop(1, "#030014");
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Inner energy filaments
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius - 1.5, 0, Math.PI * 2);
      ctx.clip();

      for (let f = 0; f < 6; f++) {
        const fAngle = globalAngle * 0.7 + (f * Math.PI) / 3;
        const pulse = 0.18 + 0.12 * Math.sin(globalAngle * 1.5 + f);
        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(fAngle) * sphereRadius * 0.75,
          cy + Math.sin(fAngle) * sphereRadius * 0.75
        );
        ctx.bezierCurveTo(
          cx + Math.sin(fAngle * 1.4) * sphereRadius * 0.5,
          cy - Math.cos(fAngle * 1.2) * sphereRadius * 0.5,
          cx - Math.cos(fAngle * 0.8) * sphereRadius * 0.45,
          cy + Math.sin(fAngle) * sphereRadius * 0.45,
          cx - Math.cos(fAngle) * sphereRadius * 0.65,
          cy - Math.sin(fAngle) * sphereRadius * 0.65
        );
        ctx.strokeStyle = `rgba(216, 180, 254, ${pulse})`;
        ctx.lineWidth = 1.0 * scaleFactor;
        ctx.stroke();
      }

      // Animated inner bright core dot
      const corePulse = 0.6 + 0.4 * Math.sin(now * 0.003);
      const coreGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.1, cy - sphereRadius * 0.1, 0,
        cx, cy, sphereRadius * 0.55
      );
      coreGrad.addColorStop(0, `rgba(255,255,255,${corePulse * 0.9})`);
      coreGrad.addColorStop(0.3, `rgba(200,160,255,${corePulse * 0.4})`);
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight
      const specGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.32, cy - sphereRadius * 0.32, 1,
        cx - sphereRadius * 0.32, cy - sphereRadius * 0.32, sphereRadius * 0.56
      );
      specGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      specGrad.addColorStop(0.2, "rgba(230, 210, 255, 0.5)");
      specGrad.addColorStop(0.6, "rgba(168, 85, 247, 0.12)");
      specGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(cx - sphereRadius * 0.32, cy - sphereRadius * 0.32, sphereRadius * 0.56, 0, Math.PI * 2);
      ctx.fill();

      // Rim sheen
      ctx.strokeStyle = "rgba(200, 140, 255, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // ─── 5. Front Items ───
      frontItems.sort((a, b) => a.z - b.z);
      frontItems.forEach((item) => item.draw(ctx));

      // ─── 6. Lens-flare comet highlight ───
      const cometAngle = now * 0.0008;
      const cometR = 220 * scaleFactor;
      const cometX = cx + Math.cos(cometAngle) * cometR;
      const cometY = cy + Math.sin(cometAngle * 0.6) * cometR * 0.4;
      const cometGrad = ctx.createRadialGradient(cometX, cometY, 0, cometX, cometY, 18 * scaleFactor);
      cometGrad.addColorStop(0, "rgba(255,255,255,0.6)");
      cometGrad.addColorStop(0.4, "rgba(200,160,255,0.2)");
      cometGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cometGrad;
      ctx.beginPath();
      ctx.arc(cometX, cometY, 18 * scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[680px] aspect-square min-h-[360px] md:min-h-[520px] flex items-center justify-center select-none"
    >
      {/* Ambient corner neon flares */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-purple-600/35 via-fuchsia-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-tl from-cyan-600/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Tech Cards */}
      {techCards.map((card) => {
        const Icon = card.icon;
        const isHovered = hoveredCard === card.id;

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              top: card.top,
              left: card.left,
              transform: "translate(-50%, -50%)",
              boxShadow: isHovered ? `0 0 22px 4px ${card.glowColor}` : undefined,
            }}
            className={`absolute z-30 flex flex-col items-center justify-center gap-1
              w-11 h-11 md:w-14 md:h-14 rounded-2xl
              bg-[rgba(10,5,28,0.72)] backdrop-blur-xl
              border ${card.borderColor}
              shadow-lg ${card.shadowColor}
              transition-all duration-300 cursor-pointer
              ${isHovered ? "scale-125 border-opacity-80" : "hover:scale-110"}
            `}
          >
            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${card.color} transition-transform duration-300 ${isHovered ? "scale-110" : ""}`} />
            {isHovered && (
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] md:text-[10px] font-semibold text-white/90 bg-[rgba(15,5,40,0.9)] border border-purple-500/30 rounded-full px-2 py-0.5 shadow-lg backdrop-blur-sm"
              >
                {card.name}
              </span>
            )}
          </div>
        );
      })}

      {/* Pulse rings (CSS-based) */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-purple-500/20 pointer-events-none"
          style={{
            width: `${26 + i * 12}%`,
            height: `${26 + i * 12}%`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: `pulse-ring ${2.4 + i * 0.8}s ease-out infinite`,
            animationDelay: `${i * 0.6}s`,
            opacity: pulseRing === i ? 0.6 : 0.15,
          }}
        />
      ))}

      {/* Hint label */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[9px] md:text-[10px] text-gray-500/60 tracking-widest uppercase pointer-events-none font-mono">
        <span className="inline-block w-1 h-1 rounded-full bg-purple-500/40 animate-pulse" />
        Drag to rotate
        <span className="inline-block w-1 h-1 rounded-full bg-cyan-500/40 animate-pulse" />
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.4; }
          70%  { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
