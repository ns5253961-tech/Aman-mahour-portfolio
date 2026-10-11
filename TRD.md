# Technical Requirements Document (TRD)
## Project: 3D Atom / Particle Orbit Animation Integration
**Version**: 1.0  
**Status**: Technical Architecture & Specification  

---

### 1. Rendering Architecture
The 3D Atom Animation is implemented as a high-performance **interactive Canvas rendering component** with responsive coordinate mapping and layered DOM glassmorphism elements.

```
┌────────────────────────────────────────────────────────┐
│ <AtomOrbitCanvas /> (Interactive Container)            │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Layer 1: Futuristic Radar Grid (SVG / Canvas)    │  │
│  │ Layer 2: 3D Orbital Particle Ribbons & Dust     │  │
│  │ Layer 3: Central Obsidian Sphere + Specular Core │  │
│  │ Layer 4: Floating Glassmorphic Tech Cards (DOM)  │  │
│  │ Layer 5: Ambient Purple Lens Flare               │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

### 2. Math & 3D Orbital Projection Pipeline
1. **Parametric Elliptical Curve Equation**:
   Each orbit $k$ is parameterized by:
   $$x_0(t) = a_k \cos(\theta(t)), \quad y_0(t) = b_k \sin(\theta(t)), \quad z_0(t) = c_k \sin(\theta(t))$$
2. **3D Rotation Matrix Transformation**:
   Transform point $P_0$ using Euler angle rotations $(R_x, R_y, R_z)$ representing orbit inclination and precession:
   $$P' = R_z(\gamma_k) \cdot R_y(\beta_k) \cdot R_x(\alpha_k) \cdot P_0$$
3. **Perspective Projection**:
   Map $(x', y', z')$ to 2D screen coordinates $(X, Y)$:
   $$scale = \frac{focalLength}{focalLength + z'}, \quad X = centerX + x' \cdot scale, \quad Y = centerY + y' \cdot scale$$
4. **Depth Sorting & Z-Index Layering**:
   Particles and orbital ribbon segments behind the central sphere ($z' < z_{sphere}$) are drawn before the sphere; those in front ($z' \ge z_{sphere}$) are drawn after the sphere to ensure authentic 3D occlusion.

---

### 3. Performance & Resource Management
- **Hardware Acceleration**: Canvas context utilizes 2D hardware-accelerated batch operations (`arc`, `fill`, `createRadialGradient`).
- **Device Pixel Ratio (DPR)**: Clamped between `1.0` and `2.0` to avoid GPU bandwidth exhaustion on retina 3x displays.
- **Delta-Time Animation Loop**: Frame updates utilize `performance.now()` delta times, eliminating framerate jitter on high-refresh-rate displays (120Hz/144Hz).
- **Page Visibility & ResizeObserver**:
  - The render loop pauses when `document.hidden === true` or when the container scrolls out of view via `IntersectionObserver`.
  - Debounced resize recalculations adapt dynamically without recreating buffers every frame.
- **Cleanup**: `cancelAnimationFrame`, `ResizeObserver.disconnect()`, and all event listeners are cleanly disposed in `useEffect` cleanup.

---

### 4. Floating Tech Cards Configuration
Floating badges utilize CSS `backdrop-filter: blur(12px)` and coordinate offsets computed around the orbit:
- `React`: Top-left quadrant $(-140px, -180px)$
- `JavaScript (JS)`: Top center $(0px, -210px)$
- `TypeScript (TS)`: Bottom-left $(-160px, 140px)$
- `AWS`: Bottom-right $(150px, 130px)$
- `Firebase`: Center-left $(-180px, -30px)$
- `Next.js / Astro`: Center-right $(180px, -20px)$

---

### 5. Fallback & Safe Degradation
- If Canvas is unsupported or JavaScript is disabled, a pre-rendered high-contrast fallback vector representation is preserved.
- `prefers-reduced-motion`: When active, particle velocities freeze or reduce by 90% while maintaining crisp visual fidelity.
