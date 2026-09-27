import React, { useState } from 'react';
import { ArrowUpRight, GithubLogo, LinkedinLogo, EnvelopeSimple, List, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills, personalInfo } from '../mock';

const customEase = [0.32, 0.72, 0, 1];

const RevealItem = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8, delay, ease: customEase }}
    className={className}
  >
    {children}
  </motion.div>
);

const DoubleBezelCard = ({ children, className = "" }) => (
  <div className={`rounded-[2rem] bg-white/[0.02] p-1.5 ring-1 ring-white/10 ${className}`}>
    <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background/90 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl">
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
      className={`group flex w-max items-center gap-4 rounded-full pl-6 pr-2 py-2 text-sm font-medium transition-all duration-500 ease-vanguard active:scale-[0.98] ${
        secondary
          ? 'bg-white/5 text-foreground ring-1 ring-white/10 hover:bg-white/10'
          : 'bg-primary text-primary-foreground hover:bg-white/90'
      } ${className}`}
    >
      <span>{children}</span>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105 ${secondary ? 'bg-white/10' : 'bg-black/10'}`}>
        <ArrowUpRight weight="bold" className="h-4 w-4" />
      </div>
    </Component>
  );
};

const navItems = ['home', 'about', 'services', 'portfolio', 'contact'];

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen selection:bg-white/20">
      <nav className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
        <div className="flex w-max items-center justify-between gap-8 rounded-full bg-white/[0.03] px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-2xl">
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg font-bold tracking-tight text-foreground"
          >
            a.
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xs font-medium uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: customEase }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: customEase }}
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-3xl font-medium capitalize tracking-tight text-foreground/80 hover:text-foreground"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative flex min-h-[100dvh] w-full items-center justify-center px-4 pt-24">
        <div className="absolute top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
        
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start text-left">
            <RevealItem>
              <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                Systems & Interfaces
              </span>
            </RevealItem>
            
            <RevealItem delay={0.1}>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Engineer of high-end <br className="hidden md:block" />
                <span className="text-foreground/40">digital structures.</span>
              </h1>
            </RevealItem>
            
            <RevealItem delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg">
                {personalInfo.about}
              </p>
            </RevealItem>
            
            <RevealItem delay={0.3} className="mt-12 flex flex-wrap items-center gap-4">
              <IslandButton onClick={() => scrollToSection('contact')}>
                Start a project
              </IslandButton>
              <IslandButton secondary onClick={() => scrollToSection('portfolio')}>
                View selected work
              </IslandButton>
            </RevealItem>
          </div>

          <RevealItem delay={0.4} className="relative flex justify-center lg:justify-end">
            <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full bg-white/[0.02] p-2 ring-1 ring-white/10 md:h-[450px] md:w-[450px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#0f0f0f]">
                <img
                  src="/assets/my.png"
                  alt={`${personalInfo.name} portrait`}
                  className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-vanguard hover:scale-105 hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
              </div>
            </div>
          </RevealItem>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-32 md:py-40">
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <RevealItem>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Strong fundamentals.<br />
              <span className="text-foreground/40">Flawless execution.</span>
            </h2>
          </RevealItem>
          <RevealItem delay={0.1}>
            <div className="prose prose-invert">
              <p className="text-lg leading-relaxed text-foreground/70">
                I specialize in building robust backend systems in Java while maintaining a strict eye for premium frontend interfaces. True engineering is invisible—it's felt in the response time of an API and the tactile feedback of a component.
              </p>
              <div className="mt-8 flex gap-4">
                {[
                  { href: personalInfo.github, icon: GithubLogo },
                  { href: personalInfo.linkedin, icon: LinkedinLogo },
                  { href: `mailto:${personalInfo.email}`, icon: EnvelopeSimple },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] text-foreground/70 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:text-foreground hover:ring-white/30"
                  >
                    <social.icon weight="regular" className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </RevealItem>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <RevealItem>
          <h2 className="mb-16 text-3xl font-medium tracking-tight md:text-5xl">Capabilities</h2>
        </RevealItem>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.slice(0, 5).map((skillGroup, i) => (
            <RevealItem key={skillGroup.category} delay={i * 0.05} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <DoubleBezelCard className="h-full">
                <h3 className="mb-6 text-xl font-medium text-foreground">{skillGroup.category}</h3>
                <ul className="space-y-4">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground/60">
                      <div className="h-1 w-1 rounded-full bg-white/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DoubleBezelCard>
            </RevealItem>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-4 py-32 md:py-40">
        <RevealItem>
          <h2 className="mb-16 text-3xl font-medium tracking-tight md:text-5xl">Selected Work</h2>
        </RevealItem>

        <div className="flex flex-col gap-8 md:gap-12">
          {projects.map((project, i) => (
            <RevealItem key={project.id} delay={0.1}>
              <DoubleBezelCard>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-4 flex items-center gap-4">
                      <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">{project.title}</h3>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/60">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
                      {project.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-md bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <IslandButton secondary href={project.link}>
                    View Repository
                  </IslandButton>
                </div>
              </DoubleBezelCard>
            </RevealItem>
          ))}
        </div>
      </section>

      <footer id="contact" className="mx-auto max-w-7xl px-4 py-24 text-center md:py-32">
        <RevealItem>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl">
            Let's build something <br className="hidden md:block" />
            <span className="text-foreground/40">extraordinary.</span>
          </h2>
        </RevealItem>
        <RevealItem delay={0.1} className="mt-12 flex justify-center">
          <IslandButton href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
          </IslandButton>
        </RevealItem>
        
        <RevealItem delay={0.2} className="mt-32 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-foreground/40 md:flex-row">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </RevealItem>
      </footer>
    </main>
  );
};

export default Home;
