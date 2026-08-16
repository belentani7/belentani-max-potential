# BELENTANI — JUDAS EXPERIENCE

## Product goal

Reconstruir el sitio como una experiencia audiovisual interactiva ejecutada en el navegador. El visitante entra en un sistema de archivo que combina mundo 3D, narrativa fragmentada, música, objetos simbólicos y un escape room narrativo.

## First playable slice

La primera entrega jugable debe cubrir una secuencia completa: `SYSTEM INITIALIZING` → campo orbital de reliquias → transición a ciudad/templo-servidor → archivo de memoria → primer desbloqueo del `JUDAS PROTOCOL`. El visitante debe poder volver al índice de escenas y salir del estado de puzzle sin quedar bloqueado.

## Scene graph

| ID | Scene | Purpose | Main visual system | Interaction |
|---|---|---|---|---|
| `boot` | System Initializing | Crear expectativa y establecer lenguaje | Grain, scanline, signal pulse | Tap/click/Enter to begin |
| `orbit` | The Relic Field | Presentar los objetos como mundo físico | Particle rings, liquid red light, procedural relics | Pointer orbit, hover, select relic |
| `city` | The Server Cathedral | Introducir la escala y la amenaza | Brutalist towers, fog, light shafts, holograms | Scroll camera, open evidence window |
| `desert` | Ash Horizon | Contrastar con silencio y materia | Sand plane, dust particles, distant beacon | Drag/touch horizon, scan beacon |
| `planet` | The Red Planet | Centro de memoria y riesgo | Shader sphere, atmospheric rim, orbiting debris | Rotate, zoom, unlock nodes |
| `archive` | Belentani Archive | Human content and music layer | Photo frames, waveform, evidence UI | Open fragment, play/pause audio |
| `protocol` | Judas Protocol | Puzzle and narrative reveal | Terminal, red thread, corrupted frames | Enter phrase, connect clues |

## Risk slices

### Risk 1 — Canvas lifecycle

El motor debe iniciarse una sola vez bajo React 19 StrictMode, limpiar eventos y liberar recursos en desmontaje. El canvas no puede romper el layout cuando WebGL falla.

### Risk 2 — Scene transitions

Las escenas no se montan/desmontan sin control; el director cambia estados y activa/desactiva sistemas. La transición debe ocultar discontinuidades de cámara con un fade de señal y un cambio de exposición.

### Risk 3 — Custom shader materials

El primer shader custom será una esfera líquida roja con Fresnel, ruido procedural y emisión animada. Debe tener fallback a `MeshStandardMaterial` con emissive para equipos que no soporten la ruta avanzada.

### Risk 4 — Dynamic particles

Las partículas deben utilizar `BufferGeometry` y actualizar buffers existentes. No se permite crear arrays o geometrías nuevas en cada frame. La densidad se decide por `QualityManager`.

### Risk 5 — Post-processing

El pipeline se mantendrá liviano y modular. El primer pase será un compositor interno con render-to-texture y una composición final de grain/vignette/glitch; bloom complejo se activará solo en `cinematic`.

### Risk 6 — Audio permission

El audio se inicia únicamente tras una interacción del usuario. La experiencia es comprensible sin audio. Si no hay stream autorizado de `Mon Amour`, el reproductor muestra `AUDIO SOURCE PENDING` en vez de simular reproducción.

### Risk 7 — Puzzle state

El puzzle se modela como estado persistente local: pistas descubiertas, archivos abiertos y palabra aceptada. Las respuestas se validan en minúsculas, con trim, y nunca se revela la solución en el DOM inicial.

## Quality tiers

| Tier | DPR cap | Particles | Post FX | Use |
|---|---:|---:|---|---|
| `cinematic` | 2 | 3600–5000 | bloom, grain, vignette, chromatic offset | Desktop/GPU capable |
| `balanced` | 1.5 | 1800–2600 | grain, vignette, light glitch | Default |
| `low-power` | 1 | 500–900 | vignette only | Mobile, reduced motion, weak GPU |

## Verification criteria

- El primer viewport comunica una secuencia de boot sin mostrar una landing plana.
- El canvas ocupa el viewport y el HUD no bloquea la interacción principal.
- Al menos una reliquia 3D responde a hover/tap y abre un archivo.
- El scroll cambia cámara y estado, no solo mueve bloques HTML.
- La esfera roja utiliza un material animado o un fallback visible.
- El puzzle puede descubrirse y resolverse con las pistas presentes.
- Los assets humanos se sirven desde URLs de almacenamiento y no se guardan dentro de `client/public`.
- El sitio sigue siendo usable sin audio, sin hover y con reducción de movimiento.
- `pnpm check` y `pnpm build` completan sin errores.
- Se capturan screenshots de `/?demo`, desktop y mobile.

## Definition of done

La reconstrucción estará lista cuando el usuario pueda sentir una secuencia narrativa jugable, identificar la canción y al artista, explorar al menos una escena 3D y entender cómo continuar sin leer documentación externa. El entregable será un checkpoint `manus-webdev://...`; la publicación se realizará desde la interfaz de Management UI por parte del usuario.
