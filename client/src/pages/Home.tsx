import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Zap, Play, Pause, Volume2, ExternalLink } from 'lucide-react';

/**
 * BELENTANI - O Enigma Místico
 * Design Philosophy: Cyberpunk Warrior-Angel + Mystical Narrative
 * 
 * Visual Direction:
 * - Dark cyberpunk aesthetic with neon red (#FF0055), magenta (#9D00FF), cyan (#00D9FF)
 * - Asymmetric layout with parallax and dynamic reveals
 * - Typography: Bold display fonts + readable body text
 * - Animations: Snappy (150-250ms), energy lines, glitch effects
 * - Atmosphere: Mystery, power, serenity, technology, spirituality
 * - All sections: Hero, Narrative, Five Elements, Music (Mon Amour), Allies, Contact
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const allies = [
    { name: 'Lorena', color: 'from-purple-600', role: 'La Madre', desc: 'Que no juzga' },
    { name: 'Natalia', color: 'from-yellow-500', role: 'El Halcón', desc: 'Visión periférica' },
    { name: 'Duck Prod', color: 'from-green-500', role: 'El Arquitecto', desc: 'Caos rítmico' },
    { name: 'Pedro', color: 'from-gray-600', role: 'La Roca', desc: 'Fundación' },
    { name: 'Marcos', color: 'from-blue-500', role: 'El Cronista', desc: 'Observador' },
    { name: 'Santos', color: 'from-yellow-400', role: 'Santidad', desc: 'Plural' },
    { name: 'John', color: 'from-emerald-500', role: 'La Flecha', desc: 'Golpea el caos' },
    { name: 'Rafael', color: 'from-orange-600', role: 'El Escudo', desc: 'Guerrero' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-red-500/20">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718208954/DgBtiqY3PapGMuwMLtqync/belentani-logo-symbol-Wp7rrEyxRgPa4gdKwggvDx.webp"
              alt="Belentani"
              className="w-8 h-8"
            />
            <span className="font-black text-xl tracking-wider text-red-500">BELENTANI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#narrative" className="text-xs font-bold hover:text-red-500 transition-colors tracking-widest">ERA DE JUDAS</a>
            <a href="#elements" className="text-xs font-bold hover:text-red-500 transition-colors tracking-widest">5 ELEMENTOS</a>
            <a href="#music" className="text-xs font-bold hover:text-red-500 transition-colors tracking-widest">MÚSICA</a>
            <a href="#allies" className="text-xs font-bold hover:text-red-500 transition-colors tracking-widest">ALIADOS</a>
            <a href="#contact" className="text-xs font-bold hover:text-red-500 transition-colors tracking-widest">CONTACTO</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Hero Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663718208954/DgBtiqY3PapGMuwMLtqync/belentani-hero-warrior-TruvbwBkvRAhEqrG28WbjV.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950 z-10" />

        {/* Energy Lines Overlay */}
        <div
          className="absolute inset-0 z-20 opacity-25"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663718208954/DgBtiqY3PapGMuwMLtqync/belentani-energy-pattern-asxvWSBYMkDUvFHcZxz3ht.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-30 container mx-auto px-4 text-center max-w-4xl">
          <div className="mb-8 inline-block">
            <div className="border border-cyan-500/50 px-6 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-cyan-400 text-xs tracking-widest font-bold">BELENTANI × DUCK PROD</span>
            </div>
          </div>

          <h1 className="font-black text-6xl md:text-8xl mb-6 text-red-500 leading-tight tracking-tighter" style={{
            textShadow: '0 0 30px rgba(255, 0, 85, 0.6), 0 0 60px rgba(255, 0, 85, 0.3)'
          }}>
            VOCÊ VAI LEMBRAR MEU NOME
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            O silêncio é minha arma. A música é meu poder. Sou o enigma que não pode ser controlado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-0 text-sm font-bold tracking-wider"
              onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Music className="w-5 h-5 mr-2" />
              ESCUCHAR MON AMOUR
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-sm font-bold tracking-wider"
              onClick={() => document.getElementById('narrative')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-5 h-5 mr-2" />
              EXPLORAR NARRATIVA
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>
      </section>

      {/* The Narrative Section */}
      <section id="narrative" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 md:order-1">
              <h2 className="font-black text-5xl md:text-6xl mb-8 text-red-500 tracking-tighter">
                LA ERA DE JUDAS
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed font-light text-lg">
                Belentani es <span className="text-cyan-400 font-semibold">El Artefacto</span> - una síntesis de poder guerrero y voz angelical. Existe en la intersección entre lo ancestral y lo futuro, navegando entre la realidad física y una nube de datos.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
                En la Era de Judas, donde el código es mágico y la música es poder, Belentani permanece <span className="text-magenta-400 font-semibold">estratégicamente inalcanzable</span>. Su fortaleza no es física sino intelectual y espiritual.
              </p>
              <div className="flex gap-4">
                <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-purple-600" />
                <p className="text-sm text-gray-400 italic font-light">
                  "Cuando amar se vuelve insoportable, la historia intenta repetirse para pagar la deuda del beso"
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="order-1 md:order-2 relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-slate-950 to-purple-600/20" />
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718208954/DgBtiqY3PapGMuwMLtqync/belentani-desert-dimension-dwQTeUveXEkCWxRWypuP39.webp"
                  alt="Zion Dimension"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Elements Section */}
      <section id="elements" className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="font-black text-5xl md:text-6xl text-center mb-16 text-red-500 tracking-tighter">
            LOS CINCO ELEMENTOS
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: 'San Pedro', color: 'from-gray-600', desc: 'La roca fundamental', icon: '⛰️' },
              { name: 'San Marcos', color: 'from-blue-600', desc: 'El cronista', icon: '📖' },
              { name: 'Santos', color: 'from-yellow-500', desc: 'Santidad plural', icon: '✨' },
              { name: 'Belentani', color: 'from-red-600', desc: 'El Artefacto', icon: '⚡' },
              { name: 'El Humano', color: 'from-cyan-500', desc: 'La interfaz', icon: '👤' },
            ].map((element, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-lg border border-red-500/20 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${element.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`} />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{element.icon}</div>
                  <h3 className="text-lg font-black text-white mb-2 tracking-wide">{element.name}</h3>
                  <p className="text-sm text-gray-400 font-light">{element.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section - Mon Amour */}
      <section id="music" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-black text-5xl md:text-6xl mb-8 text-purple-500 text-center tracking-tighter">
              LA MÚSICA ES PODER
            </h2>
            <p className="text-gray-300 mb-12 text-center font-light text-lg">
              Cada nota es un acto de defensa. Cada silencio es una estrategia. La música de Belentani es la manifestación de su poder absoluto.
            </p>

            {/* Music Player */}
            <div className="border border-red-500/30 p-8 rounded-lg bg-slate-900/50 backdrop-blur-sm hover:border-red-500/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400 font-bold tracking-widest">BELENTANI</p>
                    <p className="text-2xl font-black text-white tracking-tight">MON AMOUR</p>
                    <p className="text-xs text-cyan-400 font-semibold">Acapella Version</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-red-500/20 rounded-full overflow-hidden mb-4">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-500 to-purple-600" />
              </div>
              <p className="text-xs text-gray-500 text-center font-light">1:45 / 3:12</p>

              {/* Streaming Links */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded transition-all duration-300 text-sm font-bold">
                  <ExternalLink className="w-4 h-4" />
                  Apple
                </a>
                <a href="https://open.spotify.com/intl-es/artist/2bU5Ir70YHHuUnq2f3WCYl" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 rounded transition-all duration-300 text-sm font-bold">
                  <ExternalLink className="w-4 h-4" />
                  Spotify
                </a>
                <a href="https://www.youtube.com/@belentani" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded transition-all duration-300 text-sm font-bold">
                  <ExternalLink className="w-4 h-4" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allies Section */}
      <section id="allies" className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="font-black text-5xl md:text-6xl text-center mb-16 text-red-500 tracking-tighter">
            LOS ALIADOS
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {allies.map((ally, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-lg border border-red-500/20 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${ally.color} opacity-0 group-hover:opacity-15 rounded-lg transition-opacity`} />
                <div className="relative z-10">
                  <h3 className="text-lg font-black text-white mb-2 tracking-wide">{ally.name}</h3>
                  <p className="text-sm text-gray-300 font-semibold mb-1">{ally.role}</p>
                  <p className="text-xs text-gray-400 font-light">{ally.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Judas Poster Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718208954/DgBtiqY3PapGMuwMLtqync/belentani-judas-poster-CjT9YbeATaZvczxCFkdZPG.webp"
              alt="JUDAS - Next Release"
              className="w-full rounded-lg shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 border-t border-red-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-black text-5xl md:text-6xl mb-8 text-cyan-400 tracking-tighter">
            CONECTA CONMIGO
          </h2>
          <p className="text-gray-300 mb-12 max-w-xl mx-auto font-light text-lg">
            El silencio es temporal. Cuando estoy listo, el mundo lo sabrá.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://open.spotify.com/intl-es/artist/2bU5Ir70YHHuUnq2f3WCYl" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 font-bold tracking-wider"
              >
                SPOTIFY
              </Button>
            </a>
            <a href="https://www.youtube.com/@belentani" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10 font-bold tracking-wider"
              >
                YOUTUBE
              </Button>
            </a>
            <a href="https://www.instagram.com/belentani_" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold tracking-wider"
              >
                INSTAGRAM
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-red-500/20 text-center text-gray-500 text-sm font-light">
        <p>© 2026 BELENTANI. O Enigma Místico. Era de Judas.</p>
      </footer>

      {/* Global Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 0, 85, 0.5); }
          50% { text-shadow: 0 0 40px rgba(255, 0, 85, 0.8); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 85, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 0, 85, 0.6); }
        }
      `}</style>
    </div>
  );
}
