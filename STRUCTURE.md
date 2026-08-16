# BELENTANI — JUDAS EXPERIENCE

## Runtime boundary

React funciona como marco de aplicación y sistema de accesibilidad. Three.js controla el lienzo, la escena, la cámara, la luz y los materiales. La UI no muta objetos 3D directamente: emite acciones tipadas al `ExperienceRuntime`, que actualiza el director y devuelve eventos de escena.

## Proposed file tree

```text
client/src/
  App.tsx
  index.css
  pages/
    Home.tsx
  components/
    ImmersiveExperience.tsx
    ExperienceCanvas.tsx
    BootSequence.tsx
    HudOverlay.tsx
    SceneNavigator.tsx
    EvidenceWindow.tsx
    AudioDock.tsx
    ProtocolTerminal.tsx
    ReducedMotionNotice.tsx
  game/
    runtime.ts
    types.ts
    sceneDirector.ts
    inputRouter.ts
    qualityManager.ts
    audioField.ts
    postFxStack.ts
    puzzleState.ts
    assetRegistry.ts
    scenes/
      createBootScene.ts
      createOrbitScene.ts
      createCityScene.ts
      createDesertScene.ts
      createPlanetScene.ts
      createArchiveScene.ts
      createProtocolScene.ts
    materials/
      liquidRedMaterial.ts
      hologramMaterial.ts
      dustMaterial.ts
      glassBloodMaterial.ts
    systems/
      particleField.ts
      neuronField.ts
      lightingManager.ts
      relicSystem.ts
      atmosphereSystem.ts
      sandSystem.ts
  content/
    narrative.ts
    archive.ts
    provenance.ts
```

## Runtime modules

| Module | Responsibility | React coupling |
|---|---|---|
| `ExperienceRuntime` | Owns renderer, scene, camera, clock and loop | None |
| `SceneDirector` | Registers scenes, transitions and camera targets | None |
| `InputRouter` | Pointer, touch, keyboard, scroll and reduced-motion signals | None |
| `QualityManager` | Detects pixel ratio, viewport and low-power preferences | None |
| `AudioField` | Handles user gesture, analyser, playback state and visual energy | None |
| `PostFxStack` | Owns render target and configurable passes | None |
| `PuzzleState` | Persists discovered clues and accepted answer locally | None |
| `HudOverlay` | Presents state and accessible controls | React via events |

## State model

```ts
type SceneId = 'boot' | 'orbit' | 'city' | 'desert' | 'planet' | 'archive' | 'protocol';

type ExperienceState = {
  scene: SceneId;
  progress: number;
  selectedRelic: string | null;
  discoveredClues: string[];
  openedEvidence: string[];
  protocolUnlocked: boolean;
  audio: { playing: boolean; sourceReady: boolean; intensity: number };
  quality: 'cinematic' | 'balanced' | 'low-power';
  reducedMotion: boolean;
};
```

## Scene contract

Cada escena expone `mount`, `enter`, `update`, `render`, `exit` y `dispose`. `mount` crea geometría y materiales una sola vez; `enter` anima cámara y exposición; `update` consume el tiempo y los inputs; `exit` devuelve al director; `dispose` libera geometrías, materiales y texturas.

## Render pipeline

El pipeline mínimo es `Scene → Camera → RenderTarget → Composite Shader → Canvas`. El compositor dibuja textura de escena con exposición, vignette y grain; si el tier es `cinematic` añade bloom y un desplazamiento RGB de baja intensidad en transiciones. La escena mantiene antialiasing del renderer solo cuando no se usa render target, para evitar doble coste.

## Asset policy

Large assets never live in the project tree. User-supplied photos will be copied to `/home/ubuntu/webdev-static-assets/`, uploaded with the WebDev asset workflow, and referenced by returned lifecycle URLs. Procedural geometry and small SVG symbols remain in source code. Generated images are limited to non-human environment textures, UI motifs and abstract maps.

## Accessibility contract

The route contains a semantic HTML layer above the canvas. Every scene has a visible title, an explanation of the current objective, a keyboard escape route, focusable controls, and an alternate text narrative for the key clue. A canvas failure shows the same content as an ordered archive view. `prefers-reduced-motion` selects `low-power`, freezes camera travel and replaces pointer gestures with buttons.

## Performance contract

The renderer caps device pixel ratio. Systems use object pools and preallocated arrays. Particles are instanced or point-based. Scene systems are paused when off-state. No animation handler creates new `Vector3`, `Color`, arrays or geometries per frame. The loop records frame time every 60 frames and allows quality downgrade after sustained slow frames.
