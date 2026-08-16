# Investigación de referencias — BELENTANI / JUDAS EXPERIENCE

## Principios de referencia, no de copia

La colección de WebGL de Awwwards se utiliza como índice de inspiración para estudiar cómo se combinan gráficos avanzados y desarrollo interactivo, no como fuente directa de assets. El patrón útil para BELENTANI es presentar la experiencia como un sistema navegable y no como una página convencional, con una interfaz que se descubre progresivamente. Fuente: [Awwwards — Best WebGL Websites](https://www.awwwards.com/websites/webgl/).

El caso de estudio de Jam3 sobre una experiencia con múltiples capítulos confirma que una experiencia inmersiva funciona mejor cuando cada sección tiene una interacción propia y una lógica narrativa clara. Los pilares descritos —juego, curiosidad y gratitud— son un ejemplo de cómo limitar una dirección creativa para que la interacción no sea decoración. El artículo documenta además técnicas de geometría personalizada, render targets, instancing, físicas, cubemaps, partículas, postprocesado modular y perfiles de rendimiento por GPU. Fuente: [Jam3 — How We Built a Playful WebGL Experience for 100 FWA Wins](https://medium.com/@Jam3/how-we-built-a-playful-webgl-experience-for-100-fwa-wins-12262265548d).

## Aplicación al nuevo sitio

| Referencia observada | Traducción propia para BELENTANI |
|---|---|
| Capítulos narrativos con interacción distinta | Sistema de escenas: Boot, Orbit, City, Desert, Archive y Judas Protocol |
| Objetos manipulables en vez de tarjetas | Reliquias 3D: espejo, máscara, llave, corazón, pendrive y planeta rojo |
| Postprocesado activado según el momento | Pipeline con bloom, grain, vignette, aberración y glitch por escena |
| Rendimiento por perfil de dispositivo | Tres niveles: cinematic, balanced y low-power con DPR y partículas adaptativos |
| Scroll/cámara como viaje | El scroll mueve el estado de la cámara y activa eventos de escena |
| Descubrimiento progresivo | HUD diegético mínimo + archivos bloqueados + códigos y mensajes ocultos |
| Audio como parte de la interacción | `Mon Amour` como capa opcional, nunca necesaria para comprender la historia |

## Fuentes y límites

Las páginas de inspiración son referencias conceptuales. No se reutilizarán imágenes, logos, copy, código protegido o diseños identificables. Las fotografías humanas se limitarán a archivos proporcionados por el usuario o a imágenes públicas cuya licencia y atribución sean comprobables. Si una fuente visual de Dribbble o Google Images no tiene licencia clara para redistribución, solo se usará como referencia de dirección artística y no se incluirá en el producto.

## Riesgos técnicos identificados

El artículo de Jam3 confirma que transparencia, profundidad, postprocesado y reflejos requieren soluciones específicas; por ello la implementación debe tener un pipeline modular, evitar asignaciones por frame y degradar calidad según dispositivo. La experiencia debe mostrar una ruta narrativa funcional incluso cuando WebGL esté desactivado, haya poca potencia o el usuario active `prefers-reduced-motion`.

## Pendiente

- [ ] Revisar más benchmarks directos de experiencias de música/interacción.
- [ ] Buscar fuentes de fotos públicas con licencia clara y separar referencias de assets publicables.
- [ ] Diseñar el mapa de escenas y estados del puzzle antes de escribir el motor.

## Investigación visual pública

La búsqueda de imágenes devolvió referencias de Dribbble para interfaces cyberpunk y fuentes fotográficas de Unsplash para desierto nocturno. Dribbble resulta útil para estudiar HUDs, wireframes y jerarquía de interfaz, pero no se integrará como asset sin licencia explícita del autor. Las páginas de Unsplash muestran fotografías de paisaje y enlaces individuales; una imagen solo se incorporará si se verifica su licencia y se registra atribución cuando corresponda. Para evitar ambigüedad, el nuevo sitio priorizará generación procedural de ambiente 3D y fotos entregadas por el usuario, usando fuentes públicas únicamente como apoyo o como fondos con licencia comprobable.

| Fuente | Uso permitido en el plan | Uso no permitido |
|---|---|---|
| Dribbble | Referencia de estilo para HUD y layout | Copiar shot, descargar y redistribuir diseño o imágenes sin permiso |
| Google Images | Descubrimiento y comparación visual | Tratar resultados como libres de derechos |
| Unsplash | Paisaje publicable solo tras verificar la página/foto y licencia | Copiar URLs premium o asumir que toda miniatura es reutilizable |
| Archivos adjuntos del usuario | Fuente principal para fotos de Belentani | Generar una nueva identidad o suplir sus fotos con IA |
| Generación integrada | Texturas abstractas, símbolos, mapas, fondos no humanos | Retratos, likenesses o escenas que presenten al artista |

## Referencias seleccionadas de la búsqueda

- [Dribbble — Cyberpunk Interface search](https://dribbble.com/search/cyberpunk-interface)
- [Unsplash — Desert Night search](https://images.unsplash.com/photo-1554110397-9bac083977c6)
- [Unsplash — Sand dunes under starry night sky](https://images.unsplash.com/photo-1581610186406-5f6e9f9edbc1)
- [Awwwards — WebGL websites](https://www.awwwards.com/websites/webgl/)

## Nota de seguridad de contenido

El asset generado anteriormente en la sesión previa que representa una figura parecida a Belentani queda fuera del nuevo sistema y no se reutilizará. En la reconstrucción, las imágenes del artista se tratarán como contenido humano real proporcionado por el usuario; no se usarán generaciones para inventar retratos, poses o apariencias.

## Investigación técnica en GitHub y Three.js

El repositorio `pmndrs/postprocessing` documenta una arquitectura de `EffectComposer` con `RenderPass` y `EffectPass`, que valida separar el render de escena de los efectos de pantalla completa. Para BELENTANI se implementará una versión propia y acotada —bloom, vignette, grain, RGB shift y glitch— con configuración por escena, en vez de importar una pila innecesaria. Fuente: [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing).

Los ejemplos oficiales de Three.js confirman que la API ofrece ejemplos de cámara, geometría, instancing, particles, audio, shaders, terrain, render targets y postprocesado. La implementación tomará esos patrones como referencia de API pública y usará `InstancedMesh`, `BufferGeometry`, render targets y `ShaderMaterial` donde sean apropiados. Fuente: [Three.js Examples](https://threejs.org/examples/).

El límite práctico es intencional: no se intentará convertir el sitio en una demo técnica sin narrativa. Cada sistema 3D deberá justificar su presencia dentro de una escena, un objeto simbólico o un desbloqueo del archivo. El rendimiento tendrá prioridad sobre una lista superficial de efectos.
