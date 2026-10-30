import { useState, useEffect } from 'react';
import { ArrowDownRight, Terminal, Sparkles, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

interface HeroSectionProps {
  onExploreWorks: () => void;
  onLaunchTerminal: () => void;
}

const TAGLINES = [
  'Architecting Synthetic Worlds & Neural Interfaces',
  'Synthesizing Spatial Realities & Shader Geometry',
  'Engineering Generative Intelligence & Cybernetic UI',
  'Bridging Discrete Mathematics with Avant-Garde Code',
];

export function HeroSection({ onExploreWorks, onLaunchTerminal }: HeroSectionProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setFadeState(true);
      }, 350);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col justify-center max-w-7xl mx-auto">
      {/* Subtle ambient gradient mesh behind hero */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Split-screen 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typographic Hierarchy & Lead */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status Indicator Kicker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-ping" />
              <span className="text-[#00F0FF] uppercase tracking-wider text-[11px] font-semibold">Status: Online</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300">Available for interstellar projects</span>
            </span>
          </div>

          {/* Person's Identity & Title */}
          <div className="space-y-2 mb-4">
            <div className="text-xs uppercase font-mono tracking-widest text-[#00F0FF] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Creative Technologist & Spatial Systems Architect</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              Kairen <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#A855F7]">Vex</span>
            </h1>
          </div>

          {/* Dynamic Animated Tagline */}
          <div className="h-20 sm:h-16 flex items-center mb-6">
            <p
              className={`font-display text-lg sm:text-2xl text-neutral-200 font-medium transition-all duration-300 ${
                fadeState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              {TAGLINES[taglineIndex]}
            </p>
          </div>

          {/* Lead Manifesto Body */}
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            {PORTFOLIO_DATA.hero.leadDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onExploreWorks();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative px-6 py-3.5 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#5CF7FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-200"
            >
              <span>Explore Protocols</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onLaunchTerminal();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded-lg glass-panel text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] hover:bg-white/10 transition-all duration-200"
            >
              <Terminal className="w-4 h-4 text-[#00F0FF]" />
              <span>Initialize Terminal</span>
            </button>
          </div>
        </div>

        {/* Right Column: Holographic Portrait & Telemetry Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Ambient cyan glow halo */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#00F0FF]/25 via-transparent to-[#8A2BE2]/25 blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />

            <div className="relative glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 overflow-hidden shadow-2xl">
              {/* Corner tech reticle accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF]" />

              {/* Portrait Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                <img
                  src={PORTFOLIO_DATA.hero.avatarImage}
                  alt="Kairen Vex - Creative Technologist"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Holographic scanline and gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

                {/* Subtitle Badge Inside Photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                  <span className="flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#00F0FF]" />
                    <span>SYNTHETIX CORE // v26.4</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[#00F0FF] border border-[#00F0FF]/20">
                    60 FPS
                  </span>
                </div>
              </div>

              {/* Telemetry Strip Under Photo */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest">Latency</div>
                  <div className="text-xs font-semibold text-[#00F0FF] tabular-nums mt-0.5">3.8 ms</div>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest">Shaders</div>
                  <div className="text-xs font-semibold text-white tabular-nums mt-0.5">Active</div>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest">Clearance</div>
                  <div className="text-xs font-semibold text-purple-400 tabular-nums mt-0.5">Alpha-9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Rigor Proof Strip (Full-width row below the split, per Section 2 of Portfolio guide) */}
      <div className="mt-20 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.hero.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
              {metric.value}
            </span>
            <span className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
