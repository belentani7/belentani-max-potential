# AUDITORÍA DE CÓDIGO FUENTE: ESTÁNDAR 10/10

Este documento audita cada módulo del proyecto para eliminar cualquier rastro de código superficial, placeholders sin tipado, o simulación visual sin lógica robusta.

## 1. Módulos bajo Revisión
- `client/src/game/runtime.ts` — Motor Three.js, shaders, render loop y gestión de memoria.
- `client/src/components/HudOverlay.tsx` — Interfaz diegética, navegación y telemetría.
- `client/src/components/EvidenceWindow.tsx` — Archivo documental y terminal de puzzle.
- `client/src/game/lore.ts` — Tipado estricto de datos de lore y metadatos del artista.

## 2. Criterios de Excelencia (10/10)
1. **Tipado Estricto:** Cero uso de `any`, interfaces completas para props y estados.
2. **Gestión de Recursos WebGL:** Limpieza explícita de geometrías, materiales, texturas y listeners de ventana al desmontar componentes (`useEffect` cleanup).
3. **Manejo de Errores:** Resiliencia ante contextos WebGL no soportados o fallos de red en streaming de audio.
4. **Accesibilidad y Atributos ARIA:** Elementos interactivos con etiquetas semánticas y soporte de teclado (`ESC` para cerrar modales).
