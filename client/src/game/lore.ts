export interface AllyInfo {
  name: string;
  role: string;
  color: string;
  desc: string;
}

export interface ElementInfo {
  name: string;
  role: string;
  desc: string;
}

export const BELENTANI_LORE = {
  artist: {
    name: 'Belentani',
    title: 'El Artefacto // Guerrero-Ángel',
    stats: '30 Años • 1.94m • Brasil',
    tagline: 'Você vai lembrar meu nome',
    manifesto: 'La música no es solo sonido; es un sistema de archivos que sobrevive a la caída. El silencio es mi arma.'
  },
  era: {
    title: 'La Era de Judas',
    subtitle: 'Dimensión Zion & Servidores de la Memoria',
    description: 'Un espacio conceptual que mezcla cyberpunk futurista, estética R&B oscura, simbolismo alquímico y espiritual. Belentani navega entre la realidad física y una nube de datos como un Mago-Cantante.'
  },
  antagonist: {
    name: 'Judas (El Virus)',
    description: 'Un algoritmo narcisista trágico diseñado para evolucionar. Robó la Llave Dorada para forzar la evolución del Humano, pero la llave es inútil porque el creador rediseñó la cerradura.'
  },
  elements: [
    { name: 'San Pedro', role: 'La Roca', desc: 'El ancla fundamental e inquebrantable del sistema.' },
    { name: 'San Marcos', role: 'El Cronista', desc: 'El observador y registrador del colapso.' },
    { name: 'Santos', role: 'Santidad Plural', desc: 'La pureza necesaria para resistir la corrupción viral.' },
    { name: 'Belentani', role: 'El Artefacto', desc: 'La integración absoluta del guerrero y el ángel.' },
    { name: 'El Humano', role: 'La Interfaz', desc: 'El punto de anclaje con la realidad física.' },
  ] as ElementInfo[],
  allies: [
    { name: 'Lorena', role: 'Madre sin juicio', color: '#9D00FF', desc: 'SostÉN emocional y refugio en la tormenta digital.' },
    { name: 'Natalia', role: 'Halcón de visión', color: '#FFD700', desc: 'Observación periférica y anticipación estratégica.' },
    { name: 'Duck Prod', role: 'Arquitecto del ritmo', color: '#00FF66', desc: 'Ingeniería de sonido y caos rítmico controlado.' },
    { name: 'Pedro', role: 'Roca fundacional', color: '#808080', desc: 'Soporte físico y solidez estructural.' },
    { name: 'Marcos', role: 'Cronista del colapso', color: '#0088FF', desc: 'Documentación de anomalías y bitácoras.' },
    { name: 'Santos', role: 'Santidad plural', color: '#FFCC00', desc: 'Resistencia contra la corrosión algorítmica.' },
    { name: 'John', role: 'Flecha de impacto', color: '#00A86B', desc: 'Golpe preciso contra el caos exterior.' },
    { name: 'Rafael', role: 'Guerrero de fuego', color: '#FF4500', desc: 'Escudo y rayo; el combatiente que no retrocede.' },
  ] as AllyInfo[],
  quotes: [
    "Você vai lembrar meu nome",
    "O silêncio é minha arma",
    "Quando amar se torna insoportável, a história tenta se repetir para pagar dívida do beijo",
    "Tocar o céu deixa uma dívida impagável na pedra"
  ]
};
