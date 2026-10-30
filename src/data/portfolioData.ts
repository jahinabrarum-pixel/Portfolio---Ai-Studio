/**
 * Portfolio Data Registry
 * Contains project protocols, skill matrix, timeline trajectories, and telemetry.
 */

export interface ProjectProtocol {
  id: string;
  title: string;
  subtitle: string;
  category: 'Spatial & 3D' | 'Generative AI' | 'Robotics & Vision' | 'Quantum Systems';
  year: string;
  role: string;
  clientContext: string;
  image: string;
  metrics: string[];
  summary: string;
  architectureBlueprint: string[];
  techStack: string[];
  codeSnippet: string;
  liveStats: { label: string; value: string }[];
  simulationType: 'particles' | 'audioWave' | 'quantumGraph' | 'dronePerception';
}

export interface SkillNode {
  name: string;
  category: 'Spatial & 3D' | 'Generative AI' | 'Systems Architecture' | 'Creative Engineering';
  proficiency: number; // 0 - 100
  experienceYears: number;
  description: string;
  subtechnologies: string[];
}

export interface TimelineMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  hero: {
    name: 'Kairen Vex',
    roleTag: 'Creative Technologist // Spatial Systems Architect',
    leadTitle: 'Architecting Synthetic Worlds & Neural Interfaces',
    leadDescription:
      'Operating at the confluence of generative intelligence, spatial computing, and mathematical beauty. Crafting next-generation perceptual computing interfaces, real-time shaders, and autonomous multi-agent environments.',
    avatarImage: '/src/assets/images/hero_spatial_avatar_1793374984037.jpg',
    availabilityStatus: 'Available for interstellar projects',
    metrics: [
      { label: 'Creative Engineering', value: '8+ Yrs' },
      { label: 'Spatial Protocols Deployed', value: '24' },
      { label: 'Generative Models Engineered', value: '14' },
      { label: 'Interstellar Audience Reach', value: '12M+' },
    ],
  },

  projects: [
    {
      id: 'neural-latent-canvas',
      title: 'Neural Latent Canvas',
      subtitle: 'Real-time 3D Latent Space Dimensionality Engine',
      category: 'Generative AI',
      year: '2026',
      role: 'Principal Creative Technologist',
      clientContext: 'Generative Lab / Frontier Research',
      image: '/src/assets/images/project_neural_canvas_1793374984439.jpg',
      metrics: ['2.4M Particle Compute Budget', '60 FPS WebGPU Shader Execution', '34ms Latent Interpolation'],
      summary:
        'A high-performance WebGPU spatial visualizer mapping high-dimensional multimodal embedding vectors into navigable 3D geometric clusters with real-time acoustic feedback.',
      architectureBlueprint: [
        'WebGPU Compute Pipeline for parallel t-SNE / UMAP dimensional projection in GPU memory.',
        'Dynamic spatial octree spatial indexing handling 2M+ particles with zero memory allocation churn.',
        'Adaptive level-of-detail (LOD) tessellation responding dynamically to camera focal distances.',
        'Procedural audio oscillator synthesis translating latent distance vectors into microtonal frequencies.',
      ],
      techStack: ['WebGPU', 'GLSL / WGSL', 'PyTorch', 'TypeScript', 'WebAudio API', 'Three.js'],
      codeSnippet: `@compute @workgroup_size(64, 1, 1)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    let index = id.x;
    if (index >= params.particle_count) { return; }
    var pos = positions[index];
    var vel = velocities[index];
    let dist = length(pos - target_vector);
    let force = normalize(target_vector - pos) * (params.gravity / (dist * dist + 0.01));
    vel = vel * 0.96 + force * params.delta_time;
    positions[index] = pos + vel * params.delta_time;
}`,
      liveStats: [
        { label: 'Compute Engine', value: 'WebGPU Pipeline' },
        { label: 'Cluster Density', value: '98.4% Coherent' },
        { label: 'Shader Latency', value: '1.8 ms' },
      ],
      simulationType: 'particles',
    },
    {
      id: 'echosphere-spatial-audio',
      title: 'EchoSphere Spatial Audio',
      subtitle: 'Holographic Acoustic Field & Waveform Synthesizer',
      category: 'Spatial & 3D',
      year: '2025',
      role: 'Lead Audio Technologist',
      clientContext: 'Avant-Garde Sonic Foundation',
      image: '/src/assets/images/project_spatial_audio_1793374984993.jpg',
      metrics: ['64 Concurrent Acoustic Emitters', '3D HRTF Convolution Filter', '< 5ms Audio-Visual Sync'],
      summary:
        'A spatial audio synthesizer and holographic visualizer capable of modeling multi-room acoustic reflectance, Doppler pitch shifts, and volumetric frequency rings in browser space.',
      architectureBlueprint: [
        'Custom WebAudio PannerNode mesh with 3D Head-Related Transfer Function (HRTF) mapping.',
        'FFT (Fast Fourier Transform) frequency analyzer driving real-time vertex displacement shaders.',
        'Ray-traced early acoustic reflections calculated across virtual boundary geometries.',
        'Holographic volumetric ring rendering with customizable harmonic resonance spectrums.',
      ],
      techStack: ['WebAudio API', 'Three.js', 'Custom DSP Shaders', 'WebSockets', 'React'],
      codeSnippet: `const panner = audioCtx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 1.2;
panner.coneInnerAngle = 60;
panner.positionX.setValueAtTime(emitterPos.x, audioCtx.currentTime);`,
      liveStats: [
        { label: 'Acoustic Channels', value: '64 Emitters' },
        { label: 'Reverb Decay (RT60)', value: '1.82 s' },
        { label: 'Sample Rate', value: '96 kHz / 24-bit' },
      ],
      simulationType: 'audioWave',
    },
    {
      id: 'quantum-state-protocol',
      title: 'Quantum State Protocol',
      subtitle: 'Multi-Partite Qubit Entanglement Visualizer',
      category: 'Quantum Systems',
      year: '2025',
      role: 'Mathematical Visualization Engineer',
      clientContext: 'Quantum Frontiers Initiative',
      image: '/src/assets/images/project_quantum_sim_1793374985424.jpg',
      metrics: ['16 Qubit State Hilbert Space', '65,536 Amplitude Visualizer', 'Tensor Contraction Graph'],
      summary:
        'An interactive simulation environment visualizing state vectors, Bloch spheres, and entangled bipartite graphs with interactive quantum gate circuit mutations.',
      architectureBlueprint: [
        'Linear algebra state vector mathematical engine executing Hadamard, CNOT, and Phase shifts.',
        'Dynamic 3D force-directed network rendering qubit entanglement correlations as laser light filaments.',
        'Probability density amplitude projection with real-time quantum measurement collapse animation.',
        'Exportable quantum circuit protocol compatible with OpenQASM 3.0 specification.',
      ],
      techStack: ['TypeScript Math Engine', 'WebGL', 'OpenQASM 3.0', 'D3 Graph Physics', 'Tailwind CSS'],
      codeSnippet: `function applyHadamard(state: ComplexVector, qubit: number): ComplexVector {
  const normFactor = 1 / Math.SQRT2;
  const newState = new ComplexVector(state.dimension);
  for (let i = 0; i < state.dimension; i++) {
    const bit = (i >> qubit) & 1;
    const partner = i ^ (1 << qubit);
    newState.real[i] = normFactor * (state.real[i] + (bit === 1 ? -state.real[partner] : state.real[partner]));
  }
  return newState;
}`,
      liveStats: [
        { label: 'Qubit Register', value: '16 Qubits' },
        { label: 'State Fidelity', value: '99.98%' },
        { label: 'Entanglement Density', value: '87.4%' },
      ],
      simulationType: 'quantumGraph',
    },
    {
      id: 'autonomous-vectra',
      title: 'Autonomous Vectra',
      subtitle: 'Neural Guidance & Vision Avionics Suite',
      category: 'Robotics & Vision',
      year: '2024',
      role: 'Robotics Perception Architect',
      clientContext: 'Vectra Autonomous Dynamics',
      image: '/src/assets/images/project_autonomous_drone_1793374985696.jpg',
      metrics: ['200Hz Inertial Odometry', '360° LiDAR Depth Mesh', '0.04s Reaction Horizon'],
      summary:
        'Avionics telemetry dashboard and simulation digital twin for an autonomous reconnaissance drone featuring real-time SLAM point clouds and neural obstacle avoidance.',
      architectureBlueprint: [
        'Real-time WebSocket telemetry pipeline transmitting 200Hz IMU and LiDAR point clouds.',
        'Dual-stream computer vision overlay annotating identified path vectors and velocity cones.',
        'Digital twin HUD with virtual gimbal horizon, battery thermodynamics, and flight protocol states.',
        'Safety kill-switch and waypoint mission planner with 3D airspace geofencing.',
      ],
      techStack: ['Rust Telemetry Agent', 'WebSockets', 'Three.js', 'React', 'Canvas 2D HUD'],
      codeSnippet: `pub struct FlightTelemetry {
    pub timestamp_us: u64,
    pub orientation_quat: [f32; 4],
    pub linear_velocity: [f32; 3],
    pub lidar_distances: Vec<f32>,
    pub battery_millivolts: u16,
    pub autopilot_state: AutopilotMode,
}`,
      liveStats: [
        { label: 'Sensor Refresh', value: '200 Hz' },
        { label: 'Latency Horizon', value: '4.2 ms' },
        { label: 'Path Clearance', value: '100% Verified' },
      ],
      simulationType: 'dronePerception',
    },
  ] as ProjectProtocol[],

  skills: [
    {
      name: 'WebGL & WebGPU Architecture',
      category: 'Spatial & 3D',
      proficiency: 96,
      experienceYears: 7,
      description: 'Custom compute and fragment shaders, post-processing pipelines, instanced geometry, and Three.js scenes.',
      subtechnologies: ['WebGPU', 'WGSL', 'GLSL', 'Three.js', 'Post-Processing'],
    },
    {
      name: 'Generative Models & Latent Spaces',
      category: 'Generative AI',
      proficiency: 92,
      experienceYears: 5,
      description: 'Diffusion pipelines, embeddings, prompt engineering, multi-agent frameworks, and vector similarity clustering.',
      subtechnologies: ['PyTorch', 'Transformers', 'Gemini SDK', 'Vector DBs', 'Diffusion'],
    },
    {
      name: 'Spatial Audio & Audio DSP',
      category: 'Spatial & 3D',
      proficiency: 88,
      experienceYears: 6,
      description: 'Web Audio API synthesizers, binaural HRTF convolution, FFT frequency analysis, and procedural sound.',
      subtechnologies: ['WebAudio API', 'HRTF Spatializer', 'FFT Analyzers', 'Oscillators'],
    },
    {
      name: 'High-Concurrency Systems & TypeScript',
      category: 'Systems Architecture',
      proficiency: 95,
      experienceYears: 8,
      description: 'Full-stack React architectures, Node.js microservices, distributed WebSockets, and state machines.',
      subtechnologies: ['TypeScript', 'Node.js', 'WebSockets', 'Express', 'React 19'],
    },
    {
      name: 'Rust & Native Telemetry',
      category: 'Systems Architecture',
      proficiency: 84,
      experienceYears: 4,
      description: 'Low-latency event processing, WASM compilation for web targets, and zero-allocation memory buffers.',
      subtechnologies: ['Rust', 'WebAssembly (WASM)', 'Tokio', 'Memory Management'],
    },
    {
      name: 'Algorithmic Aesthetics & Creative Code',
      category: 'Creative Engineering',
      proficiency: 94,
      experienceYears: 8,
      description: 'Computational geometry, particle physics, cellular automata, fractal branching, and generative typography.',
      subtechnologies: ['Simplex Noise', 'Voronoi', 'Verlet Physics', 'Dynamic L-Systems'],
    },
  ] as SkillNode[],

  timeline: [
    {
      period: '2024 — Present',
      role: 'Principal Creative Technologist',
      organization: 'Synthetix Spatial & AI Research Lab',
      location: 'San Francisco, CA / Hybrid',
      summary:
        'Leading research and development of real-time spatial interfaces and multimodal neural perception tools for enterprise and artistic installations.',
      highlights: [
        'Architected WebGPU generative canvas utilized by 45,000+ creators worldwide.',
        'Filed 2 patents in real-time multidimensional latent projection.',
        'Designed interactive stage visuals for international electronic music festivals.',
      ],
      technologies: ['WebGPU', 'TypeScript', 'PyTorch', 'GLSL', 'WebSockets'],
    },
    {
      role: 'Lead Interactive Systems Engineer',
      period: '2022 — 2024',
      organization: 'Autonomous Dynamics Studio',
      location: 'Tokyo & Remote',
      summary:
        'Engineered telemetry digital twins, computer vision monitoring HUDs, and robotic fleet management interfaces.',
      highlights: [
        'Developed 60 FPS WebGL 3D point cloud streaming visualizer for autonomous rovers.',
        'Reduced mission telemetry latency from 45ms to 8ms with binary WebSockets.',
        'Mentored a cohort of 12 creative technologists and visual engineers.',
      ],
      technologies: ['WebGL', 'Rust', 'React', 'Three.js', 'Tailwind CSS'],
    },
    {
      role: 'Creative Coding & Audio Fellow',
      period: '2020 — 2022',
      organization: 'Center for Perceptual Computing',
      location: 'Berlin, Germany',
      summary:
        'Researched spatialized audio convolution, tactile haptics, and generative acoustic ecosystems.',
      highlights: [
        'Created open-source procedural audio synthesis toolkit with over 4,000 GitHub stars.',
        'Commissioned for museum exhibition on algorithmic acoustics at ZKM Karlsruhe.',
      ],
      technologies: ['WebAudio API', 'TouchDesigner', 'GLSL', 'DSP', 'C++'],
    },
    {
      role: 'Frontend Architect & UI Technologist',
      period: '2018 — 2020',
      organization: 'Vanguard Cybernetics',
      location: 'New York, NY',
      summary:
        'Built bleeding-edge client experiences and interactive 3D product showcases for Fortune 50 technology clients.',
      highlights: [
        'Delivered 18 interactive web applications recognized with Awwwards and FWA of the Day.',
        'Pioneered early WebGL micro-interaction frameworks.',
      ],
      technologies: ['TypeScript', 'Three.js', 'CSS Shaders', 'SVG Physics'],
    },
  ] as TimelineMilestone[],
};
