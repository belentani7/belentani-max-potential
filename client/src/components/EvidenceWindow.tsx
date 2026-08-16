import React, { useState } from 'react';
import { X, ExternalLink, Music, ShieldAlert, CheckCircle2, Disc, User, Users, Globe, Award } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'music' | 'allies'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest">
              BELENTANI CENTRAL ARCHIVE // DATABASE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-cyan-500/20 bg-slate-950/40 px-6 gap-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> ARTISTA & ERA
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`py-3 border-b-2 font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'music'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" /> MON AMOUR
          </button>
          <button
            onClick={() => setActiveTab('allies')}
            className={`py-3 border-b-2 font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'allies'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> RED DE ALIADOS
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                  BELENTANI // GUERRERO-ÁNGL
                </h2>
                <p className="text-gray-300 font-light leading-relaxed mb-6">
                  Artista brasileño de 1.94m con una presencia escénica magnética. Su visión artística combina la estética cyberpunk, el misticismo digital y la narrativa de la <span className="text-red-500 font-medium">Era de Judas</span> y la Dimensión Zion.
                </p>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="bg-slate-950/60 p-3 rounded border border-cyan-500/20">
                    <span className="text-gray-500 block mb-1">ORIGEN</span>
                    <span className="text-white font-bold">Brasil</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded border border-cyan-500/20">
                    <span className="text-gray-500 block mb-1">ALTURA</span>
                    <span className="text-white font-bold">1.94 m</span>
                  </div>
                </div>
              </div>
              <div className="border border-red-500/30 rounded-xl p-6 bg-slate-950/60 space-y-4">
                <h3 className="font-mono text-xs text-red-400 tracking-widest font-bold">
                  FILOSOFÍA CREATIVA
                </h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  "La música no es solo sonido; es un sistema de archivos que sobrevive a la caída." Belentani diseña cada lanzamiento como una experiencia inmersiva total.
                </p>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-mono text-xs text-cyan-400">
                  <span>ESTATUS: ACTIVO</span>
                  <span>ZION SECURE</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                  MON AMOUR
                </h2>
                <p className="text-gray-300 font-light leading-relaxed mb-6">
                  El himno central de la era. Una fusión impecable de melodías vocales profundas, tensión dramática y producción electrónica de primer nivel.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={onToggleAudio}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold px-6 py-3.5 rounded transition-all shadow-lg shadow-red-500/30"
                  >
                    <Music className="w-4 h-4" />
                    {isPlayingAudio ? 'PAUSAR MON AMOUR' : 'ESCUCHAR MON AMOUR'}
                  </button>
                  <a
                    href="https://open.spotify.com/intl-es/artist/2bU5Ir70YHHuUnq2f3WCYl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold px-5 py-3.5 rounded transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    SPOTIFY OFICIAL
                  </a>
                </div>
              </div>
              <div className="border border-cyan-500/30 rounded-xl p-6 bg-slate-950/60 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">FORMATO:</span>
                  <span className="text-white">STREAMING HD</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">DERECHOS:</span>
                  <span className="text-cyan-400">EXCLUSIVOS / REGISTRADOS</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">CLAVE DEL PUZZLE:</span>
                  <span className="text-red-400">JUDAS / MON AMOUR</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'allies' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                RED DE ALIADOS Y COLABORADORES
              </h2>
              <p className="text-sm text-gray-300 font-light mb-6">
                El ecosistema creativo que respalda la visión de Belentani en producción, dirección y despliegue visual.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                {['Duck Prod', 'Lorena', 'Natalia', 'Pedro', 'Marcos', 'Santos', 'John', 'Rafael'].map((ally, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-cyan-500/30 p-4 rounded-lg flex items-center justify-between">
                    <span className="text-white font-bold">{ally}</span>
                    <span className="text-cyan-400 text-[10px]">VERIFIED</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-950/80 flex justify-between items-center text-xs font-mono text-gray-500">
          <span>STATUS: SECURE ARCHIVE SYNCED</span>
          <button onClick={onClose} className="text-cyan-400 hover:underline">
            CERRAR [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtocolModal: React.FC<ProtocolModalProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (clean === 'JUDAS' || clean === 'MON AMOUR' || clean === 'BELENTANI') {
      setSolved(true);
      setError(false);
    } else {
      setError(true);
      setSolved(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-red-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-400 font-bold tracking-widest">
              JUDAS PROTOCOL // AUTHORIZATION TERMINAL
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="font-mono text-xs text-gray-300 leading-relaxed">
            &gt; ACCESO RESTRINGIDO. Introduzca la palabra clave soberana descubierta en los archivos de Belentani para autorizar el protocolo de transmisión de Mon Amour.
          </p>

          {!solved ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="CLAVE REQUERIDA (EJ: JUDAS)"
                  className="w-full bg-slate-950 border border-red-500/40 rounded-lg px-4 py-3.5 font-mono text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              {error && (
                <p className="font-mono text-xs text-red-500">
                  &gt; ERROR: CREDENCIALES RECHAZADAS POR EL SISTEMA ZION.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs tracking-widest py-3.5 rounded-lg transition-all shadow-lg shadow-red-500/20 font-bold"
              >
                AUTORIZAR PROTOCOLO
              </button>
            </form>
          ) : (
            <div className="bg-red-950/40 border border-red-500/50 p-6 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
              <h3 className="font-sans font-bold text-lg text-white">ACCESO SOBERANO CONCEDIDO</h3>
              <p className="font-mono text-xs text-gray-300">
                &gt; SISTEMA DESBLOQUEADO. La Era de Judas está activa. Belentani y la música son inseparables.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-red-500/20 bg-slate-950/80 flex justify-between items-center text-xs font-mono text-gray-500">
          <span>PISTA: EL NOMBRE DE LA ERA O LA CANCIÓN</span>
          <button onClick={onClose} className="text-red-400 hover:underline">
            SALIR [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
