import { useState } from 'react';
import { Layers, ExternalLink, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectProtocol } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

interface ProjectShowcaseProps {
  onSelectProject: (project: ProjectProtocol) => void;
}

export function ProjectShowcase({ onSelectProject }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = ['all', 'Spatial & 3D', 'Generative AI', 'Quantum Systems', 'Robotics & Vision'];

  const filteredProjects =
    activeFilter === 'all'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Curated Engineering Portfolios</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Selected Works
          </h2>
        </div>

        {/* Filter Segmented Controls (Allowed as functional buttons) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveFilter(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeFilter === cat
                  ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'all' ? 'All Works' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className={`group relative glass-panel rounded-2xl p-6 border border-white/10 glass-panel-hover flex flex-col justify-between overflow-hidden ${
              index === 0 ? 'md:col-span-2 lg:grid lg:grid-cols-12 lg:gap-8 items-center' : ''
            }`}
          >
            {/* Top Image Preview Container */}
            <div
              className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5 aspect-[16/9] ${
                index === 0 ? 'lg:col-span-7 mb-6 lg:mb-0' : 'mb-6'
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Simulation Mode Indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>{project.category}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className={`flex flex-col justify-between ${index === 0 ? 'lg:col-span-5' : 'flex-1'}`}>
              <div>
                {/* Unboxed Metadata (Zero-Pill Discipline §1.A) */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                  <span className="text-[#00F0FF] font-semibold">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.clientContext}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.role}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors uppercase tracking-wide">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-neutral-300 mb-4 font-normal">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Tech Tags - Clean minimal chips */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs font-mono">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-neutral-300 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono text-neutral-400">
                  <span className="text-white font-semibold">{project.metrics[0]}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playModalOpen();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white font-mono text-xs font-medium hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-200 flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View Protocol</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
