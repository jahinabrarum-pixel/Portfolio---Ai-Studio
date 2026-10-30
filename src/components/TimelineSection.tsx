import { useState } from 'react';
import { ChevronDown, ChevronUp, Milestone, MapPin, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

export function TimelineSection() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleExpand = (index: number) => {
    soundFx.playClick();
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="trajectory" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Header */}
      <div className="mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center gap-2">
          <Milestone className="w-3.5 h-3.5" />
          <span>Chronological Trajectory</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Career Milestones & Roles
        </h2>
      </div>

      {/* Futuristic Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Continuous Vertical Glowing Line */}
        <div className="absolute top-2 bottom-4 left-2 sm:left-3.5 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#8A2BE2] to-transparent opacity-40" />

        {PORTFOLIO_DATA.timeline.map((item, index) => {
          const isExpanded = expandedIndices.includes(index);

          return (
            <div key={item.period + item.organization} className="relative group">
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00F0FF] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center shadow-[0_0_10px_#00F0FF]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              </div>

              {/* Milestone Card */}
              <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 glass-panel-hover">
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(index)}
                  className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
                      <span>{item.period}</span>
                      <span>·</span>
                      <span className="text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white uppercase group-hover:text-[#00F0FF] transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-sm font-mono text-neutral-300 mt-0.5">
                      {item.organization}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`Toggle details for ${item.role}`}
                    className="self-start sm:self-center p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                  {item.summary}
                </p>

                {/* Expandable Key Highlights */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Key Deliverables & Innovations</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-400 font-sans">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-[#00F0FF] font-mono mt-0.5">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/5 text-neutral-300 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
