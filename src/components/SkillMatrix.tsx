import { useState, useRef, useEffect } from 'react';
import { Sliders, Cpu, Activity, Sparkles, Orbit } from 'lucide-react';
import { PORTFOLIO_DATA, SkillNode } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

export function SkillMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantumFlux, setQuantumFlux] = useState<number>(65);
  const [harmonicResonance, setHarmonicResonance] = useState<number>(4);
  const [rotationSpeed, setRotationSpeed] = useState<number>(50);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const categories = ['all', 'Spatial & 3D', 'Generative AI', 'Systems Architecture', 'Creative Engineering'];

  const filteredSkills =
    selectedCategory === 'all'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((s) => s.category === selectedCategory);

  // Live algorithmic shader / geometric visualizer driven by sliders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
      const height = (canvas.height = 260);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = 70;
      const points = 180;

      // Draw multi-layered holographic geometric ring
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const layerColor =
          layer === 0
            ? 'rgba(0, 240, 255, 0.7)'
            : layer === 1
            ? 'rgba(168, 85, 247, 0.6)'
            : 'rgba(56, 189, 248, 0.4)';

        ctx.strokeStyle = layerColor;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = layerColor;

        for (let i = 0; i <= points; i++) {
          const theta = (i / points) * Math.PI * 2;
          const harmonic = Math.sin(theta * harmonicResonance + angle + layer * 1.5);
          const fluxMod = Math.cos(theta * 2 - angle * 0.5) * (quantumFlux / 100);
          const r = baseRadius + layer * 18 + (harmonic * 16 + fluxMod * 22);

          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Center core point
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00F0FF';
      ctx.fill();

      angle += (rotationSpeed / 1000) * 0.8;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [quantumFlux, harmonicResonance, rotationSpeed]);

  return (
    <section id="matrix" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5" />
            <span>Capability Index</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Skill Matrix & Philosophy
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'all' ? 'All Matrices' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Interactive Grid on Left/Top, Interactive Shader Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left: Skills Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel rounded-xl p-5 border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-[#00F0FF]">{skill.category}</span>
                  <span className="tabular-nums">{skill.experienceYears} Yrs Exp</span>
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2 uppercase tracking-wide">
                  {skill.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              <div>
                {/* Holographic Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400 text-[11px]">Fluency Vector</span>
                    <span className="text-[#00F0FF] font-semibold tabular-nums text-xs">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#A855F7] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>

                {/* Subtechnology Tags */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                  {skill.subtechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live Interactive Shader Playground */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/10 bg-[#08080D]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
              <Activity className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wider">Live Shader Synthesis Lab</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">WebGL / 2D Canvas</span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            Test the procedural geometry engine in real-time. Modulate the parameters below to observe mathematical waveform deformation and dynamic particle harmonics.
          </p>

          {/* Canvas Viewport */}
          <div className="w-full h-[260px] rounded-xl bg-black/80 border border-white/10 overflow-hidden relative flex items-center justify-center mb-6">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-2.5 right-2.5 text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
              HARMONIC MATRIX // v4.1
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Quantum Flux Amplitude</span>
                </span>
                <span className="text-[#00F0FF] tabular-nums font-semibold">{quantumFlux}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quantumFlux}
                onChange={(e) => {
                  setQuantumFlux(Number(e.target.value));
                  soundFx.playHover();
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                  <span>Resonance Harmonics</span>
                </span>
                <span className="text-[#A855F7] tabular-nums font-semibold">{harmonicResonance} Nodes</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={harmonicResonance}
                onChange={(e) => {
                  setHarmonicResonance(Number(e.target.value));
                  soundFx.playHover();
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Angular Velocity</span>
                </span>
                <span className="text-sky-400 tabular-nums font-semibold">{rotationSpeed} RPM</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                value={rotationSpeed}
                onChange={(e) => {
                  setRotationSpeed(Number(e.target.value));
                  soundFx.playHover();
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Creative Engineering Manifesto Box */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-white/[0.02] via-[#00F0FF]/[0.02] to-[#8A2BE2]/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] block mb-1">
              Core Engineering Philosophy
            </span>
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase">
              The Confluence of Rigor & Avant-Garde
            </h4>
          </div>
          <div className="md:col-span-8 text-neutral-300 text-sm leading-relaxed space-y-2">
            <p>
              Technology is not simply a utilitarian substrate—it is an expressive spatial medium. By fusing low-level systems programming, real-time graphics pipelines, and advanced machine learning models, we unlock perceptual computing paradigms that resonate deeply with human emotion.
            </p>
            <p className="text-xs font-mono text-neutral-400">
              Guiding Principles: Zero Frame Drops · Latency Parity · Algorithmic Elegance · Perceptual Immersion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
