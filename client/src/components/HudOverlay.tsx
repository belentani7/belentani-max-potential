import React, { useState } from 'react';
import { SceneId } from '../game/runtime';
import { Compass, Terminal, Disc, Shield, Volume2, VolumeX, Menu, X, Key } from 'lucide-react';

interface HudOverlayProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onOpenArchive: () => void;
  onOpenProtocol: () => void;
}

export const HudOverlay: React.FC<HudOverlayProps> = ({
  currentScene,
  onSelectScene,
  isPlayingAudio,
  onToggleAudio,
  onOpenArchive,
  onOpenProtocol,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scenes: { id: SceneId; label: string; code: string }[] = [
    { id: 'boot', label: 'INITIALIZING', code: '00' },
    { id: 'orbit', label: 'THE RELIC FIELD', code: '01' },
    { id: 'city', label: 'SERVER CATHEDRAL', code: '02' },
    { id: 'desert', label: 'ASH HORIZON', code: '03' },
    { id: 'planet', label: 'THE RED PLANET', code: '04' },
    { id: 'archive', label: 'BELENTANI ARCHIVE', code: '05' },
    { id: 'protocol', label: 'JUDAS PROTOCOL', code: '06' },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top Bar */}
      <header className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 bg-slate-900/80 border border-cyan-500/30 px-4 py-2 rounded backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-cyan-400 font-bold">
            BELENTANI // JUDAS OS v4.2
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 px-3 py-2 rounded text-cyan-400 text-xs font-mono backdrop-blur-md transition-all"
            title="Mon Amour Audio Stream"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-red-500 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">MON AMOUR</span>
          </button>

          <button
            onClick={onOpenProtocol}
            className="flex items-center gap-2 bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 px-3 py-2 rounded text-red-400 text-xs font-mono backdrop-blur-md transition-all shadow-lg shadow-red-500/20"
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">PROTOCOL</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 rounded text-cyan-400 backdrop-blur-md transition-all"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Scene Navigator Drawer */}
      {menuOpen && (
        <div className="absolute top-20 right-6 md:right-10 w-80 bg-slate-900/95 border border-cyan-500/40 rounded-lg p-6 pointer-events-auto backdrop-blur-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/20">
            <h3 className="font-mono text-xs text-cyan-400 font-bold tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4" /> SECTOR NAVIGATION
            </h3>
            <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {scenes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onSelectScene(s.id);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded font-mono text-xs flex items-center justify-between transition-all ${
                  currentScene === s.id
                    ? 'bg-red-600/20 border border-red-500 text-red-400'
                    : 'bg-slate-800/50 hover:bg-slate-800 border border-transparent text-gray-300'
                }`}
              >
                <span>{s.label}</span>
                <span className="text-cyan-500 font-bold">[{s.code}]</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex gap-2">
            <button
              onClick={() => {
                onOpenArchive();
                setMenuOpen(false);
              }}
              className="flex-1 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 py-2 rounded font-mono text-xs text-cyan-300 text-center transition-all"
            >
              ARCHIVE
            </button>
            <button
              onClick={() => {
                onOpenProtocol();
                setMenuOpen(false);
              }}
              className="flex-1 bg-red-950/50 hover:bg-red-900/60 border border-red-500/40 py-2 rounded font-mono text-xs text-red-300 text-center transition-all"
            >
              PUZZLE
            </button>
          </div>
        </div>
      )}

      {/* Center Cinematic Prompt for Boot */}
      {currentScene === 'boot' && (
        <div className="self-center my-auto pointer-events-auto text-center max-w-xl bg-slate-950/80 border border-red-500/40 p-8 rounded-lg backdrop-blur-md shadow-2xl">
          <p className="font-mono text-xs text-red-500 tracking-widest mb-3 uppercase">SYSTEM BOOT SEQUENCE</p>
          <h1 className="text-4xl md:text-5xl font-black font-sans tracking-tight text-white mb-4">
            BELENTANI
          </h1>
          <p className="text-sm text-gray-300 font-light mb-8 leading-relaxed">
            Has entrado en la experiencia interactiva de <span className="text-red-500 font-medium">Judas</span>. El silencio es la única estrategia; el archivo guarda la evidencia.
          </p>
          <button
            onClick={() => onSelectScene('orbit')}
            className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs tracking-widest px-8 py-3 rounded transition-all shadow-lg shadow-red-500/30"
          >
            INICIAR EXPERIENCIA [CLICK]
          </button>
        </div>
      )}

      {/* Bottom Telemetry Bar */}
      <footer className="flex items-end justify-between pointer-events-auto">
        <div className="bg-slate-900/80 border border-cyan-500/20 px-4 py-2 rounded backdrop-blur-md hidden sm:block">
          <p className="font-mono text-[10px] text-gray-400">
            SECURE REPO // BR: <span className="text-cyan-400">ONLINE</span> // COORDS: <span className="text-red-400">12.94° S, 44.20° W</span>
          </p>
        </div>

        <div className="bg-slate-900/80 border border-cyan-500/20 px-4 py-2 rounded backdrop-blur-md flex items-center gap-4">
          <span className="font-mono text-xs text-cyan-400">SCENE: {currentScene.toUpperCase()}</span>
          <button
            onClick={() => {
              const scenesList: SceneId[] = ['boot', 'orbit', 'city', 'desert', 'planet', 'archive', 'protocol'];
              const currentIndex = scenesList.indexOf(currentScene);
              const nextScene = scenesList[(currentIndex + 1) % scenesList.length];
              onSelectScene(nextScene);
            }}
            className="text-xs font-mono text-red-400 hover:text-red-300 underline underline-offset-4"
          >
            SIGUIENTE FASE →
          </button>
        </div>
      </footer>
    </div>
  );
};
