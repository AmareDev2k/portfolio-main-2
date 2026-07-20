import React, { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills, personalInfo } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import ContactForm from '../components/ContactForm';

const navItems = ['home', 'about', 'services', 'portfolio', 'contact'];

const sectionMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

const Section = ({ id, title, subtitle, children }) => (
  <motion.section id={id} className="px-6 py-20 md:py-24" {...sectionMotion}>
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary/90">{subtitle}</p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h2>
      </div>
      {children}
    </div>
  </motion.section>
);

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <main className="site-shell min-h-screen text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-primary/20 bg-[#080808]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollToSection('home')}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            <span className="text-primary">a</span>ravinda
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium capitalize text-foreground/90 transition hover:text-primary"
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
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-primary/20 bg-[#080808] px-6 pb-4 pt-3 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="rounded-md px-3 py-2 text-left text-sm font-medium capitalize text-foreground/90 hover:bg-primary/10 hover:text-primary"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="home" className="relative px-6 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_18%_10%,rgba(255,106,0,0.14),transparent_26%)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 text-2xl font-semibold uppercase tracking-[0.2em] text-foreground/90">Hello!</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              I&apos;m <span className="text-primary">{personalInfo.name}</span>
            </h1>
            <p className="mb-5 text-xl font-semibold text-primary md:text-2xl">{personalInfo.title}</p>
            <p className="mb-8 max-w-xl text-base leading-8 text-foreground/75 md:text-lg">{personalInfo.about}</p>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="rounded-full bg-primary px-7 py-6 text-base font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(255,106,0,0.35)] transition hover:brightness-110"
              >
                Let&apos;s talk
              </Button>
              <Button
                onClick={() => scrollToSection('portfolio')}
                variant="outline"
                className="rounded-full border-primary/50 bg-transparent px-7 py-6 text-base text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                View work
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: personalInfo.github, icon: Github, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-[#111]/80 text-primary transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] md:h-[430px] md:w-[430px]">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_20%,#ff8a1f,#f15c00)]" />
              <div className="absolute inset-5 overflow-hidden rounded-full border-2 border-primary/70 bg-[#0f0f0f] p-2">
                <img
                  src="/assets/my.png"
                  alt={`${personalInfo.name} portrait`}
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" subtitle="About" title="A developer focused on strong systems and clean interfaces">
        <Card className="border-primary/25 bg-card/70 shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-sm">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[2fr_1fr] md:p-10">
            <p className="text-base leading-8 text-foreground/80 md:text-lg">{personalInfo.about}</p>
            <div className="space-y-3 rounded-xl border border-primary/20 bg-[#101010]/70 p-5">
              <h3 className="text-base font-semibold text-primary">Core focus</h3>
              <p className="text-sm text-foreground/75">Java backend systems, data modeling, full-stack problem solving, and product-grade web experiences.</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="services" subtitle="Services" title="What I can build for you">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category} className="group border-primary/20 bg-card/70 transition hover:-translate-y-1 hover:border-primary/60">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {skillGroup.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="portfolio" subtitle="Portfolio" title="Selected projects">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="group h-full border-primary/20 bg-card/70 transition hover:border-primary/60">
              <CardHeader>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                  <a
                    href={project.link}
                    target={project.link !== '#' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-primary/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Open <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-primary">
                  {project.category}
                </p>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 text-base leading-7 text-foreground/80">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-border bg-[#121212] px-3 py-1 text-xs text-foreground/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contact" subtitle="Contact" title="Let’s build something useful together">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-primary/20 bg-card/70">
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-card/70">
            <CardContent className="space-y-6 p-6 md:p-8">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Direct links</h3>
                <p className="text-sm leading-7 text-foreground/75">
                  Reach me by email or connect on GitHub and LinkedIn. I usually reply with implementation details and timeline quickly.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { href: `mailto:${personalInfo.email}`, label: personalInfo.email },
                  { href: personalInfo.github, label: 'GitHub Profile' },
                  { href: personalInfo.linkedin, label: 'LinkedIn Profile' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="block rounded-lg border border-primary/20 bg-[#121212]/80 px-4 py-3 text-sm text-foreground/85 transition hover:border-primary/60 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <footer className="border-t border-primary/20 px-6 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
