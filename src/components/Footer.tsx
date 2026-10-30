import { ArrowUp, Github, Twitter, Linkedin, Disc as Discord } from 'lucide-react';
import { soundFx } from '../utils/audioSynth.ts';

export function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 text-neutral-400 font-mono text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand Identity & Coordinates */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-heading text-sm font-bold tracking-widest text-white">
            KAIREN VEX
          </span>
          <span className="text-neutral-500 hidden sm:inline">|</span>
          <span className="text-neutral-400">
            37.7749° N, 122.4194° W · Orbit Enclave
          </span>
        </div>

        {/* Center: Social Signal Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="p-2 rounded-lg hover:text-[#00F0FF] hover:bg-white/5 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter profile"
            className="p-2 rounded-lg hover:text-[#00F0FF] hover:bg-white/5 transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 rounded-lg hover:text-[#00F0FF] hover:bg-white/5 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord community"
            className="p-2 rounded-lg hover:text-[#00F0FF] hover:bg-white/5 transition-colors"
          >
            <Discord className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Kairen Vex</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Return to top"
            className="flex items-center gap-1 text-neutral-400 hover:text-[#00F0FF] transition-colors p-1"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
