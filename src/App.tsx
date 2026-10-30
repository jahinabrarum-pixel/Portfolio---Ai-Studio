/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProjectShowcase } from './components/ProjectShowcase.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { SkillMatrix } from './components/SkillMatrix.tsx';
import { TimelineSection } from './components/TimelineSection.tsx';
import { ContactTerminal } from './components/ContactTerminal.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectProtocol } from './data/portfolioData.ts';
import { soundFx } from './utils/audioSynth.ts';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectProtocol | null>(null);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.setEnabled(nextState);
  };

  const handleToggleCursor = () => {
    setCursorEnabled((prev) => !prev);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Interactive Background Particle Network */}
      <ParticleCanvas />

      {/* Cyber Reticle Cursor Follower */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Futuristic Floating Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        cursorEnabled={cursorEnabled}
        onToggleCursor={handleToggleCursor}
        onOpenTerminal={() => handleScrollTo('terminal')}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onExploreWorks={() => handleScrollTo('works')}
          onLaunchTerminal={() => handleScrollTo('terminal')}
        />

        {/* Selected Works / Protocols Bento Grid */}
        <ProjectShowcase onSelectProject={(project) => setSelectedProject(project)} />

        {/* Capability Index & Skill Matrix with Live Algorithmic Playground */}
        <SkillMatrix />

        {/* Chronological Career Trajectory */}
        <TimelineSection />

        {/* Interactive CLI Terminal & Encrypted Contact Transmission */}
        <ContactTerminal />
      </main>

      {/* Protocol Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Minimal Luxury Footer */}
      <Footer />
    </div>
  );
}
