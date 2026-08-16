# BELENTANI — JUDAS EXPERIENCE

## Tres direcciones iniciales

### Approach 1 — The Living Archive
**Very Brief Intro:** Una instalación digital oscura en la que el visitante entra en un archivo vivo. La historia aparece como evidencia fragmentada: memoria, sonido, objetos y errores del sistema se contradicen entre sí.

**Probability:** 0.07

### Approach 2 — Red Planet Opera
**Very Brief Intro:** Una ópera espacial de gran escala: el scroll es una cámara que atraviesa un planeta rojo, una ciudad industrial y un templo-servidor. La música guía el ritmo de la puesta en escena.

**Probability:** 0.03

### Approach 3 — Judas Protocol / Tactical Interface
**Very Brief Intro:** Un juego narrativo de espionaje con HUD diegético, terminales y códigos. El usuario interpreta anomalías, desbloquea archivos y decide qué versión de la caída merece creer.

**Probability:** 0.09

## Dirección elegida — The Living Archive

La experiencia será una obra web audiovisual en la que **el navegador actúa como un archivo que respira**. No se mostrará una landing page con bloques; se construirá un mundo con escenas, estados, objetos simbólicos y una interfaz que parece existir antes de la llegada del visitante.

### Design Movement

La dirección combina **cinema sci-fi analógico**, **brutalismo digital**, **art direction de campañas musicales de lujo** y **surrealismo postapocalíptico**. WebGL será el lenguaje espacial principal; CSS será una capa de instrumentación y legibilidad, no un sustituto de un mundo 3D.

### Core Principles

1. **La interfaz es evidencia.** Todo elemento visual tiene una función narrativa, física o de orientación. Un panel no adorna: registra, oculta, desbloquea o contradice.
2. **La profundidad precede a la ornamentación.** La sensación de volumen nace de cámara, luz, sombra, niebla, materiales y ritmo de transición; el neón se reserva para señales importantes.
3. **El misterio no se resuelve por completo.** El visitante puede reconstruir una cadena de hechos, pero no recibe una explicación única sobre Judas.
4. **La complejidad debe degradar con elegancia.** La experiencia máxima se ofrece con WebGL y audio; en equipos modestos conserva la historia, el archivo y los controles esenciales.

### Color Philosophy

El color principal será **obsidian black** y carbón metálico. El rojo líquido marca memoria, sangre, deseo y consecuencias. Un blanco mineral sirve para texto y evidencia. El cyan se utilizará solo para telemetría, coordenadas y estados de sistema. Un ámbar oxidado aparecerá en objetos antiguos y señales de peligro. La paleta evita convertir todo en neón: el contraste emocional necesita oscuridad real.

| Token | Función | Intención |
|---|---|---|
| `#050607` | Void / fondo | Profundidad y silencio |
| `#101416` | Panel / metal | Instrumentación y materia |
| `#EDE9DF` | Texto / polvo | Legibilidad y memoria |
| `#F03A32` | Judas red | Deseo, violencia, archivo vivo |
| `#54D8E7` | Telemetry cyan | Datos, coordenadas, sistema |
| `#D3A45C` | Oxidized amber | Evidencia, reliquia, desgaste |

### Layout Paradigm

La composición será **orbital y asimétrica**. El canvas 3D ocupará el espacio completo; el HUD aparecerá como capas laterales, retículas, captions y coordenadas. La navegación no será una barra superior: será un **radar de escenas** y un índice vertical de capítulos que se abre mediante gesto, teclado o botón. Los paneles nunca ocuparán el centro si el centro está reservado para una reliquia, horizonte o evento.

### Signature Elements

- **The Judas Thread:** una hebra roja de luz que conecta escenas, se tensa con el scroll y se fragmenta cuando el sistema detecta una contradicción.
- **Evidence Windows:** pequeños marcos de archivo con timestamp, coordenada, estado y un fragmento de contenido; algunos se pueden arrastrar o abrir.
- **The Red Planet:** una esfera procedural con shader de superficie líquida, anillos de partículas y tres estados de acceso: unknown, partial, recovered.

