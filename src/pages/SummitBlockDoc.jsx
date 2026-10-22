import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  GithubLogo,
  ShieldCheck,
  Lightning,
  EyeSlash,
  CursorClick,
  PauseCircle,
  ChartBar,
  FloppyDisk,
  Check,
  Copy,
  MagnifyingGlass,
  BookOpen,
  Cpu,
  Lock,
  Browsers,
  TerminalWindow,
  WarningCircle,
  FileCode,
  Heart,
  Coffee,
  List,
  X,
  CaretRight,
  Sparkle,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

// Quick copy snippet component with visual feedback
const CodeBlock = ({ code, language = 'bash', caption = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 rounded-xl border border-white/10 bg-[#09090B]/90 overflow-hidden shadow-2xl backdrop-blur-xl">
      {caption && (
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2 bg-white/[0.02]">
          <span className="font-mono text-xs text-foreground/60">{caption}</span>
          <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">{language}</span>
        </div>
      )}
      <div className="relative p-4 overflow-x-auto font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed">
        <pre className="pr-12">{code}</pre>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-mono text-foreground/80 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all active:scale-95 shadow-md"
          title="Copy code to clipboard"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check weight="bold" className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-300">Copied</span>
            </>
          ) : (
            <>
              <Copy weight="bold" className="h-3.5 w-3.5 text-foreground/60 group-hover:text-white" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Alert callout box component
const Callout = ({ type = 'note', title, children }) => {
  const styles = {
    note: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-950/20',
      icon: 'text-blue-400',
      title: 'text-blue-300',
    },
    tip: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/20',
      icon: 'text-emerald-400',
      title: 'text-emerald-300',
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-950/20',
      icon: 'text-amber-400',
      title: 'text-amber-300',
    },
    important: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-950/20',
      icon: 'text-purple-400',
      title: 'text-purple-300',
    },
  }[type] || {
    border: 'border-white/10',
    bg: 'bg-white/[0.02]',
    icon: 'text-foreground/80',
    title: 'text-foreground',
  };

  return (
    <div className={`my-4 rounded-xl border ${styles.border} ${styles.bg} p-4 sm:p-5 backdrop-blur-md`}>
      <div className="flex items-start gap-3">
        <Sparkle weight="bold" className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`} />
        <div className="space-y-1 text-xs sm:text-sm text-foreground/80 leading-relaxed">
          {title && <div className={`font-semibold tracking-tight ${styles.title}`}>{title}</div>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default function SummitBlockDoc() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [browserTab, setBrowserTab] = useState('chrome');

  useEffect(() => {
    document.title = 'Summit Block — Documentation | Aravinda Amarasingha';
    window.scrollTo(0, 0);
  }, []);

  // Table of contents definitions
  const sections = [
    { id: 'overview', title: 'Overview & Highlights', icon: ShieldCheck },
    { id: 'why-summit', title: 'Key Capabilities', icon: Lightning },
    { id: 'installation', title: 'Quick Start & Activation', icon: Browsers },
    { id: 'architecture', title: 'Architecture & Engine', icon: Cpu },
    { id: 'filters', title: 'Writing & Adding Filters', icon: FileCode },
    { id: 'developer', title: 'Developer Commands', icon: TerminalWindow },
    { id: 'privacy', title: 'Privacy Policy & Zero Telemetry', icon: Lock },
    { id: 'store-listing', title: 'Chrome Web Store Kit', icon: BookOpen },
    { id: 'faq', title: 'FAQ & Limitations', icon: WarningCircle },
    { id: 'support', title: 'Support & Contributing', icon: Heart },
  ];

  // Active section scrollspy tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    return sections.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sections]);

  return (
    <div className="min-h-screen bg-[#09090B] text-foreground font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Ambient background glow accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 h-[35rem] w-[35rem] rounded-full bg-emerald-600/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 h-[40rem] w-[40rem] rounded-full bg-emerald-600/[0.03] blur-[140px]" />
      </div>

      {/* Top Fixed Header with Breadcrumbs & Actions */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090B]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/70 hover:text-white transition-colors group"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] group-hover:border-white/20 transition-all">
                <ArrowLeft weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              </div>
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <span className="text-white/20">/</span>

            <div className="flex items-center gap-2">
              <img
                src="/assets/summit-block/icon-128.png"
                alt="Summit Block Icon"
                className="h-6 w-6 rounded-md shadow-sm"
              />
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight">
                Summit Block
              </span>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                Docs v1.0
              </span>
            </div>
          </div>

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/AmareDev2k/summit-block"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all"
            >
              <GithubLogo weight="bold" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">GitHub Repository</span>
              <ArrowUpRight weight="bold" className="h-3 w-3 text-white/40" />
            </a>

            <button
              type="button"
              onClick={() => scrollTo('installation')}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black px-3.5 py-1.5 text-xs font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
            >
              <span>Install Extension</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/[0.04] text-foreground/80 hover:text-white"
              aria-label="Toggle Navigation Table of Contents"
            >
              {mobileMenuOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/[0.08] bg-[#09090B]/95 backdrop-blur-2xl px-4 py-4 overflow-hidden"
            >
              <div className="space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'text-foreground/70 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <Icon weight="bold" className="h-4 w-4 shrink-0" />
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Documentation Grid Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Left Sidebar: Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            {/* Quick Section Search */}
            <div className="relative">
              <MagnifyingGlass weight="bold" className="absolute left-3 top-2.5 h-4 w-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all backdrop-blur-md"
              />
            </div>

            {/* Navigation links */}
            <nav className="space-y-1 pr-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/40 px-3 mb-2">
                Documentation Index
              </div>
              {filteredSections.map((s) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'text-foreground/70 hover:bg-white/[0.04] hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        weight="bold"
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-emerald-400' : 'text-foreground/40 group-hover:text-foreground/70'
                        }`}
                      />
                      <span className="truncate">{s.title}</span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Community Links in Sidebar */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <a
                href="https://buymeacoffee.com/supunaravid"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] text-xs font-medium text-yellow-300 hover:bg-yellow-500/10 transition-all"
              >
                <Coffee weight="bold" className="h-4 w-4" />
                <span>Buy Me a Coffee</span>
              </a>
              <a
                href="https://www.patreon.com/cw/aravinda_dev2004/membership"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-xs font-medium text-red-300 hover:bg-red-500/10 transition-all"
              >
                <Heart weight="bold" className="h-4 w-4" />
                <span>Support on Patreon</span>
              </a>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-9 space-y-16 pb-24">
            {/* 1. OVERVIEW & HERO SECTION */}
            <section id="overview" className="scroll-mt-28 space-y-6">
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Manifest V3 Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] text-cyan-300">
                    Chrome 114+ & Chromium
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-foreground/80">
                    MIT Open Source
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-emerald-400">
                    Zero Data Collected
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl border border-white/15 bg-black/60 p-2 shadow-2xl flex items-center justify-center">
                    <img
                      src="/assets/summit-block/icon-512.png"
                      alt="Summit Block Icon"
                      className="h-full w-full object-contain drop-shadow"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                      Summit Block
                    </h1>
                    <p className="text-sm sm:text-base text-foreground/70 mt-1">
                      Reach the summit of a cleaner, faster, private web.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm sm:text-base leading-relaxed text-foreground/85 max-w-3xl">
                  Summit Block is a high-speed, private, open-source ad and tracker blocker engineered specifically for
                  Google Chrome and modern Chromium browsers. Built on <strong>Manifest V3</strong>, it operates directly
                  inside Chrome's native declarative filtering engine — offering near-zero latency, robust privacy guarantees,
                  and zero background data harvesting.
                </p>

                {/* Primary Quick CTA buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo('installation')}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 text-sm font-semibold shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all active:scale-95"
                  >
                    <Browsers weight="bold" className="h-4 w-4" />
                    <span>Get Started & Install</span>
                  </button>
                  <a
                    href="https://github.com/AmareDev2k/summit-block"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white px-5 py-3 text-sm font-medium transition-all"
                  >
                    <GithubLogo weight="bold" className="h-4 w-4" />
                    <span>Source on GitHub</span>
                    <ArrowUpRight weight="bold" className="h-3.5 w-3.5 text-white/40" />
                  </a>
                </div>
              </div>
            </section>

            {/* 2. KEY CAPABILITIES & WHY SUMMIT BLOCK */}
            <section id="why-summit" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Lightning weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Key Capabilities</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Engineered with modern browser primitives for raw speed, clean pages, and uncompromising privacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Lightning,
                    title: 'Native Speed (declarativeNetRequest)',
                    desc: "Matching and blocking execute inside Chrome's native C++ engine. No JavaScript code in the critical request path, eliminating page lag and battery drain.",
                  },
                  {
                    icon: Lock,
                    title: 'Private by Design (Zero Telemetry)',
                    desc: 'No analytics, no remote telemetry, no external rule downloads, and no accounts. Settings and stats never leave your local browser machine.',
                  },
                  {
                    icon: EyeSlash,
                    title: 'Cosmetic Filter Engine',
                    desc: 'Hides empty containers, banners, and placeholders left behind by blocked network requests using clean, isolated CSS injection at document start.',
                  },
                  {
                    icon: CursorClick,
                    title: 'Point-and-Click Element Picker',
                    desc: 'Click on any stubborn annoyance or banner on any website to permanently hide it forever without writing manual CSS selectors.',
                  },
                  {
                    icon: PauseCircle,
                    title: 'Instant Per-Site Pause',
                    desc: 'A single toggle switch in the toolbar popup pauses blocking on trusted sites or sites that misbehave, reloading seamlessly with rules bypassed.',
                  },
                  {
                    icon: ChartBar,
                    title: 'Live Counters & Toolbar Badge',
                    desc: 'Real-time badge counter on the browser toolbar icon displays exactly how many tracking and ad requests were prevented on the active tab.',
                  },
                  {
                    icon: FloppyDisk,
                    title: 'Sanitized Backup & Restore',
                    desc: 'Export your allowlists, custom domain rules, and hidden selectors to JSON anytime, with automatic schema sanitization on import.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Store & Enterprise Ready',
                    desc: 'Includes full single-purpose statements, permission justification tables, and pre-packaged production build scripts.',
                  },
                ].map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={i}
                      className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-emerald-400 group-hover:scale-105 transition-transform">
                          <Icon weight="bold" className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-semibold text-white tracking-tight">{cap.title}</h3>
                          <p className="text-xs leading-relaxed text-foreground/70">{cap.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. INSTALLATION & BROWSER ACTIVATION GUIDE */}
            <section id="installation" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Browsers weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Quick Start & Browser Activation</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Step-by-step developer installation guide for Google Chrome, Brave Browser, Microsoft Edge, and Opera.
                </p>
              </div>

              {/* Browser selector tabs */}
              <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-3">
                {[
                  { id: 'chrome', name: 'Google Chrome', uri: 'chrome://extensions' },
                  { id: 'brave', name: 'Brave Browser', uri: 'brave://extensions' },
                  { id: 'edge', name: 'Microsoft Edge', uri: 'edge://extensions' },
                  { id: 'chromium', name: 'Other Chromium (Opera, Vivaldi)', uri: 'chrome://extensions' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setBrowserTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      browserTab === tab.id
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-foreground/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* 4-Step Walkthrough Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Step 1 */}
                  <div className="space-y-2 p-4 rounded-xl border border-white/[0.06] bg-black/40">
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[11px]">1</span>
                      <span>Unpack the Repository</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      Download or clone the repository to your computer. The folder containing <code>manifest.json</code> is the root extension directory.
                    </p>
                    <CodeBlock code="git clone https://github.com/AmareDev2k/summit-block.git" language="bash" />
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-2 p-4 rounded-xl border border-white/[0.06] bg-black/40">
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[11px]">2</span>
                      <span>Navigate to Extensions</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      Open a new browser tab and navigate to the extensions manager page for your browser:
                    </p>
                    <CodeBlock
                      code={
                        browserTab === 'edge'
                          ? 'edge://extensions'
                          : browserTab === 'brave'
                          ? 'brave://extensions'
                          : 'chrome://extensions'
                      }
                      language="url"
                      caption="Paste in address bar"
                    />
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-2 p-4 rounded-xl border border-white/[0.06] bg-black/40">
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[11px]">3</span>
                      <span>Enable Developer Mode</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      Locate the <strong>Developer mode</strong> toggle switch in the top-right corner of the extensions page and turn it <strong>ON</strong>.
                    </p>
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-[11px] font-mono text-foreground/60 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Developer Mode: Enabled (Top Right)</span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-2 p-4 rounded-xl border border-white/[0.06] bg-black/40">
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[11px]">4</span>
                      <span>Load Unpacked & Pin</span>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      Click the <strong>Load unpacked</strong> button on the top-left, select the folder containing <code>manifest.json</code>, then pin the ⛰️ icon in your toolbar.
                    </p>
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-[11px] font-mono text-foreground/60 flex items-center gap-2">
                      <Check weight="bold" className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Extension active & counting blocks</span>
                    </div>
                  </div>
                </div>

                {/* Verification checklist */}
                <div className="border-t border-white/[0.08] pt-4 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    How to verify it is working:
                  </h4>
                  <ul className="space-y-2 text-xs text-foreground/75">
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Visit a content or news website; click the ⛰️ icon to watch the <em>blocked on this page</em> counter increment in real-time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Open Chrome DevTools (<code>F12</code>) → <strong>Network</strong> tab: blocked ad and tracker requests appear highlighted in red with status <code>net::ERR_BLOCKED_BY_CLIENT</code>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Flip the site switch off in the toolbar popup: the active page reloads with blocking paused.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Troubleshooting table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.03] text-foreground/60 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Troubleshooting Issue</th>
                      <th className="p-3.5">Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-foreground/80">
                    <tr>
                      <td className="p-3.5 font-medium text-white">"Manifest file is missing or unreadable"</td>
                      <td className="p-3.5">You selected a parent directory. Choose the exact folder containing <code>manifest.json</code>.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-white">Counter stays at 0</td>
                      <td className="p-3.5">Reload the web page tab after installing; blocking counters activate upon new network requests.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-white">Rule syntax error on load</td>
                      <td className="p-3.5">Execute <code>python3 scripts/validate.py</code> to test static ruleset schemas and path integrity.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-white">A specific website layout breaks</td>
                      <td className="p-3.5">Flip the site toggle off in the popup to pause blocking on that domain, or add it to Options → Allowlist.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. ARCHITECTURE & SYSTEM BLUEPRINT */}
            <section id="architecture" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Cpu weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Architecture & System Blueprint</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Component separation, single reactive data path, and Manifest V3 security sandboxing.
                </p>
              </div>

              {/* Interactive Architecture Flow Diagram */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/80 to-[#0e1017] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Runtime Data Flow & Execution Pipeline
                  </span>
                  <span className="font-mono text-[11px] text-foreground/40">Manifest V3 DNR Stack</span>
                </div>

                {/* Visual Pipeline Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-foreground/40">Layer 1</div>
                    <div className="text-xs font-semibold text-white">Web Page</div>
                    <p className="text-[11px] text-foreground/70">Origin page triggers HTTP request & DOM rendering.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-emerald-400">Layer 2 • Native Engine</div>
                    <div className="text-xs font-semibold text-emerald-200">Chrome DNR Engine</div>
                    <p className="text-[11px] text-foreground/70">Native C++ match against static rulesets (ads, trackers, malware).</p>
                  </div>
                  <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-cyan-400">Layer 3 • Content Script</div>
                    <div className="text-xs font-semibold text-cyan-200">Cosmetic Clean-Up</div>
                    <p className="text-[11px] text-foreground/70">Injects CSS stylesheet at document_start to collapse empty ad boxes.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-purple-400">Layer 4 • Background</div>
                    <div className="text-xs font-semibold text-purple-200">Service Worker</div>
                    <p className="text-[11px] text-foreground/70">Stateless listener for storage changes, badge counters, and menus.</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs text-foreground/75 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Single Reactive Path:</span> The UI (popup/options) only writes to <code>chrome.storage.local</code>. The Service Worker reacts automatically via <code>chrome.storage.onChanged</code>, synchronizing declarativeNetRequest dynamic rules and cosmetic stylesheets without state discrepancies.
                </div>
              </div>

              {/* Component breakdown table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.03] text-foreground/60 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Component</th>
                      <th className="p-3.5">File Location</th>
                      <th className="p-3.5">Context</th>
                      <th className="p-3.5">Core Responsibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-foreground/80 font-mono">
                    <tr>
                      <td className="p-3.5 text-white font-sans font-medium">Service Worker</td>
                      <td className="p-3.5 text-emerald-400">src/background/service-worker.js</td>
                      <td className="p-3.5 text-foreground/60">Background worker</td>
                      <td className="p-3.5 font-sans">Orchestrates rule syncing, context menus, icon badge counters.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white font-sans font-medium">Rule Sync Engine</td>
                      <td className="p-3.5 text-emerald-400">src/background/rules.js</td>
                      <td className="p-3.5 text-foreground/60">Background worker</td>
                      <td className="p-3.5 font-sans">Compiles dynamic allowlists & custom blocked domains into DNR rules.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white font-sans font-medium">Cosmetic Engine</td>
                      <td className="p-3.5 text-emerald-400">src/content/cosmetic.js</td>
                      <td className="p-3.5 text-foreground/60">All frames, document_start</td>
                      <td className="p-3.5 font-sans">Injects CSS stylesheets hiding ad slots, banners, and leftovers.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white font-sans font-medium">Element Picker</td>
                      <td className="p-3.5 text-emerald-400">src/content/picker.js</td>
                      <td className="p-3.5 text-foreground/60">On-demand</td>
                      <td className="p-3.5 font-sans">Interactive UI allowing users to point-and-click to generate CSS selectors.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white font-sans font-medium">YouTube Skipper</td>
                      <td className="p-3.5 text-emerald-400">src/content/youtube.js</td>
                      <td className="p-3.5 text-foreground/60">youtube.com</td>
                      <td className="p-3.5 font-sans">Optional fast-forward ad skipper (disabled by default).</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Security & Sandboxing guarantees */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Security & Sandboxing Decisions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-foreground/75">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="font-semibold text-white block mb-1">Sanitized Settings Input</span>
                    All reads and JSON imports pass through <code>sanitizeSettings()</code> to enforce strict schemas and prevent prototype pollution.
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="font-semibold text-white block mb-1">CSS Selector Validation</span>
                    User-picked selectors are strictly length-limited and pre-validated with <code>document.querySelector</code> before style tag insertion.
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="font-semibold text-white block mb-1">Origin Derivation</span>
                    Host origins for allowlisting are derived from <code>sender.tab.url</code> in the secure background context, never trusted from message payloads.
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="font-semibold text-white block mb-1">Zero Remote Code</span>
                    Default extension Content Security Policy (CSP). No <code>eval()</code>, no <code>new Function()</code>, no remote JavaScript bundles.
                  </div>
                </div>
              </div>
            </section>

            {/* 5. WRITING & ADDING FILTERS */}
            <section id="filters" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <FileCode weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Writing & Customizing Filters</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  How to extend network rules and cosmetic selectors in plain text.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Network Filters Syntax (<code>filters/*.txt</code>)</h3>
                <p className="text-xs text-foreground/70">
                  Network lists are stored as human-editable text files in the <code>filters/</code> folder. The compiler converts them into declarative rulesets.
                </p>

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-white/10 bg-white/[0.03] text-foreground/60 uppercase">
                      <tr>
                        <th className="p-3">Syntax Rule</th>
                        <th className="p-3 font-sans">Meaning & Matching Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-foreground/80">
                      <tr>
                        <td className="p-3 text-emerald-300">||example.com^</td>
                        <td className="p-3 font-sans">Blocks <code>example.com</code> and all its subdomains across any resource type.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-emerald-300">||example.net^$third-party</td>
                        <td className="p-3 font-sans">Blocks the domain only when requested as a third-party resource from other sites.</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-emerald-300">||example.org/ads/</td>
                        <td className="p-3 font-sans">Blocks URLs matching the path prefix (supports wildcards <code>*</code>).</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-foreground/50">! Comment or note</td>
                        <td className="p-3 font-sans text-foreground/50">Lines starting with <code>!</code> or <code>#</code> are comments.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-semibold text-white pt-4">Cosmetic Filters (<code>src/data/cosmetic-filters.json</code>)</h3>
                <CodeBlock
                  code={`{
  "generic": [".adsbygoogle", "[id^='div-gpt-ad']", ".advertisement"],
  "sites": {
    "news.example.com": ["#top-sponsored-banner", ".outbrain-widget"]
  },
  "annoyances": [".cookie-modal-backdrop", ".newsletter-popup"]
}`}
                  language="json"
                  caption="Cosmetic Selector Configuration"
                />

                <Callout type="tip" title="Rules of Thumb for Filter Authors">
                  Always prefer bare domain matching over complex URL regex patterns for maximal DNR engine performance. Top-level page navigation (<code>main_frame</code>) is protected by design so mistyped rules can never cause an entire website to become unreachable.
                </Callout>
              </div>
            </section>

            {/* 6. DEVELOPER COMMANDS */}
            <section id="developer" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <TerminalWindow weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Developer Commands & Build Automation</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Automated Python and Bash scripts to build rulesets, run validation, execute unit tests, and package zip files.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">1. Compile filter lists into DeclarativeNetRequest JSON</div>
                  <CodeBlock
                    code="python3 scripts/build-rules.py"
                    caption="Compiles filters/*.txt into static rulesets in src/rules/"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">2. Validate Manifest, rulesets, and legal notices</div>
                  <CodeBlock
                    code="python3 scripts/validate.py"
                    caption="Checks JSON schemas, path references, and license files"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">3. Run unit test suite</div>
                  <CodeBlock
                    code="npm test"
                    caption="Runs Node.js and Python test runners for rule logic & storage sanitizers"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">4. Generate production package for Chrome Web Store</div>
                  <CodeBlock
                    code="bash scripts/package.sh"
                    caption="Creates store-ready archive in dist/summit-block-v1.0.0.zip"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white">5. Personalize publisher metadata</div>
                  <CodeBlock
                    code="python3 scripts/personalize.py --email supunaravinda2004@gmail.com --github AmareDev2k"
                    caption="Replaces placeholder emails and repository handles across manifest and docs"
                  />
                </div>
              </div>
            </section>

            {/* 7. PRIVACY POLICY & ZERO TELEMETRY */}
            <section id="privacy" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Lock weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Privacy Policy & Zero-Telemetry Disclosure</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Full disclosure of local data storage, Chrome permissions justifications, and data privacy principles.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-300">
                  <ShieldCheck weight="bold" className="h-5 w-5 text-emerald-400" />
                  <span>Core Privacy Guarantees</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>No personal data collected or transmitted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Zero analytics, telemetry, or crash trackers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>No external server or remote network calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check weight="bold" className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>No user accounts or cloud tracking IDs</span>
                  </div>
                </div>
              </div>

              {/* Permissions Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Browser Permission Justifications</h3>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-white/10 bg-white/[0.03] text-foreground/60 uppercase">
                      <tr>
                        <th className="p-3.5">Permission Key</th>
                        <th className="p-3.5 font-sans">Single-Purpose Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-foreground/80">
                      <tr>
                        <td className="p-3.5 text-emerald-300">declarativeNetRequest</td>
                        <td className="p-3.5 font-sans">Blocks requests matching bundled static rules and user allowlists natively inside Chrome.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-emerald-300">webRequest (read-only)</td>
                        <td className="p-3.5 font-sans">Listens only to <code>onErrorOccurred</code> to increment the numerical counter when a request is cancelled. URLs are never stored.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-emerald-300">storage</td>
                        <td className="p-3.5 font-sans">Saves user toggles, allowlisted domains, custom rules, and counters locally in <code>chrome.storage.local</code>.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-emerald-300">scripting</td>
                        <td className="p-3.5 font-sans">Temporarily injects the interactive element picker on the current tab only when explicitly clicked by the user.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-emerald-300">contextMenus</td>
                        <td className="p-3.5 font-sans">Adds right-click shortcuts for "Block an element on this page" and "Pause on this site".</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-emerald-300">host permissions (&lt;all_urls&gt;)</td>
                        <td className="p-3.5 font-sans">Required so the cosmetic stylesheet can hide ad boxes and pause blocking across arbitrary websites visited.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 8. CHROME WEB STORE LISTING KIT */}
            <section id="store-listing" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <BookOpen weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Chrome Web Store Listing Kit</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Metadata and copy prepared for submission to the Chrome Web Store Developer Dashboard.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <span className="font-mono text-xs uppercase text-foreground/50">Extension Name</span>
                  <div className="text-sm font-semibold text-white">Summit Block – Ad & Tracker Blocker</div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <span className="font-mono text-xs uppercase text-foreground/50">Short Description (≤132 chars)</span>
                  <div className="text-xs font-mono text-emerald-300">
                    Fast, private, open-source ad and tracker blocker. No data collection. Built on Manifest V3.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <span className="font-mono text-xs uppercase text-foreground/50">Single-Purpose Statement</span>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Block advertisements, trackers and malicious resources on web pages and let the user control that blocking locally.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                  <span className="font-mono text-xs uppercase text-foreground/50">Store Category</span>
                  <div className="text-xs text-foreground/80">Productivity (or Privacy & Security)</div>
                </div>
              </div>
            </section>

            {/* 9. FAQ & LIMITATIONS */}
            <section id="faq" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <WarningCircle weight="bold" className="h-6 w-6 text-emerald-400" />
                  <span>Frequently Asked Questions & Honest Limitations</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Everything you should know about performance, capabilities, and Manifest V3 constraints.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: 'Will Summit Block slow my browser down?',
                    a: "No. Matching occurs in Chrome's native Declarative Net Request engine before JavaScript execution. The cosmetic content script injects a single lightweight stylesheet at document start, which is significantly faster than legacy MV2 blockers.",
                  },
                  {
                    q: 'A website is broken or refuses to load content — what should I do?',
                    a: 'Open the toolbar popup and toggle the active site switch OFF (or enter its domain in Options → Allowlist). The site will reload immediately with blocking bypassed. You can also file a filter issue on GitHub.',
                  },
                  {
                    q: 'Does hiding cookie banners automatically consent to cookies?',
                    a: 'No. The "Hide annoyances" feature only visually collapses the modal popup dialog. The website retains its default consent behavior without granting additional cookie tracking rights.',
                  },
                  {
                    q: 'What are the technical limitations under Manifest V3?',
                    a: 'Manifest V3 prohibits arbitrary code execution and runtime response stream rewriting. Therefore, server-side injected inline ads and certain first-party tracking scripts cannot be filtered dynamically without static rule updates.',
                  },
                  {
                    q: 'Is the YouTube ad skipper guaranteed to work indefinitely?',
                    a: 'YouTube frequently alters its internal player class names and playback state machines. As such, the YouTube skipper is experimental and switched OFF by default.',
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs transition-all open:bg-white/[0.04] open:border-emerald-500/30"
                  >
                    <summary className="cursor-pointer font-semibold text-white list-none flex items-center justify-between gap-3">
                      <span>{item.q}</span>
                      <CaretRight
                        weight="bold"
                        className="h-4 w-4 shrink-0 text-foreground/40 transition-transform group-open:rotate-90 group-open:text-emerald-400"
                      />
                    </summary>
                    <p className="mt-3 text-foreground/75 leading-relaxed pt-2 border-t border-white/[0.06]">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 10. SUPPORT & OPEN SOURCE */}
            <section id="support" className="scroll-mt-28 space-y-6">
              <div className="border-b border-white/[0.08] pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Heart weight="bold" className="h-6 w-6 text-red-400" />
                  <span>Support & Open Source Contribution</span>
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                  Summit Block is proudly free and open-source under the MIT license.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.01] p-6 sm:p-8 space-y-6">
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  If Summit Block saves you bandwidth, stops unwanted trackers, or improves your daily web browsing experience,
                  consider supporting its ongoing open-source development:
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://buymeacoffee.com/supunaravid"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ffdd00] hover:bg-[#ffe333] text-black px-4 py-2.5 text-xs font-semibold shadow-lg transition-all active:scale-95"
                  >
                    <Coffee weight="bold" className="h-4 w-4" />
                    <span>Buy Me a Coffee</span>
                  </a>

                  <a
                    href="https://www.patreon.com/cw/aravinda_dev2004/membership"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F96854] hover:bg-[#ff7b68] text-white px-4 py-2.5 text-xs font-semibold shadow-lg transition-all active:scale-95"
                  >
                    <Heart weight="bold" className="h-4 w-4" />
                    <span>Join Patreon</span>
                  </a>

                  <a
                    href="https://github.com/AmareDev2k/summit-block"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white px-4 py-2.5 text-xs font-medium transition-all"
                  >
                    <GithubLogo weight="bold" className="h-4 w-4" />
                    <span>Star on GitHub</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-foreground/50">
                  <div>© 2026 Aravinda Amarasingha • Released under MIT License</div>
                  <Link to="/" className="hover:text-emerald-300 transition-colors">
                    ← Back to Portfolio
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
