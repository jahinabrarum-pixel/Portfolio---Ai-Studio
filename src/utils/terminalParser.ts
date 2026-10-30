/**
 * Terminal Command Parser
 * Pure logic module for executing commands in the interactive portfolio terminal.
 */

export interface CommandResponse {
  type: 'output' | 'error' | 'clear' | 'info';
  content: string[];
}

export interface TerminalContext {
  availableProjects: string[];
  skillsCount: number;
}

export function parseCommand(rawInput: string, context?: TerminalContext): CommandResponse {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { type: 'output', content: [] };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return {
        type: 'info',
        content: [
          'AVAILABLE PROTOCOLS & COMMANDS:',
          '  help               - List all available terminal directives',
          '  about              - Display creative technologist bio & philosophy',
          '  skills             - Inspect technical stack and proficiency matrix',
          '  projects           - Query index of engineered protocols & works',
          '  project <name>     - Query details on a specific project',
          '  contact            - Retrieve direct secure transmission coordinates',
          '  stats              - Display telemetry, compute nodes & system health',
          '  echo <message>     - Print message to terminal buffer',
          '  clear              - Purge terminal buffer screen',
        ],
      };

    case 'about':
      return {
        type: 'output',
        content: [
          'IDENTITY: Kairen Vex',
          'DESIGNATION: Creative Technologist & Spatial Systems Architect',
          'LOCATION: San Francisco / Tokyo / Orbit (Remote)',
          'PHILOSOPHY: Blending mathematical rigor with avant-garde aesthetics.',
          'Specializing in generative machine learning, real-time spatial computing,',
          'and cybernetic user interfaces designed for the next era of human cognition.',
        ],
      };

    case 'skills':
      return {
        type: 'output',
        content: [
          'TECHNICAL STACK MATRIX:',
          '  [SPATIAL / 3D]       Three.js · WebGL · WebGPU · GLSL Shaders · Spatial Audio',
          '  [GENERATIVE AI]      PyTorch · Latent Diffusion · LLM Agents · Neural Radiance',
          '  [SYSTEMS & ARCH]     TypeScript · Rust · Node.js · Distributed Systems · WebSockets',
          '  [CREATIVE CODE]      TouchDesigner · Processing · OpenFrameworks · Math Modeling',
          `TOTAL CATALOGUED NODES: ${context?.skillsCount ?? 28} modules verified.`,
        ],
      };

    case 'projects':
      const projectList = context?.availableProjects && context.availableProjects.length > 0
        ? context.availableProjects.map((p, idx) => `  [0${idx + 1}] ${p}`)
        : [
            '  [01] Neural Latent Canvas - Generative 3D Latent Space Explorer',
            '  [02] EchoSphere Spatial Audio - Holographic Acoustic Field Synthesizer',
            '  [03] Quantum State Protocol - Distributed Multi-Partite Quantum Engine',
            '  [04] Autonomous Vectra - Neural Guidance Robotics Chassis',
          ];
      return {
        type: 'output',
        content: [
          'INDEX OF ACTIVE PROTOCOLS:',
          ...projectList,
          'Type "project <name>" or click "View Protocol" in the Works section for full dossiers.',
        ],
      };

    case 'project': {
      if (!args.length) {
        return {
          type: 'error',
          content: ['ERROR: Missing project query parameter. Example: "project neural" or "project quantum"'],
        };
      }
      const query = args.join(' ').toLowerCase();
      if (query.includes('neural') || query.includes('canvas')) {
        return {
          type: 'output',
          content: [
            'PROTOCOL: NEURAL LATENT CANVAS',
            'YEAR: 2026 | DOMAIN: Generative AI & Spatial Latent Spaces',
            'SPECS: WebGPU real-time latent point cloud visualizer rendering 2M+ particles at 60 FPS.',
          ],
        };
      }
      if (query.includes('echo') || query.includes('audio') || query.includes('sphere')) {
        return {
          type: 'output',
          content: [
            'PROTOCOL: ECHOSPHERE SPATIAL AUDIO',
            'YEAR: 2025 | DOMAIN: Spatial Acoustics & Holographic Audio',
            'SPECS: HRTF binaural acoustic engine with real-time room impulse response convolution.',
          ],
        };
      }
      if (query.includes('quantum')) {
        return {
          type: 'output',
          content: [
            'PROTOCOL: QUANTUM STATE PROTOCOL',
            'YEAR: 2025 | DOMAIN: Quantum State Engine & Entanglement Graph',
            'SPECS: Real-time multi-qubit state space visualizer with tensor contraction benchmarking.',
          ],
        };
      }
      if (query.includes('vectra') || query.includes('drone') || query.includes('auto')) {
        return {
          type: 'output',
          content: [
            'PROTOCOL: AUTONOMOUS VECTRA',
            'YEAR: 2024 | DOMAIN: Autonomous Robotics & Computer Vision',
            'SPECS: Carbon fiber hexacopter avionics suite with obstacle perception neural pipeline.',
          ],
        };
      }
      return {
        type: 'error',
        content: [`ERROR: No protocol matching "${query}" found. Type "projects" to view active registry.`],
      };
    }

    case 'contact':
      return {
        type: 'info',
        content: [
          'TRANSMISSION ENDPOINTS:',
          '  SIGNAL / EMAIL:    kairen.vex@interstellar.dev',
          '  CODE REPOSITORY:   github.com/kairen-vex',
          '  NETWORK:           x.com/kairen_technologist',
          '  PUBLIC KEY ID:     0x7F4B92AE_SECURE',
          'Status: Open for select advisory roles, spatial installations, and research initiatives.',
        ],
      };

    case 'stats':
      return {
        type: 'output',
        content: [
          'SYSTEM METRICS & TELEMETRY:',
          '  CORE FREQUENCY:    60 FPS Continuous',
          '  LATENCY:           4.2ms WebGL / Audio Loop',
          '  MEMORY FOOTPRINT:  Clean / Optimized / 0-Leak',
          '  COMPUTE NODES:     All subsystems operational',
          '  SECURITY LEVEL:    DEFCON 5 // Clear for visitor transmission',
        ],
      };

    case 'echo':
      return {
        type: 'output',
        content: [args.join(' ')],
      };

    case 'clear':
      return {
        type: 'clear',
        content: [],
      };

    default:
      return {
        type: 'error',
        content: [
          `COMMAND UNRECOGNIZED: "${command}"`,
          'Type "help" to view all available directives.',
        ],
      };
  }
}
