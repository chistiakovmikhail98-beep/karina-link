"use client";

import { useEffect, useRef } from "react";

/* ───────────────── ICON COMPONENTS ───────────────── */

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function TargetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function CalcIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.498-6h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm2.504-6h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.498-6h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
    </svg>
  );
}

function ClipboardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
  );
}

function PenIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

function RocketIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

function ChevronIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function FireIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
  );
}

function UsersIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function HeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  );
}

/* ───────────────── TOOL CARD ───────────────── */

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  href: string;
  delay?: number;
}

function ToolCard({ icon, title, description, badge, href, delay = 0 }: ToolCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-[#C8A84E]/20 bg-[#142E22]/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[#C8A84E]/50 hover:bg-[#1B3C2D] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,168,78,0.1)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C8A84E]/10 text-[#C8A84E] transition-colors group-hover:bg-[#C8A84E]/20">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-white truncate">{title}</h3>
            <span className="shrink-0 inline-flex items-center rounded-full bg-[#C8A84E]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C8A84E]">
              {badge}
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">{description}</p>
        </div>
        <ChevronIcon className="w-5 h-5 text-white/20 shrink-0 mt-1 transition-all group-hover:text-[#C8A84E] group-hover:translate-x-1" />
      </div>
    </a>
  );
}

/* ───────────────── PROGRAM CARD ───────────────── */

interface ProgramCardProps {
  title: string;
  subtitle: string;
  features: string[];
  price: string;
  href: string;
  featured?: boolean;
}

