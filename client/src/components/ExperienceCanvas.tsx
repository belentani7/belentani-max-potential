import React, { useEffect, useRef } from 'react';
import { ExperienceRuntime, SceneId, QualityTier } from '../game/runtime';

interface ExperienceCanvasProps {
  scene: SceneId;
  quality?: QualityTier;
  reducedMotion?: boolean;
  onSceneChange?: (scene: SceneId) => void;
}

export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({
  scene,
  quality = 'balanced',
  reducedMotion = false,
  onSceneChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ExperienceRuntime | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const runtime = new ExperienceRuntime({
      container: containerRef.current,
      quality,
      reducedMotion,
      onSceneChange,
    });

    runtimeRef.current = runtime;

    return () => {
      runtime.dispose();
      runtimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (runtimeRef.current) {
      runtimeRef.current.setScene(scene);
    }
  }, [scene]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950"
    />
  );
};
