import React, { useState } from 'react';
import { ExperienceCanvas } from '../components/ExperienceCanvas';
import { HudOverlay } from '../components/HudOverlay';
import { ArchiveModal, ProtocolModal } from '../components/EvidenceWindow';
import { SceneId, QualityTier } from '../game/runtime';

/**
 * BELENTANI — JUDAS EXPERIENCE
 * World-class immersive web artwork & audiovisual game-like experience.
 */

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneId>('boot');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [quality] = useState<QualityTier>('balanced');
  const [reducedMotion] = useState(false);

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white font-sans select-none">
      {/* 3D WebGL World Canvas */}
      <ExperienceCanvas
        scene={currentScene}
        quality={quality}
        reducedMotion={reducedMotion}
        onSceneChange={(scene) => setCurrentScene(scene)}
      />

      {/* Diegetic HUD & Navigation */}
      <HudOverlay
        currentScene={currentScene}
        onSelectScene={(scene) => setCurrentScene(scene)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenProtocol={() => setIsProtocolOpen(true)}
      />

      {/* Evidence & Archive Modal */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />

      {/* Judas Protocol Puzzle Terminal */}
      <ProtocolModal
        isOpen={isProtocolOpen}
        onClose={() => setIsProtocolOpen(false)}
      />
    </main>
  );
}
