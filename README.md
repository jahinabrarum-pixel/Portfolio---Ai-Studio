# Kairen Vex — Creative Technologist & Spatial Systems Architect Portfolio

A cutting-edge, ultra-modern, fully responsive personal portfolio blending cyberpunk dark-mode aesthetics with high-end minimal luxury.

## 🚀 Key Features

- **Deep Obsidian & Neon Aesthetic**: `#050505` obsidian black backdrop, `#00F0FF` electric cyan accents, holographic violet gradients, and crisp white typography.
- **Cinematic Typography**: Google Fonts featuring `Syne`, `Syncopate`, `JetBrains Mono`, and `Plus Jakarta Sans`.
- **Interactive Particle Grid Canvas**: Custom HTML5 Canvas particle constellation reacting smoothly to mouse movement and proximity.
- **Procedural Web Audio Synthesizer**: Pure Web Audio API procedural sound engine with sci-fi clicks, hover blips, modal sweeps, and success chimes.
- **Custom Cyber Reticle Cursor**: Glowing cursor follower with lerp tracking and toggle support.
- **Floating Top Bar**: Live UTC digital clock, availability status, sound and cursor toggles, and direct section anchors.
- **Selected Works (Project Bento Grid)**: Filterable projects with high-resolution visual previews, unboxed metadata, and full **"View Protocol" Dossier Modal** with interactive parameter sandbox and code kernels.
- **Skill Matrix & Live Shader Lab**: Capability index with holographic fluency progress bars and a real-time procedural canvas driven by interactive sliders (*Quantum Flux*, *Harmonic Resonance*, *Angular Velocity*).
- **Career Trajectory & Milestones**: Chronological timeline tracking roles, deliverables, and tech stacks.
- **Interactive CLI Terminal & Encrypted Form**: Interactive command shell with command history and directives (`help`, `about`, `skills`, `projects`, `contact`, `stats`, `download`, `clear`), paired with an encrypted inquiry form.

## 📦 Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Audio**: Web Audio API (zero external audio dependencies)

## 🛠️ Quick Start

### 1. Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will run locally at `http://localhost:3000` (or `http://localhost:5173`).

### 4. Build for Production
```bash
npm run build
```
The compiled output will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or Google Cloud Run.

### 5. Run Unit Tests
```bash
npx --yes tsx --test src/utils/terminalParser.test.ts
```

## 📁 Project Structure

```
├── public/                 # Static public assets
├── src/
│   ├── assets/
│   │   └── images/         # Generated high-resolution project images & avatar
│   ├── components/
│   │   ├── ContactTerminal.tsx # Interactive CLI & transmission form
│   │   ├── CustomCursor.tsx    # Cyber reticle cursor
│   │   ├── Footer.tsx          # Minimalist footer & source links
│   │   ├── HeroSection.tsx     # Cinematic hero & metrics strip
│   │   ├── Navbar.tsx          # Floating navbar & audio/cursor toggles
│   │   ├── ParticleCanvas.tsx  # Dynamic interactive particle grid
│   │   ├── ProjectModal.tsx    # Protocol dossier modal & sandbox
│   │   ├── ProjectShowcase.tsx # Project Bento grid
│   │   ├── SkillMatrix.tsx     # Capability index & live shader lab
│   │   └── TimelineSection.tsx # Chronological career milestones
│   ├── data/
│   │   └── portfolioData.ts    # Central registry for projects & skills
│   ├── utils/
│   │   ├── audioSynth.ts       # Web Audio API sound synthesizer
│   │   ├── terminalParser.ts   # CLI command logic
│   │   └── terminalParser.test.ts # Unit tests for CLI parser
│   ├── App.tsx             # Root layout & state orchestrator
│   ├── index.css           # Tailwind CSS v4 & custom cyber layers
│   └── main.tsx            # React DOM mounting
├── index.html              # HTML entry point with Google Fonts
├── metadata.json           # Application metadata
├── package.json            # Node.js dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 📄 License
Apache-2.0
