"use client";

import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  subtitle: string;
  badge: string;
  children: React.ReactNode;
}

export default function ToolLayout({ title, subtitle, badge, children }: ToolLayoutProps) {
  return (
    <div className="page-bg min-h-screen flex flex-col items-center">
      <div className="top-bar w-full" />

      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#C8A55A]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[520px] px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/30 transition-all duration-300 hover:border-[#C8A55A]/25 hover:text-[#C8A55A]/70 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[18px] font-semibold text-white/95 truncate tracking-tight">{title}</h1>
              <span className="shrink-0 text-[8px] font-bold uppercase tracking-[0.15em] text-[#C8A55A]/60 bg-[#C8A55A]/8 px-2 py-0.5 rounded border border-[#C8A55A]/10">
                {badge}
              </span>
            </div>
            <p className="text-[11px] text-white/30 truncate tracking-wide mt-0.5 font-light">{subtitle}</p>
          </div>
        </div>

        {/* Decorative line under header */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A55A]/20 to-transparent mb-8" />

        {/* Content */}
        {children}

        {/* Footer CTA */}
        <div className="mt-12">
          <div className="glass-card rounded-3xl p-7 text-center"
            style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.2), 0 0 60px rgba(200,165,90,0.04)' }}>
            <p className="text-[13px] text-white/35 mb-5 font-light leading-relaxed">
              Хочешь глубже? Карина лично разберёт твой проект
            </p>
            <a
              href="https://t.me/KARINA_ProZAPUSKI?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep inline-flex items-center gap-2.5 h-[48px] px-7 rounded-2xl bg-gradient-to-r from-[#C8A55A] to-[#E8D48A] text-[13px] font-bold text-[#0A0A0A] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,165,90,0.35)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Написать Карине
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
