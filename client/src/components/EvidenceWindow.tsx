import React, { useState } from 'react';
import { X, ExternalLink, Music, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest">
              BELENTANI ARCHIVE // FILE_REF: MON_AMOUR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                MON AMOUR
              </h2>
              <p className="text-gray-300 font-light leading-relaxed mb-6">
                La canción central del universo <span className="text-red-500 font-medium">Judas</span>. Una pieza de tensión acústica y electrónica que relata el instante exacto en que la lealtad se quiebra para convertirse en arte.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onToggleAudio}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold px-6 py-3 rounded transition-all shadow-lg shadow-red-500/30"
                >
                  <Music className="w-4 h-4" />
                  {isPlayingAudio ? 'PAUSAR MON AMOUR' : 'ESCUCHAR MON AMOUR'}
                </button>
                <a
                  href="https://open.spotify.com/intl-es/artist/2bU5Ir70YHHuUnq2f3WCYl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold px-5 py-3 rounded transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  SPOTIFY ARTIST
                </a>
              </div>
            </div>

            <div className="border border-red-500/30 rounded-lg p-6 bg-slate-950/60">
              <h3 className="font-mono text-xs text-red-400 tracking-widest mb-3 font-bold">
                METADATOS DEL ARTISTA
              </h3>
              <ul className="space-y-3 font-mono text-xs text-gray-300">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">ORIGEN:</span>
                  <span className="text-white">Brasil</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">ESTATURA:</span>
                  <span className="text-white">1.94 m</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">ARQUETIPO:</span>
                  <span className="text-cyan-400">Guerrero-Ángel</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-500">ALIADOS:</span>
                  <span className="text-white">Duck Prod, Lorena, Natalia, John</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-950/50 flex justify-between items-center text-xs font-mono text-gray-500">
          <span>STATUS: VERIFIED SECURE ARCHIVE</span>
          <button onClick={onClose} className="text-cyan-400 hover:underline">
            CERRAR ARCHIVO [ESC]
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
    if (code.trim().toUpperCase() === 'JUDAS' || code.trim().toUpperCase() === 'MON AMOUR') {
      setSolved(true);
      setError(false);
    } else {
      setError(true);
      setSolved(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-red-500/40 rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-slate-950/50">
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
            &gt; ACCESO RESTRINGIDO. Introduzca la palabra clave descubierta en los fragmentos del archivo para desbloquear el protocolo de soberanía de Belentani.
          </p>

          {!solved ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="INTRODUCIR CLAVE (EJ: JUDAS)"
                  className="w-full bg-slate-950 border border-red-500/40 rounded px-4 py-3 font-mono text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              {error && (
                <p className="font-mono text-xs text-red-500">
                  &gt; ERROR: CLAVE INVÁLIDA O CORRUPTA EN EL SISTEMA.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs tracking-widest py-3 rounded transition-all shadow-lg shadow-red-500/20"
              >
                VERIFICAR CREDENCIALES
              </button>
            </form>
          ) : (
            <div className="bg-red-950/40 border border-red-500/50 p-6 rounded text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="font-sans font-bold text-lg text-white">PROTOCOLO DESBLOQUEADO</h3>
              <p className="font-mono text-xs text-gray-300">
                &gt; ACCESO CONCEDIDO. La caída se ha completado. Belentani y Judas son uno solo en el sistema.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-red-500/20 bg-slate-950/50 flex justify-between items-center text-xs font-mono text-gray-500">
          <span>HINT: BUSCA EN EL TÍTULO DE LA CANCIÓN O LA ERA</span>
          <button onClick={onClose} className="text-red-400 hover:underline">
            SALIR [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
