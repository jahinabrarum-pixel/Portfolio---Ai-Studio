import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Crosshair, Terminal, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audioSynth.ts';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  onOpenTerminal: () => void;
}

export function Navbar({
  soundEnabled,
  onToggleSound,
  cursorEnabled,
  onToggleCursor,
  onOpenTerminal,
}: NavbarProps) {
  const [timeString, setTimeString] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${mins}:${secs} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between gap-6 px-5 py-3 rounded-xl transition-all duration-300 pointer-events-auto ${
          scrolled
            ? 'glass-panel bg-[#08080C]/85 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-white/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Zone 1: Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 text-decoration-none"
        >
          <div className="w-2.5 h-2.5 rounded-sm bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] group-hover:rotate-45 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-bold tracking-widest text-white group-hover:text-[#00F0FF] transition-colors">
              KAIREN VEX
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-neutral-400">
          <button
            onClick={() => handleNavClick('works')}
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest"
          >
            01. Works
          </button>
          <button
            onClick={() => handleNavClick('matrix')}
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest"
          >
            02. Skill Matrix
          </button>
          <button
            onClick={() => handleNavClick('trajectory')}
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest"
          >
            03. Trajectory
          </button>
          <button
            onClick={() => handleNavClick('terminal')}
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest"
          >
            04. Terminal
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Digital Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/80 animate-pulse" />
            <span className="tabular-nums font-mono">{timeString || '00:00:00 UTC'}</span>
          </div>

          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              soundFx.playClick();
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundEnabled ? 'Sound FX: Online' : 'Sound FX: Muted'}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              soundEnabled
                ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Cursor Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleCursor();
              soundFx.playClick();
            }}
            aria-label={cursorEnabled ? 'Disable cyber cursor' : 'Enable cyber cursor'}
            title={cursorEnabled ? 'Reticle Cursor: Active' : 'Reticle Cursor: Default'}
            className={`hidden md:block p-2 rounded-lg border transition-all duration-200 ${
              cursorEnabled
                ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>

          {/* Quick Terminal Launcher CTA */}
          <button
            type="button"
            onClick={() => {
              onOpenTerminal();
              soundFx.playClick();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-semibold hover:bg-[#66F6FF] hover:shadow-[0_0_16px_rgba(0,240,255,0.6)] transition-all whitespace-nowrap shrink-0"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundFx.playClick();
            }}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl glass-panel bg-[#0B0B10]/95 p-4 rounded-xl border border-white/15 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 font-mono text-sm text-neutral-300">
            <button
              onClick={() => handleNavClick('works')}
              className="text-left py-2 px-3 rounded hover:bg-white/5 hover:text-[#00F0FF] transition-colors"
            >
              01. Selected Works
            </button>
            <button
              onClick={() => handleNavClick('matrix')}
              className="text-left py-2 px-3 rounded hover:bg-white/5 hover:text-[#00F0FF] transition-colors"
            >
              02. Skill Matrix
            </button>
            <button
              onClick={() => handleNavClick('trajectory')}
              className="text-left py-2 px-3 rounded hover:bg-white/5 hover:text-[#00F0FF] transition-colors"
            >
              03. Trajectory & Milestones
            </button>
            <button
              onClick={() => handleNavClick('terminal')}
              className="text-left py-2 px-3 rounded hover:bg-white/5 hover:text-[#00F0FF] transition-colors"
            >
              04. Interactive Terminal & Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
