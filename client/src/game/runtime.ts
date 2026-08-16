import * as THREE from 'three';

export type SceneId = 'boot' | 'orbit' | 'city' | 'desert' | 'planet' | 'archive' | 'protocol';

export type QualityTier = 'cinematic' | 'balanced' | 'low-power';

export interface RuntimeOptions {
  container: HTMLDivElement;
  quality?: QualityTier;
  reducedMotion?: boolean;
  onSceneChange?: (scene: SceneId) => void;
  onProgress?: (progress: number) => void;
}

export class ExperienceRuntime {
  private container: HTMLDivElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private quality: QualityTier;
  private reducedMotion: boolean;
  private currentScene: SceneId = 'boot';
  private animationFrameId: number = 0;
  private isDisposed: boolean = false;
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private onSceneChange?: (scene: SceneId) => void;
  private onProgress?: (progress: number) => void;

  // Scene elements
  private starField?: THREE.Points;
  private redPlanet?: THREE.Mesh;
  private relicsGroup: THREE.Group = new THREE.Group();
  private liquidShaderMaterial?: THREE.ShaderMaterial;

  constructor(options: RuntimeOptions) {
    this.container = options.container;
    this.quality = options.quality || 'balanced';
    this.reducedMotion = options.reducedMotion || false;
    this.onSceneChange = options.onSceneChange;
    this.onProgress = options.onProgress;
    this.clock = new THREE.Clock();

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050607, 0.003);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 2000);
    this.camera.position.set(0, 0, 80);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.quality === 'cinematic',
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality === 'cinematic' ? 2 : 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    this.initWorld();
    this.initEvents();
    this.animate();
  }

  private initWorld() {
    // Starfield / Particle dust
    const count = this.quality === 'cinematic' ? 6000 : this.quality === 'balanced' ? 3000 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1200;
      positions[i + 1] = (Math.random() - 0.5) * 1200;
      positions[i + 2] = (Math.random() - 0.5) * 1200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x54D8E7,
      size: 1.8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.starField = new THREE.Points(geometry, material);
    this.scene.add(this.starField);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x101416, 1.2);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xF03A32, 2.5);
    dirLight.position.set(50, 80, 50);
    this.scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x54D8E7, 1.5);
    rimLight.position.set(-50, -30, -30);
    this.scene.add(rimLight);

    // Liquid Red Planet / Relic center
    const planetGeo = new THREE.SphereGeometry(18, 64, 64);
    this.liquidShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.2 },
        uRed: { value: new THREE.Color('#8A0012') },
        uDarkRed: { value: new THREE.Color('#050607') },
        uEmission: { value: new THREE.Color('#F03A32') }
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uIntensity;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        // Simple noise
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + .1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                         mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                         mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        void main() {
          vUv = uv;
          vec3 p = position;
          float n = noise(p * 0.15 + uTime * 0.1);
          p += normal * n * 1.5 * uIntensity;
          vec4 world = modelMatrix * vec4(p, 1.0);
          vWorldPosition = world.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uRed;
        uniform vec3 uDarkRed;
        uniform vec3 uEmission;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);
          float pulse = 0.8 + sin(uTime * 2.0) * 0.2;
          vec3 color = mix(uDarkRed, uRed, fresnel) + uEmission * fresnel * pulse * 1.5;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    this.redPlanet = new THREE.Mesh(planetGeo, this.liquidShaderMaterial);
    this.redPlanet.position.set(0, 0, -20);
    this.scene.add(this.redPlanet);
  }

  private initEvents() {
    const handleResize = () => {
      if (!this.container || this.isDisposed) return;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (this.reducedMotion || this.isDisposed) return;
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup reference stored internally
    (this as any)._cleanupEvents = () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }

  private animate = () => {
    if (this.isDisposed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Uniform update for shaders
    if (this.liquidShaderMaterial) {
      this.liquidShaderMaterial.uniforms.uTime.value = elapsedTime;
    }

    // Starfield rotation
    if (this.starField) {
      this.starField.rotation.y = elapsedTime * 0.03;
    }

    // Planet rotation
    if (this.redPlanet) {
      this.redPlanet.rotation.y = elapsedTime * 0.08;
    }

    // Camera look target
    if (!this.reducedMotion) {
      this.mouse.targetX = this.mouse.x * 12;
      this.mouse.targetY = this.mouse.y * 12;
      this.camera.position.x += (this.mouse.targetX - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.mouse.targetY - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, -20);
    }

    this.renderer.render(this.scene, this.camera);
  };

  public setScene(sceneId: SceneId) {
    this.currentScene = sceneId;
    if (this.onSceneChange) this.onSceneChange(sceneId);

    // Smooth camera target per scene
    const targetZ = sceneId === 'boot' ? 80 : sceneId === 'orbit' ? 40 : sceneId === 'planet' ? 25 : 55;
    const targetY = sceneId === 'city' ? 10 : 0;

    if (!this.reducedMotion) {
      // Animate camera distance smoothly
      let startZ = this.camera.position.z;
      let startTime = performance.now();
      const duration = 1200;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        this.camera.position.z = startZ + (targetZ - startZ) * ease;
        this.camera.position.y = targetY * ease;

        if (progress < 1 && !this.isDisposed) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }

  public dispose() {
    this.isDisposed = true;
    cancelAnimationFrame(this.animationFrameId);
    if ((this as any)._cleanupEvents) {
      (this as any)._cleanupEvents();
    }
    this.renderer.dispose();
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
