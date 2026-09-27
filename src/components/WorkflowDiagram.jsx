import React from 'react';
import {
  GitBranch,
  Cpu,
  ShieldCheck,
  CheckCircle,
  Database,
  Lightning,
  ArrowRight,
  Sparkle
} from '@phosphor-icons/react';

export default function WorkflowDiagram() {
  return (
    <div className="w-full rounded-[2rem] bg-white/[0.02] p-1.5 ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background/90 p-6 sm:p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        
        {/* Subtle Ambient Glow Behind Diagram */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-[400px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />

        {/* Diagram Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-1">
              <Sparkle weight="fill" className="h-3.5 w-3.5 text-cyan-400" />
              <span>Architectural Execution Schematic</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              How I Move Fast: <span className="text-foreground/50">From Prompt to Verified Production</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Human-in-the-Loop Gateway</span>
          </div>
        </div>

        {/* Flow Diagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          
          {/* Stage 1: Problem Ingestion & Context */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-foreground/40">STEP 01</span>
                <span className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/80">
                  <GitBranch weight="duotone" className="h-4 w-4 text-cyan-400" />
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-foreground tracking-tight">
                Context &amp; Invariants
              </h4>
              <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed">
                Define functional limits, team constraints, and project boundaries before code generation.
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Scalability &amp; Latency Specs</span>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>1M Token Full-Repo Ingestion</span>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Relational Domain Models</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-foreground/40">
              <span>INPUT</span>
              <span className="text-cyan-400/90 font-medium">Gemini 3 Pro (1M)</span>
            </div>
          </div>

          {/* Stage 2: Parallel Model Exploration */}
          <div className="flex flex-col justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/[0.02] p-5 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-cyan-400/70">STEP 02</span>
                <span className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Cpu weight="duotone" className="h-4 w-4" />
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-foreground tracking-tight">
                Model-Specialized AI
              </h4>
              <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed">
                Task-matched frontier models explore alternatives and uncover subtle failure modes.
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-foreground/50 mb-0.5">
                    <span>Claude Opus</span>
                    <span className="text-cyan-400">Deep Reasoning</span>
                  </div>
                  <span className="text-foreground/80 font-medium">Architecture &amp; Edge Cases</span>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-foreground/50 mb-0.5">
                    <span>Claude Sonnet</span>
                    <span className="text-cyan-400">Schema Precision</span>
                  </div>
                  <span className="text-foreground/80 font-medium">Relational Database Design</span>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-foreground/50 mb-0.5">
                    <span>GitHub Copilot</span>
                    <span className="text-cyan-400">Speed Scaffolding</span>
                  </div>
                  <span className="text-foreground/80 font-medium">Rapid Boilerplate &amp; APIs</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[11px] font-mono text-foreground/40">
              <span>EXPLORATION</span>
              <span className="text-cyan-400 font-medium">2–3 Models Compared</span>
            </div>
          </div>

          {/* Stage 3: The Human Verification Gate (Highlight) */}
          <div className="flex flex-col justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] p-5 shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/[0.05]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-emerald-400/80">STEP 03 · THE GATE</span>
                <span className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck weight="duotone" className="h-4 w-4" />
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                <span>Human Validation</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </h4>
              <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed">
                Zero-trust policy: AI output is thoroughly audited before reaching the codebase.
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5 text-[11px] text-foreground/80 flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Trade-offs: Cost vs. Complexity</span>
                </div>
                <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5 text-[11px] text-foreground/80 flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Auth, RBAC &amp; Injection Audits</span>
                </div>
                <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5 text-[11px] text-foreground/80 flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Secrets Exposure Inspection</span>
                </div>
                <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5 text-[11px] text-foreground/80 flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>ADR Decision Records Drafted</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span>DECISION</span>
              <span className="font-semibold">Never Blindly Accepted</span>
            </div>
          </div>

          {/* Stage 4: Production Architecture */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-foreground/40">STEP 04</span>
                <span className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/80">
                  <Database weight="duotone" className="h-4 w-4 text-emerald-400" />
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-foreground tracking-tight">
                Production Release
              </h4>
              <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed">
                Rock-solid, maintainable backend systems engineered with clean design patterns.
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Java 17 / Spring Boot Architecture</span>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Layered MVC &amp; DAO Separation</span>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-foreground/75 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Hardened Relational MySQL Schema</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-foreground/40">
              <span>OUTPUT</span>
              <span className="text-emerald-400 font-medium">Verified &amp; Deployed</span>
            </div>
          </div>

        </div>

        {/* Diagram Footer: The Core Principle */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-foreground/70">
              <strong className="text-foreground font-semibold">Core Principle:</strong> AI accelerates options; engineering verifies reality. Every architectural proposal undergoes manual stress testing.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-foreground/40 shrink-0">
            <span>VELOCITY</span>
            <ArrowRight weight="bold" className="h-3 w-3 text-cyan-400" />
            <span>DISCIPLINE</span>
            <ArrowRight weight="bold" className="h-3 w-3 text-emerald-400" />
            <span>QUALITY</span>
          </div>
        </div>

      </div>
    </div>
  );
}
