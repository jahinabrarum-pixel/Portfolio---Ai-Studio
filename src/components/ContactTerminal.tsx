import { useState, useRef, useEffect, useId } from 'react';
import { Terminal as TerminalIcon, Send, Sparkles, CheckCircle2, CornerDownLeft, ShieldCheck, Mail } from 'lucide-react';
import { parseCommand, CommandResponse } from '../utils/terminalParser.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { soundFx } from '../utils/audioSynth.ts';

interface TerminalLine {
  id: string;
  type: 'prompt' | 'output' | 'error' | 'info';
  content: string[];
}

export function ContactTerminal() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'form'>('terminal');
  const nameInputId = useId();
  const emailInputId = useId();
  const classificationInputId = useId();
  const messageInputId = useId();

  // Terminal state
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'info',
      content: [
        'SYNTHETIX SECURE SHELL [v26.4.12] - DEFCON 5 CLEARED',
        'Connected to node: alpha.interstellar.dev:443',
        'Type "help" to view executable protocols or click quick directives below.',
      ],
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    classification: 'Spatial Computing & 3D Web',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, activeTab]);

  const handleExecuteCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    soundFx.playClick();

    // Add prompt line
    const promptLine: TerminalLine = {
      id: `prompt-${Date.now()}`,
      type: 'prompt',
      content: [`visitor@interstellar:~$ ${cmd}`],
    };

    const res: CommandResponse = parseCommand(cmd, {
      availableProjects: PORTFOLIO_DATA.projects.map((p) => `${p.title} - ${p.subtitle}`),
      skillsCount: PORTFOLIO_DATA.skills.length,
    });

    if (res.type === 'clear') {
      setLines([]);
    } else {
      const outputLine: TerminalLine = {
        id: `out-${Date.now()}`,
        type: res.type,
        content: res.content,
      };
      setLines((prev) => [...prev, promptLine, outputLine]);
    }

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.playTerminalKey();

    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const errors: { [key: string]: string } = {};
    if (!formState.name.trim()) errors.name = 'Please provide your name or entity identifier.';
    if (!formState.email.trim()) {
      errors.email = 'Transmission vector (email) is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Please provide a valid transmission address.';
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      errors.message = 'Mission dispatch must contain at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    soundFx.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      soundFx.playSuccess();
      setFormState({
        name: '',
        email: '',
        classification: 'Spatial Computing & 3D Web',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive Transmission Console</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Initialize Contact
          </h2>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('terminal');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
              activeTab === 'terminal'
                ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>CLI Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('form');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
              activeTab === 'form'
                ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Encrypted Form</span>
          </button>
        </div>
      </div>

      {activeTab === 'terminal' ? (
        /* CLI Terminal View */
        <div className="glass-panel rounded-2xl border border-white/15 bg-[#06060A] shadow-2xl overflow-hidden font-mono">
          {/* Terminal Window Chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-neutral-400 ml-2">kairen-vex-shell ~ zsh</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#00F0FF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 SECURED</span>
            </div>
          </div>

          {/* Terminal Output Log */}
          <div className="p-5 sm:p-6 min-h-[320px] max-h-[460px] overflow-y-auto space-y-3 text-xs sm:text-sm">
            {lines.map((line) => (
              <div key={line.id} className="space-y-1">
                {line.content.map((text, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.type === 'prompt'
                        ? 'text-white font-semibold'
                        : line.type === 'error'
                        ? 'text-rose-400'
                        : line.type === 'info'
                        ? 'text-[#00F0FF]'
                        : 'text-neutral-300'
                    } leading-relaxed`}
                  >
                    {text}
                  </div>
                ))}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Directives Bar */}
          <div className="px-5 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-neutral-500 whitespace-nowrap text-[11px]">Quick Directives:</span>
            {['help', 'about', 'skills', 'projects', 'contact', 'stats', 'clear'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleExecuteCommand(cmd)}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#00F0FF]/15 hover:text-[#00F0FF] text-neutral-400 transition-colors whitespace-nowrap text-[11px] border border-white/5"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input Prompt */}
          <div className="px-5 py-3.5 bg-black/60 border-t border-white/10 flex items-center gap-3">
            <span className="text-[#00F0FF] font-bold text-sm shrink-0">visitor@interstellar:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command and press Enter..."
              aria-label="Terminal command prompt"
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder:text-neutral-600"
            />
            <button
              type="button"
              onClick={() => handleExecuteCommand(inputVal)}
              aria-label="Execute command"
              className="p-1.5 rounded bg-white/10 text-neutral-300 hover:text-[#00F0FF] hover:bg-white/20 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Encrypted Transmission Form View */
        <div className="glass-panel rounded-2xl border border-white/15 p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative bg-[#07070C]">
          {submitSuccess ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF] text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase">
                Transmission Dispatched
              </h3>
              <p className="text-sm font-mono text-neutral-400 max-w-md mx-auto">
                Encrypted payload successfully ingested into Kairen Vex's priority queue. Response horizon: 24 standard terrestrial hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor={nameInputId} className="block text-xs font-mono text-neutral-300 mb-2 uppercase tracking-wider">
                    Transceiver Identity (Name) *
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs sm:text-sm focus:border-[#00F0FF] focus:outline-none transition-colors"
                  />
                  {formErrors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={emailInputId} className="block text-xs font-mono text-neutral-300 mb-2 uppercase tracking-wider">
                    Signal Channel (Email) *
                  </label>
                  <input
                    id={emailInputId}
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. vance@blackmesa.org"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs sm:text-sm focus:border-[#00F0FF] focus:outline-none transition-colors"
                  />
                  {formErrors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor={classificationInputId} className="block text-xs font-mono text-neutral-300 mb-2 uppercase tracking-wider">
                  Mission Classification
                </label>
                <select
                  id={classificationInputId}
                  value={formState.classification}
                  onChange={(e) => setFormState({ ...formState, classification: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090E] border border-white/10 text-white font-mono text-xs sm:text-sm focus:border-[#00F0FF] focus:outline-none transition-colors"
                >
                  <option value="Spatial Computing & 3D Web">Spatial Computing & 3D Web</option>
                  <option value="Generative AI & Latent Tooling">Generative AI & Latent Tooling</option>
                  <option value="Autonomous Robotics & Vision HUD">Autonomous Robotics & Vision HUD</option>
                  <option value="Keynote / Advisory / Creative Direction">Keynote / Advisory / Creative Direction</option>
                </select>
              </div>

              <div>
                <label htmlFor={messageInputId} className="block text-xs font-mono text-neutral-300 mb-2 uppercase tracking-wider">
                  Transmission Payload (Message) *
                </label>
                <textarea
                  id={messageInputId}
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Outline project scope, timeline, engineering challenges, or collaboration proposal..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs sm:text-sm focus:border-[#00F0FF] focus:outline-none transition-colors resize-none"
                />
                {formErrors.message && (
                  <p className="mt-1.5 text-xs text-rose-400 font-mono">{formErrors.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-[11px] font-mono text-neutral-500">
                  Transmissions are cryptographically signed and stored in private enclave.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#60F7FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Encrypting & Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
