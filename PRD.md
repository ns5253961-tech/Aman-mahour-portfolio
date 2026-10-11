# Product Requirements Document (PRD)
## Project: 3D Atom / Particle Orbit Animation Integration
**Version**: 1.0  
**Status**: Ready for Implementation  
**Priority**: High  

---

### 1. Objective
Integrate the animated 3D atom/particle orbit effect (referenced from Ink Orbit SaaS / 21st.dev) into the existing website interface.

The animation includes:
- **Central Core Sphere**: A dark, glossy, semi-transparent sphere with internal glowing energy filament curves and soft purple-white emission.
- **Multiple Intersecting 3D Orbital Rings**: Elliptical orbital tracks angled across 3D axes (yaw, pitch, roll) with independent rotation speeds.
- **Dynamic Particle System**: Thousands of glowing particles following the orbital ribbons with variable sizes, opacity, and soft dust glow.
- **Floating Technology Cards**: Frosted glassmorphic cards holding tech icons (React, JavaScript, TypeScript, Firebase, AWS, Next.js) positioned around the atom with subtle floating micro-animations.
- **Futuristic Coordinate Radar Grid**: Subtle background concentric rings and radial navigational grid axes.
- **Neon Purple Ambient Glow**: Soft corner lens flare / ambient lighting in harmonious space palette (`#a855f7`, `#00f2fe`, `#ffffff`).

---

### 2. Critical Rules & Constraints
1. **Preserve Existing UI/UX**: Do not redesign or break the existing navigation, brand identity, or layout.
2. **Interactive & Responsive**: Must render at 60 FPS on desktop and scale gracefully on tablet/mobile viewports without horizontal scroll.
3. **Clean Architecture**: Encapsulated into an isolated, reusable component (`AtomOrbit`).
4. **Zero-Lag & Resource Cleanup**: Cancel all `requestAnimationFrame` loops, resize listeners, and WebGL/Canvas contexts on unmount.
5. **Accessibility**: Respect `prefers-reduced-motion` with an elegant low-motion fallback.

---

### 3. Feature Specifications
#### 3.1 Central 3D Atom Core
- Diameter: Proportional to container (~120px–160px).
- Styling: Deep obsidian / metallic finish with radial light specular highlight (`#ffffff`) and internal purple filaments.
- Animation: Continuous slow axial precession rotation.

#### 3.2 Orbital Particle Rings
- 3 to 4 distinct elliptical rings oriented at diverse Euler angles (e.g., `[45°, 25°, 0°]`, `[-45°, -30°, 45°]`, `[15°, 75°, -20°]`).
- Variable particle flow velocities to create depth and natural orbital motion.
- Particle density: 1,200–2,500 particles on desktop, dynamically throttled to ~600 on mobile devices.

#### 3.3 Floating Tech Cards
- High-fidelity frosted glass: `backdrop-blur-md`, `bg-white/[0.04]`, `border-white/10`, `shadow-lg shadow-purple-500/10`.
- Icons: React (`FaReact`), JavaScript (`SiJavascript`), TypeScript (`SiTypescript`), Firebase (`SiFirebase`), AWS (`FaAws`), Next.js (`SiNextdotjs`), Tailwind (`SiTailwindcss`).
- Hover effect: Gentle glow boost and subtle scale on hover.

---

### 4. Acceptance Criteria
- [x] 3D Atom animation renders seamlessly in place of the static hero graphic.
- [x] Orbital rings, glowing particle dust, and internal sphere filaments animate smoothly at ~60 FPS.
- [x] Responsive layout across Desktop, Laptop, Tablet, and Mobile screens.
- [x] Zero console errors, zero memory leaks, and clean unmount lifecycle.
- [x] Production build passes (`npm run build` exits 0).
