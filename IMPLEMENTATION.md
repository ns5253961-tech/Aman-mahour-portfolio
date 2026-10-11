# IMPLEMENTATION.md
## Build & Integration Guide: 3D Atom / Orbit Particle Animation

---

### Step 1: Component Creation (`components/sub/atom-orbit.tsx`)
Create an encapsulated, high-performance atom animation component containing:
1. **Interactive Canvas**: Rendering the 3D rotating particle ribbons, glowing orbital dust, central specular obsidian sphere, and internal energy filaments.
2. **Interactive Drag/Rotate**: Mouse and touch drag interaction with inertia damping, matching the reference ("Drag to rotate / Click to reforge").
3. **Radar Grid**: Background concentric rings with radial axis lines.
4. **Floating Glass Tech Cards**: Interactive badges with icons for React, JavaScript, TypeScript, AWS, Firebase, Next.js.
5. **Purple Lens Flare**: Ambient gradient glow in the corner matching the reference image.

---

### Step 2: Hero Integration (`components/sub/hero-content.tsx`)
Replace the static placeholder image `<Image src="/hero-bg.svg" ... />` with the new interactive `<AtomOrbit />` component.

---

### Step 3: Responsive Behavior Validation
- **Desktop (>=1024px)**: Full scale (~600px width), ~1800 particles, all floating tech cards active.
- **Tablet (768px–1023px)**: Scaled (~480px width), ~1000 particles, floating cards scaled to 90%.
- **Mobile (<768px)**: Scaled (~340px width), ~600 particles, touch drag enabled, zero horizontal overflow.

---

### Step 4: Verification & Production Build
1. Start dev server: `npm run dev`
2. Run linter: `npm run lint`
3. Run production build: `npm run build`
4. Confirm 0 runtime console errors, 60 FPS performance, and clean memory teardown.
