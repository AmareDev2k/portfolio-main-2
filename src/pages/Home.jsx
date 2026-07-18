import React, { useState } from 'react';
import { Code2, Database, Server, Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, Terminal } from 'lucide-react';
import { projects, skills, personalInfo } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ContactForm from '../components/ContactForm';
import { ThemeToggle } from '../components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className={`py-24 px-6 relative z-10 ${className}`}
  >
    {children}
  </motion.section>
);

const Home = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-retro selection:bg-primary selection:text-background relative overflow-hidden">
      
      {/* Retro Overlay Effects */}
      <div className="crt-overlay crt-flicker"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 border-b-2 border-primary/50 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-2 border-2 border-primary bg-background neon-box-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Terminal className="w-5 h-5 text-primary group-hover:text-background" />
              </div>
              <span className="text-xl font-bold text-primary neon-text-primary tracking-widest uppercase">
                >_ {personalInfo.name || 'SYS.OP'}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-foreground hover:text-primary capitalize transition-all duration-200 hover:neon-text-primary text-lg tracking-wider"
                >
                  [{item}]
                </button>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pt-4 pb-6 border-t-2 border-primary mt-4 space-y-2 bg-background"
              >
                {['about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left text-foreground hover:text-primary hover:bg-primary/10 capitalize transition-colors duration-200 px-4 py-3 border-l-4 border-transparent hover:border-primary uppercase tracking-widest"
                  >
                    > {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden bg-background">
        <div className="retro-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-background/80 border-2 border-primary p-8 md:p-12 neon-box-primary shadow-2xl relative"
          >
            {/* Retro decorative corner elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

            <div className="mb-6">
              <div className="inline-block bg-primary text-background font-bold px-4 py-1 mb-6 border-2 border-primary uppercase tracking-widest text-sm">
                SYSTEM STATUS: ONLINE
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-widest text-primary neon-text-primary uppercase">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-secondary neon-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto uppercase">
              >_ {personalInfo.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-6 text-lg rounded-none text-background bg-primary hover:bg-background hover:text-primary border-2 border-primary neon-box-primary transition-all uppercase tracking-widest"
              >
                [ EXECUTE PROJECTS ]
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="px-8 py-6 text-lg rounded-none hover:bg-secondary/20 transition-all border-2 border-secondary text-secondary hover:text-secondary hover:neon-box-secondary uppercase tracking-widest bg-transparent"
              >
                [ INIT CONTACT ]
              </Button>
            </div>
          </motion.div>

          <motion.button
            onClick={() => scrollToSection('about')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="mt-16 text-primary hover:text-secondary hover:neon-text-secondary transition-colors inline-block"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-secondary neon-text-secondary uppercase tracking-widest">
            // About_Me
          </h2>
          <Card className="bg-background border-2 border-secondary neon-box-secondary rounded-none">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl text-foreground leading-relaxed mb-8 font-retro">
                <span className="text-primary animate-pulse">> </span>
                {personalInfo.about}
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { icon: Terminal, label: "Software Engineer", color: "text-primary", border: "border-primary" },
                  { icon: Database, label: "Data Architect", color: "text-secondary", border: "border-secondary" },
                  { icon: Server, label: "Systems Admin", color: "text-accent", border: "border-accent" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-3 bg-background rounded-none px-4 py-3 border-2 ${item.border} transition-colors`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className={`text-foreground uppercase tracking-widest ${item.color}`}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary neon-text-primary uppercase tracking-widest">
            // Tech_Specs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full bg-background border-2 border-primary hover:neon-box-primary transition-all duration-300 rounded-none group"
                >
                  <CardHeader className="border-b-2 border-primary/30">
                    <CardTitle className="text-xl text-secondary uppercase tracking-widest group-hover:neon-text-secondary transition-all">
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, idx) => (
                         <span
                          key={idx}
                          className="px-3 py-1 bg-background border border-primary text-primary hover:bg-primary hover:text-background transition-colors uppercase text-sm font-bold tracking-widest cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-secondary neon-text-secondary uppercase tracking-widest">
            // Active_Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => setExpandedProject(project.id === expandedProject ? null : project.id)}
                className="cursor-pointer"
              >
                <Card
                  className={`bg-background border-2 transition-all duration-300 rounded-none group ${
                    expandedProject === project.id 
                      ? 'border-secondary neon-box-secondary' 
                      : 'border-primary hover:neon-box-primary'
                  }`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <CardHeader className="border-b-2 border-primary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors z-0"></div>
                    <div className="flex items-start justify-between relative z-10">
                      <CardTitle className="text-2xl text-primary group-hover:neon-text-primary transition-all uppercase tracking-widest">
                        > {project.title}
                      </CardTitle>
                      <ExternalLink
                        className={`w-6 h-6 text-secondary group-hover:neon-text-secondary transition-all duration-300 ${
                          hoveredProject === project.id ? 'translate-x-1 -translate-y-1' : ''
                        }`}
                      />
                    </div>
                    <Badge
                      variant="secondary"
                      className="w-fit mt-2 rounded-none bg-secondary/20 text-secondary border border-secondary uppercase"
                    >
                      {project.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardDescription className="text-foreground text-lg mb-4 leading-relaxed">
                      {project.description}
                    </CardDescription>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4"
                        >
                          <div className="p-4 bg-primary/10 border-l-4 border-primary mt-4">
                            <p className="text-sm text-foreground">
                              <span className="text-primary font-bold">LOG:</span> Advanced concepts in {project.category} implemented. Architecture scalable. All tests passing.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-background border border-secondary/50 text-secondary uppercase tracking-widest"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary neon-text-primary uppercase tracking-widest">
            // Establish_Link
          </h2>
          <Card className="bg-background border-2 border-primary neon-box-primary rounded-none">
            <CardContent className="p-8 md:p-12">
              <p className="text-xl text-foreground text-center mb-12 uppercase tracking-widest">
                AWAITING CONNECTIONS...
              </p>
              
              <div className="p-6 border-2 border-secondary bg-background mb-12">
                  <ContactForm />
              </div>

              <div className="mt-12 pt-8 border-t-2 border-primary">
                <p className="text-sm text-primary text-center mb-6 uppercase tracking-widest">EXTERNAL NETWORKS:</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {[
                    { href: personalInfo.github, icon: Github, label: "GitHub" },
                    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 bg-background border-2 border-secondary text-secondary hover:bg-secondary hover:text-background hover:neon-box-secondary px-6 py-4 transition-all duration-300 w-full md:w-auto justify-center uppercase font-bold tracking-widest"
                    >
                      <social.icon className="w-6 h-6" />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-2 border-primary bg-background relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-primary tracking-widest uppercase text-sm">
            SYSTEM.SHUTDOWN // © 2025 {personalInfo.name} // SYNTHWAVE_UI_ACTIVATED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;