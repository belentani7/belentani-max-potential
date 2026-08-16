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

  private starField?: THREE.Points;
  private centralCore?: THREE.Mesh;
  private liquidShaderMaterial?: THREE.ShaderMaterial;
  private secondaryGroup: THREE.Group = new THREE.Group();

  constructor(options: RuntimeOptions) {
    this.container = options.container;
    this.quality = options.quality || 'balanced';
    this.reducedMotion = options.reducedMotion || false;
    this.onSceneChange = options.onSceneChange;
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050607, 0.0025);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 3000);
    this.camera.position.set(0, 0, 90);

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
    // Starfield particles
    const count = this.quality === 'cinematic' ? 8000 : 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1500;
      positions[i + 1] = (Math.random() - 0.5) * 1500;
      positions[i + 2] = (Math.random() - 0.5) * 1500;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x54D8E7,
      size: 1.6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.starField = new THREE.Points(geometry, material);
    this.scene.add(this.starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x101416, 1.5);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xF03A32, 3.0);
    dirLight.position.set(60, 90, 60);
    this.scene.add(dirLight);

    const cyanLight = new THREE.DirectionalLight(0x54D8E7, 2.0);
    cyanLight.position.set(-60, -40, -40);
    this.scene.add(cyanLight);

    // Central Core (Liquid Red Shader Sphere)
    const coreGeo = new THREE.SphereGeometry(20, 64, 64);
    this.liquidShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.4 },
        uRed: { value: new THREE.Color('#9E0018') },
        uDark: { value: new THREE.Color('#050607') },
        uEmission: { value: new THREE.Color('#F03A32') }
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uIntensity;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        
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
          vec3 p = position;
          float n = noise(p * 0.12 + uTime * 0.15);
          p += normal * n * 2.2 * uIntensity;
          vec4 world = modelMatrix * vec4(p, 1.0);
          vWorldPosition = world.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uRed;
        uniform vec3 uDark;
        uniform vec3 uEmission;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);
          float pulse = 0.85 + sin(uTime * 2.5) * 0.15;
          vec3 color = mix(uDark, uRed, fresnel) + uEmission * fresnel * pulse * 1.8;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    this.centralCore = new THREE.Mesh(coreGeo, this.liquidShaderMaterial);
    this.centralCore.position.set(0, 0, -25);
    this.scene.add(this.centralCore);

    // Orbiting rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(30 + i * 12, 0.3, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xF03A32 : 0x54D8E7,
        roughness: 0.2,
        metalness: 0.8,
        emissive: i % 2 === 0 ? 0x500005 : 0x003040
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + i * 0.4;
      ring.rotation.y = i * 0.8;
      this.secondaryGroup.add(ring);
    }
    this.scene.add(this.secondaryGroup);
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

    (this as any)._cleanupEvents = () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }

  private animate = () => {
    if (this.isDisposed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    if (this.liquidShaderMaterial) {
      this.liquidShaderMaterial.uniforms.uTime.value = elapsedTime;
    }

    if (this.starField) {
      this.starField.rotation.y = elapsedTime * 0.02;
    }

    if (this.centralCore) {
      this.centralCore.rotation.y = elapsedTime * 0.06;
    }

    if (this.secondaryGroup) {
      this.secondaryGroup.rotation.z = elapsedTime * 0.04;
      this.secondaryGroup.rotation.x = elapsedTime * 0.03;
    }

    if (!this.reducedMotion) {
      this.mouse.targetX = this.mouse.x * 15;
      this.mouse.targetY = this.mouse.y * 15;
      this.camera.position.x += (this.mouse.targetX - this.camera.position.x) * 0.06;
      this.camera.position.y += (this.mouse.targetY - this.camera.position.y) * 0.06;
      this.camera.lookAt(0, 0, -25);
    }

    this.renderer.render(this.scene, this.camera);
  };

  public setScene(sceneId: SceneId) {
    this.currentScene = sceneId;
    if (this.onSceneChange) this.onSceneChange(sceneId);

    const targetZ = sceneId === 'boot' ? 90 : sceneId === 'orbit' ? 45 : sceneId === 'planet' ? 30 : 60;
    const targetY = sceneId === 'city' ? 12 : 0;

    if (!this.reducedMotion) {
      const startZ = this.camera.position.z;
      const startTime = performance.now();
      const duration = 1200;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

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
