"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, Component } from "react";
import type { Points as PointsType } from "three";
import type { ReactNode } from "react";

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() => {
    // Must be divisible by 3 for valid x,y,z triplets
    const count = 5001 - (5001 % 3); // = 4998
    const data = new Float32Array(count);
    random.inSphere(data, { radius: 1.2 });
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) {
        data[i] = 0;
      }
    }
    return data;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Error boundary to prevent WebGL errors from crashing the whole page
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Silently render nothing — the rest of the page still works
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <WebGLErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ failIfMajorPerformanceCaveat: false }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  </div>
);
