import React, { useState } from 'react';
import { SceneId } from '../game/runtime';
import { Compass, Volume2, VolumeX, Menu, X, Key, Disc, FileText } from 'lucide-react';

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

  const scenes: { id: SceneId; label: string; code: string; desc: string }[] = [
    { id: 'boot', label: 'INICIALIZACIÓN', code: '00', desc: 'Secuencia de arranque del sistema Judas' },
    { id: 'orbit', label: 'CAMPO DE RELIQUIAS', code: '01', desc: 'Órbita de artefactos y memoria digital' },
    { id: 'city', label: 'CATEDRAL DE SERVIDORES', code: '02', desc: 'Arquitectura brutalista y red Zion' },
    { id: 'desert', label: 'HORIZONTE DE CENIZA', code: '03', desc: 'El desierto místico y la travesía' },
    { id: 'planet', label: 'NÚCLEO ROJO', code: '04', desc: 'Shader vivo y pulso de Mon Amour' },
    { id: 'archive', label: 'ARCHIVO BELENTANI', code: '05', desc: 'Evidencia documental y discografía' },
    { id: 'protocol', label: 'JUDAS PROTOCOL', code: '06', desc: 'Terminal de descifrado y soberanía' },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 bg-slate-900/90 border border-cyan-500/30 px-4 py-2.5 rounded backdrop-blur-md shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <div>
            <span className="font-mono text-xs tracking-widest text-cyan-400 font-bold block">
              BELENTANI // JUDAS OS v4.2
            </span>
            <span className="font-mono text-[10px] text-gray-400">
              ARTISTA: 1.94M • BRASIL • GUERRERO-ÁNGL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/game_bible.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 px-3.5 py-2.5 rounded text-cyan-400 text-xs font-mono backdrop-blur-md transition-all shadow-lg"
            title="Biblia de Videojuego (Documentación)"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">BIBLIA PDF</span>
          </a>

          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 px-3.5 py-2.5 rounded text-cyan-400 text-xs font-mono backdrop-blur-md transition-all shadow-lg"
            title="Mon Amour Audio Stream"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-red-500 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">MON AMOUR</span>
          </button>

          <button
            onClick={onOpenArchive}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 px-3.5 py-2.5 rounded text-cyan-400 text-xs font-mono backdrop-blur-md transition-all shadow-lg"
          >
            <Disc className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">ARCHIVOS</span>
          </button>

          <button
            onClick={onOpenProtocol}
            className="flex items-center gap-2 bg-red-950/80 hover:bg-red-900/90 border border-red-500/50 px-3.5 py-2.5 rounded text-red-400 text-xs font-mono backdrop-blur-md transition-all shadow-lg shadow-red-500/20"
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">PROTOCOLO</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 rounded text-cyan-400 backdrop-blur-md transition-all shadow-lg"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      {menuOpen && (
        <div className="absolute top-24 right-6 md:right-10 w-80 bg-slate-900/95 border border-cyan-500/40 rounded-lg p-6 pointer-events-auto backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/20">
            <h3 className="font-mono text-xs text-cyan-400 font-bold tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4" /> SECTOR NAVIGATION
            </h3>
            <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {scenes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onSelectScene(s.id);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded font-mono text-xs transition-all ${
                  currentScene === s.id
                    ? 'bg-red-600/20 border border-red-500 text-red-400'
                    : 'bg-slate-800/50 hover:bg-slate-800 border border-transparent text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-0.5">
                  <span>{s.label}</span>
                  <span className="text-cyan-400">[{s.code}]</span>
                </div>
                <p className="text-[10px] text-gray-400 font-sans font-light">{s.desc}</p>
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
              EXPLORAR
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

      {/* Boot Screen Main Prompt */}
      {currentScene === 'boot' && (
        <div className="self-center my-auto pointer-events-auto text-center max-w-xl bg-slate-950/85 border border-red-500/40 p-8 md:p-10 rounded-xl backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-500/40 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] text-red-400 tracking-widest uppercase">ERA DE JUDAS // EXPERIENCE v4.2</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-sans tracking-tight text-white mb-4">
            BELENTANI
          </h1>
          <p className="text-sm text-gray-300 font-light mb-8 leading-relaxed">
            Bienvenido al sistema inmersivo de <span className="text-red-500 font-medium">Mon Amour</span> y la Dimensión Zion. El archivo guarda la evidencia; la música revela la verdad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onSelectScene('orbit')}
              className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs tracking-widest px-8 py-3.5 rounded transition-all shadow-lg shadow-red-500/30 font-bold"
            >
              ENTRAR AL SISTEMA 3D [CLICK]
            </button>
            <a
              href="/game_bible.md"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 font-mono text-xs tracking-widest px-6 py-3.5 rounded transition-all inline-flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> BIBLIA DE VIDEOJUEGO
            </a>
          </div>
        </div>
      )}

      {/* Bottom Telemetry Bar */}
      <footer className="flex items-end justify-between pointer-events-auto">
        <div className="bg-slate-900/90 border border-cyan-500/20 px-4 py-2.5 rounded backdrop-blur-md hidden sm:block shadow-lg">
          <p className="font-mono text-[10px] text-gray-400">
            SECURE REPO // ARTIST: <span className="text-white">BELENTANI</span> // COORDS: <span className="text-red-400">12.94° S, 44.20° W</span>
          </p>
        </div>

        <div className="bg-slate-900/90 border border-cyan-500/20 px-4 py-2.5 rounded backdrop-blur-md flex items-center gap-4 shadow-lg">
          <span className="font-mono text-xs text-cyan-400">SECTOR: {currentScene.toUpperCase()}</span>
          <button
            onClick={() => {
              const scenesList: SceneId[] = ['boot', 'orbit', 'city', 'desert', 'planet', 'archive', 'protocol'];
              const currentIndex = scenesList.indexOf(currentScene);
              const nextScene = scenesList[(currentIndex + 1) % scenesList.length];
              onSelectScene(nextScene);
            }}
            className="text-xs font-mono text-red-400 hover:text-red-300 underline underline-offset-4 font-bold"
          >
            SIGUIENTE FASE →
          </button>
        </div>
      </footer>
    </div>
  );
};