### Interaction Philosophy

La interacción responde a la curiosidad, no al ruido. Mover el cursor inclina el campo y revela parallax; hacer scroll viaja por la escena; click/tap sobre una reliquia acerca la cámara; mantener pulsado activa un pulso de escaneo; las teclas `1–6` saltan a escenas si el usuario necesita una ruta accesible. El puzzle Judas Protocol nunca exige reflejos: exige observar, recordar y conectar pistas.

### Animation

La animación será cinematográfica y con inercia. La entrada comienza en negro con una señal de boot de menos de tres segundos. Los objetos flotan con desplazamientos de baja amplitud y velocidades distintas. Las transiciones entre escenas usan un wipe volumétrico, una respiración de la luz roja y una ligera aberración cromática; no se usarán loops rápidos en todo el viewport. El cursor tendrá un retículo contextual, los botones responderán en 120–180 ms y las escenas narrativas se revelarán con stagger de 40–70 ms. `prefers-reduced-motion` desactiva camera travel, parallax, glitch y partículas de alto coste, pero conserva los estados y el texto.

### Typography System

Los titulares usarán **Space Grotesk** o **IBM Plex Sans Condensed** con tracking negativo y mayúsculas controladas. El cuerpo usará **DM Sans** o **IBM Plex Sans** para lectura. Los datos técnicos usarán **Space Mono** en pequeños bloques. La jerarquía es deliberadamente editorial: título de escena, subtítulo breve, evidencia secundaria y microcopy de sistema.

### Brand Essence

**Belentani es un artista que convierte la memoria, el deseo y la caída en un universo interactivo para quienes no quieren limitarse a escuchar una canción: quieren entrar en ella.**

**Personality:** enigmático, cinematográfico, indomable.

### Brand Voice

Las headlines son tensas y memorables; los CTAs suenan a acción dentro del sistema, no a marketing convencional. El microcopy es preciso, breve y ligeramente ambiguo.

- **Ejemplo de headline:** `LA MEMORIA NO ES UNA PRUEBA.`
- **Ejemplo de CTA:** `ABRIR EL ARCHIVO / 03`

### Wordmark & Logo

El símbolo será una **aguja atravesando un círculo incompleto**, con una pequeña ruptura lateral que representa una señal interrumpida. El wordmark será tipográfico en código, pero no dependerá del logo generado anterior; en esta fase se prioriza la marca verbal y el símbolo se construirá como SVG/CSS para mantener nitidez, accesibilidad y control responsive.

### Signature Brand Color

**Judas Red `#F03A32`**: un rojo de señal y materia, menos artificial que un magenta puro. Debe sentirse como luz líquida sobre metal oscuro, no como una interfaz gaming genérica.

## Reglas de contenido y provenance

Las fotos reales del artista procedentes de los adjuntos del usuario serán la única fuente humana principal. No se generarán retratos ni likenesses. Las imágenes de Dribbble y Google Images se tratan como referencias; solo se incorporarán fotografías públicas con licencia verificable y se conservará su atribución. Los assets generados serán abstractos, texturas, símbolos, fondos ambientales o UI sin figura humana.

## Decisión de arquitectura

La aplicación se implementará como React + TypeScript con un motor Three.js/WebGL encapsulado en un componente de canvas. El sistema tendrá `SceneDirector`, `InputRouter`, `QualityManager`, `AudioField`, `PostFXStack`, `PuzzleState` y `AssetRegistry`. La UI se mantendrá desacoplada del loop 3D mediante eventos tipados para poder degradar a modo 2D sin reescribir la narrativa.

## Test de coherencia

> ¿Esta elección hace sentir que el visitante ha entrado en un sistema vivo que existía antes de su llegada?

Si la respuesta es no, se elimina o se convierte en evidencia narrativa. La complejidad técnica solo entra cuando mejora la sensación de mundo, agencia o descubrimiento.
