import React, { useState } from 'react';
import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  List,
  X,
  GraduationCap,
  Certificate,
  BookOpen,
  CalendarBlank,
  Cpu,
  GitBranch,
  Lightning,
  ShieldCheck,
  CheckCircle,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills, personalInfo, education } from '../mock';
import ShapeGrid from '../components/ShapeGrid';
import { LogoMarquee } from '../components/ui/logo-marquee';
import WorkflowDiagram from '../components/WorkflowDiagram';
import ProjectCard from '../components/ProjectCard';

const techLogos = [
  { src: "https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg", alt: "GitHub" },
  { src: "https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg", alt: "Vercel" },
  { src: "https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg", alt: "Supabase" },
  { src: "https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg", alt: "OpenAI" },
  { src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg", alt: "Clerk" },
  { src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg", alt: "Turso" },
  { src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg", alt: "Claude" },
  { src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg", alt: "Nvidia" }
];

const workflowStages = [
  {
    step: "01",
    title: "System Design & Edge Cases",
    model: "Claude Opus",
    icon: Cpu,
    description: "Map system constraints (scalability, latency, maintainability) and probe for failure modes before writing architecture.",
    deliverable: "Architecture Decision Records (ADRs)"
  },
  {
    step: "02",
    title: "Whole-Repo Context",
    model: "Gemini 3 Pro",
    icon: GitBranch,
    description: "Ingest full codebases into a 1M token context window to trace global dependencies and plan cross-service refactors.",
    deliverable: "1M Token Context Mapping"
  },
  {
    step: "03",
    title: "Rapid Scaffolding",
    model: "GitHub Copilot",
    icon: Lightning,
    description: "Accelerate repetitive boilerplate, API contracts, and schema scaffolding to turn designs into working systems in hours.",
    deliverable: "High-Speed Working Prototypes"
  },
  {
    step: "04",
    title: "Zero-Trust Verification",
    model: "Manual + Claude",
    icon: ShieldCheck,
    description: "Never blindly accept AI outputs. Rigorous manual review of auth boundaries, injection risks, and cost/performance trade-offs.",
    deliverable: "Pre-Commit Security Audit"
  }
];

const customEase = [0.32, 0.72, 0, 1];

const RevealItem = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '0px' }}
    transition={{ duration: 0.6, delay, ease: customEase }}
    className={className}
  >
    {children}
  </motion.div>
);

const DoubleBezelCard = ({ children, className = "", innerClassName = "" }) => (
  <div className={`rounded-2xl sm:rounded-[2rem] bg-white/[0.02] p-1 sm:p-1.5 ring-1 ring-white/10 ${className}`}>
    <div className={`relative h-full w-full overflow-hidden rounded-[calc(1rem)] sm:rounded-[calc(2rem-0.375rem)] bg-background/90 p-5 sm:p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl ${innerClassName}`}>
      {children}
    </div>
  </div>
);

const IslandButton = ({ children, href, onClick, className = "", secondary = false }) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
      className={`group flex items-center justify-between sm:justify-start gap-3 sm:gap-4 rounded-full pl-4 sm:pl-6 pr-2 py-2 text-xs sm:text-sm font-medium transition-all duration-500 ease-vanguard active:scale-[0.98] max-w-full ${
        secondary
          ? 'bg-white/5 text-foreground ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20'
          : 'bg-primary text-primary-foreground hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
      } ${className}`}
    >
      <span className="truncate">{children}</span>
      <div className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105 ${secondary ? 'bg-white/10' : 'bg-black/10'}`}>
        <ArrowUpRight weight="bold" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
    </Component>
  );
};

const navItems = ['home', 'about', 'workflow', 'education', 'services', 'portfolio', 'contact'];

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen selection:bg-white/20 overflow-x-hidden w-full">
      {/* Background shape grid */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <ShapeGrid
          speed={0.4}
          squareSize={35}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.05)"
          hoverFillColor="rgba(255, 255, 255, 0.1)"
          shape="square"
          hoverTrailAmount={2}
        />
      </div>

      {/* Floating Header Navigation */}
      <nav className="fixed inset-x-0 top-3 sm:top-6 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <div className="pointer-events-auto flex w-full max-w-[calc(100vw-1.5rem)] sm:max-w-max items-center justify-between gap-3 sm:gap-6 lg:gap-8 rounded-full bg-white/[0.03] px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-2xl">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shrink-0"
            aria-label="Home"
          >
            <img
              src="/assets/nav_bar_icon.png"
              alt="Aravinda logo"
              className="h-5 sm:h-6 w-auto object-contain mix-blend-screen"
            />
          </button>

          <div className="hidden items-center gap-4 sm:gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xs font-medium uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
              >
                {item === 'workflow' ? 'How I Work' : item}
              </button>
            ))}
          </div>

          <button
            className="p-1 text-foreground md:hidden rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: customEase }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl md:hidden px-6"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 + 0.08, duration: 0.4, ease: customEase }}
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-2xl sm:text-3xl font-medium capitalize tracking-tight text-foreground/80 hover:text-foreground"
                >
                  {item === 'workflow' ? 'How I Work' : item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section id="home" className="relative flex min-h-[100dvh] w-full flex-col justify-between px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-4 md:pb-6">
        <div className="absolute top-1/4 h-[280px] sm:h-[500px] w-[280px] sm:w-[500px] rounded-full bg-white/[0.02] blur-[100px] sm:blur-[120px] pointer-events-none" />
        
        <div className="flex flex-1 w-full flex-col justify-center my-auto py-4">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0">
              <RevealItem>
                <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-3.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Systems &amp; Interfaces
                </span>
              </RevealItem>
              
              <RevealItem delay={0.1}>
                <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold leading-[1.08] tracking-tight text-foreground">
                  Engineer of high-end <br className="hidden sm:inline" />
                  <span className="text-foreground/40">digital structures.</span>
                </h1>
              </RevealItem>
              
              <RevealItem delay={0.2}>
                <p className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-base leading-relaxed text-foreground/70">
                  {personalInfo.about}
                </p>
              </RevealItem>
              
              <RevealItem delay={0.3} className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <IslandButton onClick={() => scrollToSection('contact')} className="w-full sm:w-max justify-center">
                  Start a project
                </IslandButton>
                <IslandButton secondary onClick={() => scrollToSection('portfolio')} className="w-full sm:w-max justify-center">
                  View selected work
                </IslandButton>
              </RevealItem>
            </div>

            {/* Right Column: Profile Picture */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end shrink-0 my-2 lg:my-0">
              <RevealItem delay={0.4}>
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] shrink-0 rounded-full bg-white/[0.02] p-1.5 sm:p-2 ring-1 ring-white/10 shadow-[0_0_50px_rgba(255,255,255,0.04)]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#0f0f0f]">
                    <img
                      src="/assets/my.png"
                      alt={`${personalInfo.name} portrait`}
                      className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-vanguard hover:scale-105 hover:grayscale-0"
                      loading="eager"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
                  </div>
                </div>
              </RevealItem>
            </div>

          </div>
        </div>
        
        <div className="w-full pt-2 pb-2 shrink-0">
          <LogoMarquee logos={techLogos} />
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="relative mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <RevealItem>
              <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                Engineering Philosophy
              </span>
            </RevealItem>
            <RevealItem delay={0.1}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
                Strong fundamentals.<br />
                <span className="text-foreground/40">Flawless execution.</span>
              </h2>
            </RevealItem>
            <RevealItem delay={0.2}>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-foreground/70">
                Specializing in robust backend architectures in Java while maintaining high fidelity in user interfaces.
              </p>
            </RevealItem>
          </div>

          <div className="lg:col-span-7">
            <RevealItem delay={0.2}>
              <DoubleBezelCard>
                <div className="flex flex-col gap-4 sm:gap-6">
                  <p className="text-sm sm:text-lg leading-relaxed text-foreground/80">
                    I specialize in building robust backend systems in Java while maintaining a strict eye for premium frontend interfaces. True engineering is invisible—it's felt in the response time of an API and the tactile feedback of a component.
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 border-t border-white/10 pt-4">
                    {["Java 17 & Spring Boot", "OOP & Clean MVC / DAO", "Relational Databases", "Modern React & Tailwind"].map((pill) => (
                      <span key={pill} className="rounded-md bg-white/[0.04] border border-white/5 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs text-foreground/70">
                        {pill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-foreground/50">Connect with me</span>
                    <div className="flex gap-3">
                      {[
                        { href: personalInfo.github, icon: GithubLogo, label: "GitHub" },
                        { href: personalInfo.linkedin, icon: LinkedinLogo, label: "LinkedIn" },
                        { href: `mailto:${personalInfo.email}`, icon: EnvelopeSimple, label: "Email" },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.label}
                          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/[0.03] text-foreground/70 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:text-foreground hover:ring-white/30"
                        >
                          <social.icon weight="regular" className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </DoubleBezelCard>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* 3. Workflow Section - How I Work (AI-Augmented Architecture & High-Speed Execution) */}
      <section id="workflow" className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <RevealItem>
            <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              How I Work · Velocity &amp; Architecture
            </span>
          </RevealItem>
          
          <RevealItem delay={0.1}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.08]">
              High velocity. <br className="hidden sm:inline" />
              <span className="text-foreground/40">Architectural discipline.</span>
            </h2>
          </RevealItem>
          
          <RevealItem delay={0.2}>
            <p className="mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-foreground/70">
              I leverage frontier AI models to accelerate system prototyping and repository-scale comprehension, while applying strict human verification to security boundaries, schema designs, and production trade-offs.
            </p>
          </RevealItem>
        </div>

        {/* 4-Stage Execution Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {workflowStages.map((stage, i) => (
            <RevealItem key={stage.step} delay={i * 0.08} className="h-full">
              <DoubleBezelCard className="h-full transition-transform duration-500 hover:-translate-y-1.5">
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="font-mono text-xs text-foreground/40 font-semibold">{stage.step}</span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400/90 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                        {stage.model}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
                      <stage.icon weight="duotone" className="h-4 w-4 text-white/80 shrink-0" />
                      {stage.title}
                    </h3>
                    
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/60">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40 block">Output</span>
                    <span className="text-xs font-medium text-foreground/80">{stage.deliverable}</span>
                  </div>
                </div>
              </DoubleBezelCard>
            </RevealItem>
          ))}
        </div>

        {/* Architectural Execution Flow Diagram */}
        <RevealItem delay={0.3} className="w-full">
          <WorkflowDiagram />
        </RevealItem>

      </section>

      {/* 4. Education Section */}
      <section id="education" className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left lg:sticky lg:top-28">
            <RevealItem>
              <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                Academic Pathway
              </span>
            </RevealItem>
            
            <RevealItem delay={0.1}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                Education &amp; <br />
                <span className="text-foreground/40">Credentials.</span>
              </h2>
            </RevealItem>
            
            <RevealItem delay={0.2}>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-foreground/70">
                A structured engineering foundation focused on system architecture, software design patterns, and full-stack development principles.
              </p>
            </RevealItem>

            <RevealItem delay={0.3} className="mt-4 sm:mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-foreground/80">
                <GraduationCap weight="duotone" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/80" />
                3 Qualifications
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-foreground/80">
                <BookOpen weight="duotone" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/80" />
                Software Engineering
              </span>
            </RevealItem>
          </div>

          {/* Right Column: Education entries with vertical timeline */}
          <div className="lg:col-span-8 relative ml-2 sm:ml-4 border-l border-white/10 space-y-8 sm:space-y-12 pb-2">
            {education.map((edu, i) => (
              <RevealItem key={edu.id} delay={i * 0.1}>
                <div className="relative pl-6 sm:pl-10 group">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-wider text-foreground/60">
                        <CalendarBlank weight="regular" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-foreground/50" />
                        <span>{edu.period}</span>
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/50">
                        Accredited
                      </span>
                    </div>

                    <div className="relative">
                      {/* Glowing Timeline Node Dot aligned to main text */}
                      <div className="absolute -left-[30px] sm:-left-[46px] top-[6px] sm:top-[7px] h-3 w-3 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.8)] ring-4 ring-background transition-transform duration-300 group-hover:scale-125" />

                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-white">
                        {edu.degree}
                      </h3>
                      <h4 className="mt-1 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground/70">
                        <Certificate weight="duotone" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/50 shrink-0" />
                        {edu.institution}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-base leading-relaxed text-foreground/60 max-w-2xl">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Capabilities (Services) Section */}
      <section id="services" className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-start mb-8 sm:mb-10">
          <RevealItem>
            <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
              Technical Stack
            </span>
          </RevealItem>
          <RevealItem delay={0.1}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Technical <span className="text-foreground/40">Capabilities.</span>
            </h2>
          </RevealItem>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillGroup, i) => (
            <RevealItem key={skillGroup.category} delay={i * 0.05}>
              <DoubleBezelCard className="h-full transition-transform duration-500 hover:-translate-y-1">
                <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-foreground tracking-tight flex items-center justify-between">
                  <span>{skillGroup.category}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                </h3>
                <ul className="space-y-2 sm:space-y-2.5">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/70">
                      <div className="h-1 w-1 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DoubleBezelCard>
            </RevealItem>
          ))}
        </div>
      </section>

      {/* 6. Selected Work Section */}
      <section id="portfolio" className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-start mb-8 sm:mb-10">
          <RevealItem>
            <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
              Featured Projects
            </span>
          </RevealItem>
          <RevealItem delay={0.1}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Selected <span className="text-foreground/40">Work.</span>
            </h2>
          </RevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {projects.map((project, i) => {
            const indexStr = String(i + 1).padStart(2, '0');
            const totalStr = String(projects.length).padStart(2, '0');
            const isLastAndOdd = (i === projects.length - 1) && (projects.length % 2 !== 0);

            return (
              <RevealItem
                key={project.id}
                delay={i * 0.08}
                className={`h-full ${
                  isLastAndOdd ? 'md:col-span-2 md:w-full md:max-w-[calc(50%-0.5rem)] lg:max-w-[calc(50%-0.75rem)] md:mx-auto' : ''
                }`}
              >
                <ProjectCard
                  project={project}
                  indexStr={indexStr}
                  totalStr={totalStr}
                />
              </RevealItem>
            );
          })}
        </div>
      </section>

      {/* 7. Contact & Footer */}
      <footer id="contact" className="relative mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
        <RevealItem>
          <div className="flex flex-col items-center max-w-3xl mx-auto w-full">
            <span className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08]">
              Let's build something <br className="hidden sm:inline" />
              <span className="text-foreground/40">extraordinary.</span>
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-base lg:text-lg text-foreground/70 leading-relaxed px-2">
              Available for software engineering roles, backend architecture collaborations, and technical discussions.
            </p>
            <div className="mt-8 sm:mt-10 flex justify-center w-full px-2">
              <IslandButton href={`mailto:${personalInfo.email}`} className="max-w-[calc(100vw-3rem)]">
                {personalInfo.email}
              </IslandButton>
            </div>
          </div>
        </RevealItem>
        
        <RevealItem delay={0.2} className="mt-16 sm:mt-24 flex flex-col items-center justify-between border-t border-white/10 pt-6 sm:pt-8 text-xs sm:text-sm text-foreground/40 md:flex-row gap-4">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href={personalInfo.buyMeACoffee} target="_blank" rel="noreferrer" className="hover:text-[#FFDD00] transition-colors">Buy Me a Coffee</a>
            <a href={personalInfo.patreon} target="_blank" rel="noreferrer" className="hover:text-[#FF858D] transition-colors">Patreon</a>
          </div>
        </RevealItem>
      </footer>
    </main>
  );
};

export default Home;
