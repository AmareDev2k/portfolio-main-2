import React, { useState } from 'react';
import {
  ArrowUpRight,
  GithubLogo,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react';

export default function ProjectCard({ project, indexStr, totalStr }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const [mainTitle, subTitle] = project.title.includes('—')
    ? project.title.split('—').map((s) => s.trim())
    : [project.title, null];

  return (
    <div
      className="group relative rounded-xl sm:rounded-2xl bg-white/[0.02] p-1 sm:p-1.5 ring-1 ring-white/[0.08] transition-all duration-500 hover:ring-white/20 hover:bg-white/[0.04] h-full flex flex-col"
      onClick={() => {
        // On mobile touch devices, clicking the card toggles the photo reveal
        if (project.image && typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
          setIsRevealed((prev) => !prev);
        }
      }}
    >
      {/* Subtle hover ambient bloom */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-white/[0.04] to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div
        className={`relative overflow-hidden rounded-[calc(0.75rem+0.125rem)] sm:rounded-[calc(1rem+0.125rem)] p-4 sm:p-6 md:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl h-full flex flex-col justify-between ${
          project.image ? 'border border-white/10' : 'bg-[#09090B]/95'
        }`}
      >
        {/* Background Project Screenshot that fits cleanly inside the component */}
        {project.image && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center p-3 sm:p-5">
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-contain rounded-lg transition-all duration-700 ease-vanguard ${
                isRevealed
                  ? 'scale-100 grayscale-0 blur-none opacity-100'
                  : 'scale-100 grayscale blur-md opacity-40 group-hover:scale-100 group-hover:grayscale-0 group-hover:blur-none group-hover:opacity-100'
              }`}
            />
            {/* Dark frosted overlay: visible at rest, smoothly fades away when revealed via hover or tap */}
            <div
              className={`absolute inset-0 bg-[#09090B]/60 transition-opacity duration-700 ease-vanguard ${
                isRevealed ? 'opacity-0' : 'group-hover:opacity-0'
              }`}
            />
            {/* Inset shadow highlight */}
            <div className="absolute inset-0 rounded-[calc(0.75rem+0.125rem)] sm:rounded-[calc(1rem+0.125rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
          </div>
        )}

        {/* Top ambient hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* Pop-up Action Button when cursor enters (or tapped on mobile) */}
        <div
          className={`absolute top-3 right-3 sm:top-5 sm:right-5 z-30 flex items-center gap-1.5 sm:gap-2 transition-all duration-500 ease-vanguard ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-75 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto'
          }`}
        >
          {/* Mobile: Toggle details back */}
          {project.image && isRevealed && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsRevealed(false);
              }}
              className="md:hidden inline-flex items-center gap-1 rounded-full bg-black/85 backdrop-blur-xl border border-white/20 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl active:scale-95"
              aria-label="Show project details"
            >
              <EyeSlash weight="bold" className="h-3.5 w-3.5 text-foreground/80" />
              <span>Details</span>
            </button>
          )}

          {/* View Source GitHub Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl pl-3 sm:pl-3.5 pr-1.5 py-1 text-xs font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/40 hover:bg-black hover:scale-105 active:scale-95"
          >
            <GithubLogo weight="bold" className="h-3.5 w-3.5 text-foreground/80 transition-colors group-hover/btn:text-white" />
            <span>View Source</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              <ArrowUpRight weight="bold" className="h-3 w-3" />
            </span>
          </a>
        </div>

        {/* Project Details Content Layer: Auto-hides on cursor hover or mobile tap, shows again when cursor leaves or toggled */}
        <div
          className={`relative z-10 transition-all duration-500 ease-vanguard flex flex-col justify-between h-full ${
            project.image
              ? isRevealed
                ? 'opacity-0 pointer-events-none translate-y-2'
                : 'group-hover:opacity-0 group-hover:pointer-events-none group-hover:translate-y-2'
              : ''
          }`}
        >
          {/* Top Content Block */}
          <div>
            {/* Header Row: Index & Category on left */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Project Index */}
                <span className="font-mono text-xs sm:text-xs font-medium tracking-widest text-foreground/50">
                  {indexStr} <span className="text-white/20">/</span> {totalStr}
                </span>

                <span className="h-3 w-px bg-white/10" />

                {/* Category Badge with glowing live node */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  <span>{project.category}</span>
                </div>

                {/* Mobile-only Quick Toggle to view Photo */}
                {project.image && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsRevealed(true);
                    }}
                    className="md:hidden inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-2 py-0.5 font-mono text-[9px] text-white/90 active:scale-95 transition-all"
                    aria-label="View photo preview"
                  >
                    <Eye weight="bold" className="h-3 w-3 text-emerald-400" />
                    <span>Photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Project Title & Identity */}
            <div className="mt-3 sm:mt-3.5">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-white flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors group/title"
                >
                  <span>{mainTitle}</span>
                  <ArrowUpRight weight="bold" className="h-3.5 w-3.5 text-foreground/40 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shrink-0" />
                </a>
                {subTitle && (
                  <span className="text-xs sm:text-sm font-normal text-foreground/45">
                    — {subTitle}
                  </span>
                )}
              </h3>

              {/* Description */}
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-foreground/70">
                {project.description}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills with Microdots */}
          <div className="mt-auto pt-3 sm:pt-3.5 border-t border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] text-foreground/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
                >
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