function ProgramCard({ title, subtitle, features, price, href, featured = false }: ProgramCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02] ${
        featured
          ? "bg-gradient-to-b from-[#C8A84E] via-[#C8A84E]/40 to-[#C8A84E]/10"
          : "bg-gradient-to-b from-white/10 to-white/5"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C8A84E] px-3 py-1 text-xs font-bold text-[#142E22]">
            <FireIcon className="w-3 h-3" /> ХИТ
          </span>
        </div>
      )}
      <div className="rounded-2xl bg-[#142E22] p-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/50 mb-4">{subtitle}</p>
        <ul className="space-y-2 mb-5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="mt-0.5 text-[#C8A84E]">&#10003;</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#C8A84E]">{price}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              featured
                ? "bg-[#C8A84E] text-[#142E22] hover:bg-[#E8D5A0]"
                : "border border-[#C8A84E]/30 text-[#C8A84E] hover:bg-[#C8A84E]/10"
            }`}
          >
            Подробнее
            <ChevronIcon className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── STAT CARD ───────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold gold-shimmer">{value}</div>
      <div className="text-xs sm:text-sm text-white/50 mt-1">{label}</div>
    </div>
  );
}

/* ───────────────── MAIN PAGE ───────────────── */

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const TG_LINK = "https://t.me/KARINA_ProZAPUSKI";
  const CHANNEL_LINK = "https://t.me/dengi_na_expertnosti";

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* ─── GOLD TOP LINE ─── */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#C8A84E] to-transparent" />

      <div className="w-full max-w-md px-4 py-8 sm:px-6">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="flex flex-col items-center text-center mb-10 fade-in-up">
          {/* Avatar */}
          <div className="relative mb-5">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#C8A84E] to-[#E8D5A0] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#1B3C2D] flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-bold text-[#C8A84E]">KM</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#C8A84E] rounded-full flex items-center justify-center">
              <SparklesIcon className="w-4 h-4 text-[#142E22]" />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-white mb-1">Карина Мамедова</h1>
          <p className="text-[#C8A84E] font-medium text-sm mb-3">
            Продюсер &middot; Маркетолог &middot; Наставник
          </p>

          {/* Tagline */}
          <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-5">
            Помогаю экспертам превращать знания в деньги, а соцсети — в источник стабильного дохода.
            От самозапуска на 300K до системного бизнеса на 1+ млн.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 w-full max-w-xs">
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#C8A84E] py-3 text-sm font-bold text-[#142E22] transition-all hover:bg-[#E8D5A0] pulse-gold"
            >
              <TelegramIcon className="w-4 h-4" />
              Написать
            </a>
            <a
              href={CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#C8A84E]/30 py-3 text-sm font-semibold text-[#C8A84E] transition-all hover:bg-[#C8A84E]/10"
            >
              Канал
            </a>
          </div>
        </section>

        {/* ═══════════════════ STATS ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-[#C8A84E]/10 bg-[#142E22]/60 backdrop-blur-sm p-5">
            <StatCard value="7+" label="лет в онлайне" />
            <StatCard value="50+" label="ниш" />
            <StatCard value="40М" label="рек. оборот/мес" />
          </div>
        </section>

        {/* ═══════════════════ FREE AI TOOLS ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon className="w-5 h-5 text-[#C8A84E]" />
            <h2 className="text-lg font-bold text-white">Бесплатные AI-инструменты</h2>
          </div>
          <p className="text-sm text-white/50 mb-5">
            Попробуй прямо сейчас — получи персональный результат за 2 минуты
          </p>
          <div className="space-y-3">
            <ToolCard
              icon={<SparklesIcon className="w-6 h-6" />}
              title="Сканер суперсилы"
              description="Узнай свою уникальность как эксперта. AI проанализирует твой опыт и выдаст позиционирование"
              badge="AI"
              href={TG_LINK + "?text=%D0%A1%D0%BA%D0%B0%D0%BD%D0%B5%D1%80"}
              delay={0}
            />
            <ToolCard
              icon={<TargetIcon className="w-6 h-6" />}
              title="Аудит оффера"
              description="Вставь свой оффер — получи оценку по 5 критериям и 3 улучшенных варианта"
              badge="AI"
              href={TG_LINK + "?text=%D0%90%D1%83%D0%B4%D0%B8%D1%82+%D0%BE%D1%84%D1%84%D0%B5%D1%80%D0%B0"}
              delay={100}
            />
            <ToolCard
              icon={<CalcIcon className="w-6 h-6" />}
              title="Калькулятор запуска"
              description="Рассчитай прогноз выручки первого запуска за 60 секунд"
              badge="NEW"
              href={TG_LINK + "?text=%D0%9A%D0%B0%D0%BB%D1%8C%D0%BA%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80"}
              delay={200}
            />
            <ToolCard
              icon={<ClipboardIcon className="w-6 h-6" />}
              title="Диагностика эксперта"
              description="20 вопросов — и ты узнаешь, что именно мешает тебе зарабатывать. 4 типа проблем"
              badge="ТЕСТ"
              href={TG_LINK + "?text=%D0%94%D0%B8%D0%B0%D0%B3%D0%BD%D0%BE%D1%81%D1%82%D0%B8%D0%BA%D0%B0"}
              delay={300}
            />
            <ToolCard
              icon={<PenIcon className="w-6 h-6" />}
              title="Контент-план на 30 дней"
              description="Получи готовый план постов с заголовками, тезисами и CTA по твоей нише"
              badge="AI"
              href={TG_LINK + "?text=%D0%9A%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82+%D0%BF%D0%BB%D0%B0%D0%BD"}
              delay={400}
            />
          </div>
        </section>

        {/* ═══════════════════ PROGRAMS ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="flex items-center gap-2 mb-4">
            <RocketIcon className="w-5 h-5 text-[#C8A84E]" />
            <h2 className="text-lg font-bold text-white">Программы</h2>
          </div>
          <div className="space-y-4">
            <ProgramCard
              title="Распаковка суперсилы"
              subtitle="Индивидуальная сессия 3-4 часа в Zoom"
              features={[
                "Найдём твою уникальность и суперсилу",
                "Сформулируем позиционирование",
                "Определим 10+ тем для контента",
                "Разберём блоки и страхи",
              ]}
              price="от 5 000 ₽"
              href={TG_LINK + "?text=%D0%A0%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0"}
            />
            <ProgramCard
              title="Формула САМОзапуска"
              subtitle="6 модулей, 12 живых созвонов, поддержка 1 мес."
              features={[
                "Стратегия запуска под ключ",
                "Оффер, контент-план, воронка",
                "Мастермайнд-группа и куратор",
                "Шаблоны, чек-листы, скрипты",
                "Результат: от 300 000 ₽ за 6 недель",
              ]}
              price="от 150 000 ₽"
              href={TG_LINK + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA"}
              featured
            />
            <ProgramCard
              title="Наставничество с внедрением"
              subtitle="Индивидуальная работа + команда Карины"
              features={[
                "Глубокий аудит твоего проекта",
                "Персональная стратегия роста",
                "Ведение от идеи до продаж",
                "Работа с мышлением и масштабированием",
              ]}
              price="по запросу"
              href={TG_LINK + "?text=%D0%9D%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE"}
            />
          </div>
        </section>

        {/* ═══════════════════ RESULTS ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="flex items-center gap-2 mb-4">
            <StarIcon className="w-5 h-5 text-[#C8A84E]" />
            <h2 className="text-lg font-bold text-white">Результаты</h2>
          </div>
          <div className="space-y-3">
            {[
              { result: "4,3 млн ₽ за 24 часа", desc: "Монетизация базы подписчиков" },
              { result: "759 976 ₽ первый запуск", desc: "Первый онлайн-продукт с нуля" },
              { result: "700K → 2,3 млн за 28 дней", desc: "Кризис-менеджмент онлайн-школы" },
              { result: "ROMI 243%", desc: "Окупаемость рекламы на холодный трафик" },
              { result: "30+ экспертов", desc: "Нашли суперсилу и научились продавать" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#142E22]/60 p-4 transition-all hover:border-[#C8A84E]/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C8A84E]/10">
                  <FireIcon className="w-5 h-5 text-[#C8A84E]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#C8A84E]">{item.result}</div>
                  <div className="text-xs text-white/50">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ FREE MATERIALS ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="flex items-center gap-2 mb-4">
            <HeartIcon className="w-5 h-5 text-[#C8A84E]" />
            <h2 className="text-lg font-bold text-white">Бесплатные материалы</h2>
          </div>
          <div className="space-y-2">
            {[
              { text: "Чек-лист: 10 шагов запуска онлайн-курса", keyword: "Чек-лист" },
              { text: "PDF: 100 продающих заголовков", keyword: "Заголовки" },
              { text: "Видеоурок: Позиционирование и суперсила", keyword: "Видеоурок" },
              { text: "Таблица прогнозирования дохода", keyword: "Таблица" },
              { text: "Шаблон X-mind карты для целей", keyword: "Карта целей" },
            ].map((item, i) => (
              <a
                key={i}
                href={TG_LINK + "?text=" + encodeURIComponent(item.keyword)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#142E22]/40 px-4 py-3 transition-all hover:border-[#C8A84E]/20 hover:bg-[#1B3C2D] group"
              >
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <span className="shrink-0 ml-2 text-xs font-semibold text-[#C8A84E] opacity-0 group-hover:opacity-100 transition-opacity">
                  Скачать &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════════ ABOUT ═══════════════════ */}
        <section className="animate-on-scroll mb-10">
          <div className="rounded-2xl border border-[#C8A84E]/10 bg-[#142E22]/60 p-6">
            <h2 className="text-lg font-bold text-white mb-3">Обо мне</h2>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>
                7 лет в онлайн-бизнесе: от техспеца до управляющего онлайн-школ.
                Рекорд — 40 млн руб./мес. на 3 автоворонках.
              </p>
              <p>
                Живу в Стамбуле. Знаю как продавать в 50+ нишах —
                от эзотерики до обучения профессиям.
              </p>
              <p>
                Провожу трансформационные распаковки, после которых
                эксперты растут, меняют жизни и начинают продавать.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
              <UsersIcon className="w-4 h-4 text-[#C8A84E]" />
              <span className="text-xs text-white/40">
                Со-основатель агентства недвижимости в Турции с 2022 года
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="animate-on-scroll mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#C8A84E]/20 to-[#C8A84E]/5 border border-[#C8A84E]/20 p-6 text-center">
            <h2 className="text-lg font-bold text-white mb-2">
              Готов зарабатывать на экспертности?
            </h2>
            <p className="text-sm text-white/60 mb-5">
              Напиши &laquo;Разбор&raquo; — и я покажу, как выйти на 300 000 ₽ за 6 недель
            </p>
            <a
              href={TG_LINK + "?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#C8A84E] px-8 py-3.5 text-sm font-bold text-[#142E22] transition-all hover:bg-[#E8D5A0] pulse-gold"
            >
              <TelegramIcon className="w-5 h-5" />
              Написать &laquo;Разбор&raquo;
            </a>
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="text-center pb-4">
          <div className="flex justify-center gap-6 mb-3">
            <a
              href={CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-[#C8A84E] transition-colors text-xs"
            >
              Telegram-канал
            </a>
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-[#C8A84E] transition-colors text-xs"
            >
              Личные сообщения
            </a>
          </div>
          <p className="text-white/15 text-[10px]">
            &copy; {new Date().getFullYear()} Карина Мамедова. Все права защищены.
          </p>
        </footer>
      </div>

      {/* ─── GOLD BOTTOM LINE ─── */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/50 to-transparent" />
    </div>
  );
}
