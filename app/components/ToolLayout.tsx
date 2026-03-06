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

      <div className="relative z-10 w-full max-w-[520px] px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E8E2DA] bg-white text-[#8A8078] transition-all duration-300 hover:border-[#B08D3E]/30 hover:text-[#B08D3E] shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[18px] font-semibold text-[#191715] truncate tracking-tight">{title}</h1>
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-[#B08D3E] bg-[#F8F0DC] px-2 py-0.5 rounded-md">
                {badge}
              </span>
            </div>
            <p className="text-[12px] text-[#8A8078] truncate tracking-wide mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E8E2DA] mb-8" />

        {/* Content */}
        {children}

        {/* Footer CTA */}
        <div className="mt-12">
          <div className="glass-card rounded-2xl p-7 text-center">
            <p className="text-[14px] text-[#8A8078] mb-5 leading-relaxed">
              Хочешь глубже? Карина лично разберёт твой проект
            </p>
            <a
              href="https://t.me/KARINA_ProZAPUSKI?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep inline-flex items-center gap-2.5 h-[48px] px-7 rounded-full bg-[#191715] text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#2E2A25] hover:shadow-lg"
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
