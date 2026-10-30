import { useEffect, useState, useRef } from 'react';
import { X, Copy, Check, Terminal, Play, Pause, RefreshCw, Cpu } from 'lucide-react';
import { ProjectProtocol } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

interface ProjectModalProps {
  project: ProjectProtocol | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);
  const [simPlaying, setSimPlaying] = useState(true);
  const [particleDensity, setParticleDensity] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  // Mini simulation canvas inside modal
  useEffect(() => {
    if (!project || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const renderSim = () => {
      if (!simPlaying) return;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
      const height = (canvas.height = 180);

      ctx.clearRect(0, 0, width, height);

      if (project.simulationType === 'particles') {
        // Draw 3D-projected rotating particles
        ctx.fillStyle = '#00F0FF';
        for (let i = 0; i < particleDensity; i++) {
          const angle = time * 0.02 + (i * Math.PI * 2) / particleDensity;
          const radius = 45 + Math.sin(time * 0.03 + i) * 20;
          const px = width / 2 + Math.cos(angle) * radius * 1.8;
          const py = height / 2 + Math.sin(angle * 1.5) * radius * 0.75;
          const size = Math.max(1, 2 + Math.cos(angle) * 1.5);

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00F0FF' : '#A855F7';
          ctx.shadowBlur = 6;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
        }
      } else if (project.simulationType === 'audioWave') {
        // Draw holographic multi-band acoustic waveforms
        ctx.lineWidth = 1.5;
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.strokeStyle = layer === 0 ? '#00F0FF' : layer === 1 ? '#8A2BE2' : '#38BDF8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = ctx.strokeStyle;
          for (let x = 0; x < width; x += 4) {
            const freq = 0.015 * (layer + 1);
            const amp = 30 / (layer + 1);
            const y = height / 2 + Math.sin(x * freq + time * 0.05 + layer) * amp * Math.cos(x * 0.005);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (project.simulationType === 'quantumGraph') {
        // Draw entangled quantum nodes with laser links
        const nodeCount = 8;
        const nodes: { x: number; y: number }[] = [];
        for (let i = 0; i < nodeCount; i++) {
          const nx = width * 0.15 + (i % 4) * (width * 0.24) + Math.sin(time * 0.03 + i) * 12;
          const ny = height * 0.3 + Math.floor(i / 4) * (height * 0.4) + Math.cos(time * 0.03 + i) * 12;
          nodes.push({ x: nx, y: ny });
        }
        // Links
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            if ((i + j) % 3 === 0) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
        // Nodes
        nodes.forEach((n, idx) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#00F0FF' : '#C084FC';
          ctx.shadowBlur = 8;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
        });
      } else {
        // Drone perception radar sweep
        const cx = width / 2;
        const cy = height / 2;
        const r = 60;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.stroke();

        const sweepAngle = time * 0.04;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * r, cy + Math.sin(sweepAngle) * r);
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.stroke();
      }

      time++;
      animId = requestAnimationFrame(renderSim);
    };

    renderSim();

    return () => cancelAnimationFrame(animId);
  }, [project, simPlaying, particleDensity]);

  if (!project) return null;

  const handleCopyCode = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-[#09090E] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
              <span>PROTOCOL DOSSIER // {project.category.toUpperCase()}</span>
              <span>·</span>
              <span className="text-neutral-400">{project.year}</span>
            </div>
            <h2 id="modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase">
              {project.title}
            </h2>
            <p className="font-mono text-xs text-neutral-300 mt-1">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            aria-label="Close protocol dossier"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-8">
          {/* Main Visual & Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] relative bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="md:col-span-5 space-y-3 font-mono">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Telemetry Invariants
              </div>
              {project.liveStats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">{stat.label}</span>
                  <span className="text-[#00F0FF] font-semibold">{stat.value}</span>
                </div>
              ))}
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Context</span>
                <span className="text-white">{project.clientContext}</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="glass-panel p-5 rounded-xl border border-[#00F0FF]/25 bg-black/40">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <Cpu className="w-4 h-4" />
                <span className="font-semibold uppercase">Interactive Protocol Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSimPlaying(!simPlaying);
                  }}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] flex items-center gap-1 border border-white/10"
                >
                  {simPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#00F0FF]" />}
                  <span>{simPlaying ? 'Freeze' : 'Execute'}</span>
                </button>
              </div>
            </div>

            <div className="w-full h-[180px] rounded-lg bg-black/60 border border-white/5 overflow-hidden relative">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Parametric Flux: Dynamic Render Loop</span>
              <div className="flex items-center gap-2">
                <span>Density</span>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={particleDensity}
                  onChange={(e) => setParticleDensity(Number(e.target.value))}
                  className="w-24 accent-[#00F0FF]"
                />
              </div>
            </div>
          </div>

          {/* Architecture Blueprint */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <span>Architectural Blueprint</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed font-sans">
              {project.architectureBlueprint.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#00F0FF] font-mono text-xs mt-0.5">[{i + 1}]</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Spec & Shader Source */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Core Algorithm Kernel</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Source'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#030305] border border-white/10 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white text-[10px]">ESC</kbd>
            <span>to close protocol</span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-semibold hover:bg-[#63F7FF] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
