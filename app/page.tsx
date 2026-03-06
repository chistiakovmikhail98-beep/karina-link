"use client";

import { useEffect } from "react";
import Link from "next/link";

/* ── Constants ── */
const TG = "https://t.me/KARINA_ProZAPUSKI";
const CH = "https://t.me/dengi_na_expertnosti";

/* ── Icons ── */
const TgIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Arrow = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

/* ── Data ── */
const tools = [
  { title: "Сканер суперсилы", desc: "Найдём уникальное позиционирование и нишу за 2 минуты", badge: "AI", href: "/scanner", icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" },
  { title: "Аудит оффера", desc: "Оценка и улучшенные варианты вашего предложения", badge: "AI", href: "/audit", icon: "M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
  { title: "Калькулятор запуска", desc: "Прогноз выручки за 60 секунд", badge: "New", href: "/calculator", icon: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" },
  { title: "Диагностика эксперта", desc: "Что мешает зарабатывать больше", badge: "Тест", href: "/diagnostic", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" },
  { title: "Контент-план 30 дней", desc: "Готовый план с заголовками и темами", badge: "AI", href: "/content-plan", icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" },
];

const particles = [
  { size: 6, top: "12%", left: "8%", o: 0.25, dur: "8s", delay: "0s" },
  { size: 4, top: "22%", left: "82%", o: 0.18, dur: "11s", delay: "1s" },
  { size: 8, top: "55%", left: "78%", o: 0.12, dur: "13s", delay: "2s" },
  { size: 3, top: "38%", left: "25%", o: 0.3, dur: "9s", delay: "0.5s" },
  { size: 5, top: "72%", left: "88%", o: 0.2, dur: "10s", delay: "3s" },
  { size: 4, top: "65%", left: "15%", o: 0.15, dur: "12s", delay: "1.5s" },
  { size: 3, top: "85%", left: "45%", o: 0.2, dur: "14s", delay: "2.5s" },
];

/* ── Decorative ornament ── */
const Ornament = ({ light = false }: { light?: boolean }) => {
  const c = light ? "border-[#D4B96A]/30" : "border-[#B08D3E]/50";
  const g1 = light ? "from-transparent to-[#D4B96A]/30" : "from-transparent to-[#B08D3E]/50";
  const g2 = light ? "from-transparent to-[#D4B96A]/30" : "from-transparent to-[#B08D3E]/50";
  return (
    <div className="flex items-center justify-center gap-4">
      <div className={`w-12 h-px bg-gradient-to-r ${g1}`} />
      <div className={`w-1.5 h-1.5 rotate-45 border ${c}`} />
      <div className={`w-12 h-px bg-gradient-to-l ${g2}`} />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────
          NAV
          ───────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF9]/80 backdrop-blur-xl border-b border-[#E8E2DA]/50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <span className="font-display text-[18px] font-semibold text-[#191715] tracking-tight">
            К<span className="italic text-[#B08D3E]">М</span>
          </span>
          <div className="hidden md:flex items-center gap-10">
            {[
              ["#tools", "Инструменты"],
              ["#programs", "Программы"],
              ["#cases", "Кейсы"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[13px] text-[#8A8078] hover:text-[#191715] transition-colors duration-300 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href={TG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#191715] text-[12px] font-semibold text-white tracking-wide hover:bg-[#2E2A25] transition-colors duration-300"
          >
            <TgIcon className="w-3.5 h-3.5" /> Написать
          </a>
        </div>
      </nav>

      {/* ─────────────────────────────────────────
          HERO — centered, editorial, cinematic
          ───────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        {/* Background warmth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#F8F0DC]/70 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#F0E9DF]/80 blur-[80px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F8F0DC]/30 blur-[120px]" />
        </div>

        {/* Floating gold particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                opacity: p.o,
                background: "radial-gradient(circle, #D4B96A, #B08D3E)",
                animation: `float-${["slow", "med", "fast"][i % 3]} ${p.dur} ${p.delay} ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]">
          <div className="flex flex-col items-center text-center">
            {/* Ornament */}
            <div className="animate-hero mb-10">
              <Ornament />
            </div>

            {/* Eyebrow */}
            <p className="animate-hero-d1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[#B08D3E] mb-8">
              Продюсер · Маркетолог · Наставник
            </p>

            {/* Main heading — MASSIVE */}
            <h1 className="animate-hero-d2 font-display text-[clamp(3.5rem,12vw,10rem)] font-medium leading-[0.88] tracking-[-0.04em] text-[#191715]">
              Карина
              <br />
              <span className="italic text-[#B08D3E]">Мамедова</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-hero-d3 text-[clamp(0.95rem,1.8vw,1.2rem)] text-[#8A8078] leading-[1.7] max-w-[420px] mt-8 md:mt-10 mb-10 md:mb-14">
              Помогаю экспертам превращать знания в&nbsp;деньги.
              От&nbsp;самозапуска на&nbsp;
              <strong className="text-[#2E2A25] font-semibold">300K</strong> до&nbsp;системного бизнеса на&nbsp;
              <strong className="text-[#2E2A25] font-semibold">1+&nbsp;млн</strong>
            </p>

            {/* CTAs */}
            <div className="animate-hero-d4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={TG}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep group flex items-center justify-center gap-3 h-[58px] px-10 rounded-full bg-[#191715] text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
              >
                <TgIcon className="w-5 h-5" />
                Написать Карине
                <svg
                  className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href={CH}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-[58px] px-8 rounded-full border-2 border-[#E8E2DA] text-[15px] font-medium text-[#8A8078] transition-all duration-300 hover:border-[#B08D3E] hover:text-[#B08D3E]"
              >
                Читать канал
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar — anchored to bottom */}
        <div className="animate-hero-d5 relative z-10 mt-auto border-t border-[#E8E2DA]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-3 divide-x divide-[#E8E2DA]">
              {[
                { n: "7+", l: "лет в онлайн" },
                { n: "50+", l: "ниш и экспертиз" },
                { n: "40М", l: "₽/мес рекорд" },
              ].map((s, i) => (
                <div key={i} className="py-8 md:py-10 text-center">
                  <div className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#B08D3E] leading-none">
                    {s.n}
                  </div>
                  <div className="text-[11px] md:text-[12px] text-[#B5ADA4] mt-2 uppercase tracking-[0.1em] font-medium">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="gold-line" />

      {/* ─────────────────────────────────────────
          AI TOOLS — bento grid
          ───────────────────────────────────────── */}
      <section id="tools" className="section-pad bg-[#F7F2EC]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="reveal mb-16 md:mb-20 max-w-[560px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D3E] mb-5">
              Бесплатные инструменты
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715]">
              AI-диагностика
              <br className="hidden md:block" /> вашей экспертности
            </h2>
            <p className="text-[16px] text-[#8A8078] mt-5 leading-relaxed">
              Пять инструментов, которые за 2&nbsp;минуты покажут точку роста
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {tools.map((t, i) => {
              const big = i === 0;
              return (
                <Link
                  key={i}
                  href={t.href}
                  className={`reveal reveal-d${Math.min(i + 1, 5)} group relative block bg-white rounded-[20px] border border-[#E8E2DA]/80 overflow-hidden card-glow ${
                    big ? "lg:col-span-2 lg:row-span-2 p-8 md:p-10 lg:p-14" : "p-7 md:p-8"
                  }`}
                >
                  {/* Gold top accent on hover */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#B08D3E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                  <div className={big ? "lg:flex lg:flex-col lg:justify-between lg:h-full" : ""}>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`${
                            big ? "w-16 h-16" : "w-12 h-12"
                          } rounded-2xl bg-[#F8F0DC] flex items-center justify-center text-[#B08D3E] transition-all duration-300 group-hover:bg-[#B08D3E] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(176,141,62,0.25)]`}
                        >
                          <svg
                            className={big ? "w-7 h-7" : "w-5 h-5"}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B08D3E] bg-[#F8F0DC] px-3 py-1 rounded-full">
                          {t.badge}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-[#191715] mb-2 ${big ? "text-[24px] md:text-[28px]" : "text-[18px]"}`}>
                        {t.title}
                      </h3>
                      <p className={`text-[#8A8078] leading-relaxed ${big ? "text-[16px] max-w-[400px]" : "text-[14px]"}`}>
                        {t.desc}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-[#B5ADA4] group-hover:text-[#B08D3E] transition-all duration-300 group-hover:gap-3 ${
                        big ? "mt-10" : "mt-6"
                      }`}
                    >
                      <span className="text-[13px] font-semibold tracking-wide">Пройти</span>
                      <Arrow />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="gold-line" />

      {/* ─────────────────────────────────────────
          PROGRAMS
          ───────────────────────────────────────── */}
      <section id="programs" className="section-pad">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="reveal mb-16 md:mb-24 max-w-[560px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D3E] mb-5">Программы</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715]">
              Работа с&nbsp;Кариной
            </h2>
          </div>

          {/* FEATURED — dark, cinematic */}
          <div className="reveal mb-6">
            <div className="relative bg-[#191715] rounded-[24px] overflow-hidden">
              {/* Decorative golden glows */}
              <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#B08D3E]/8 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-[#B08D3E]/5 to-transparent pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="lg:flex lg:items-center lg:gap-16">
                  <div className="lg:flex-1">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#B08D3E] text-white text-[10px] font-bold uppercase tracking-[0.14em] mb-8">
                      Хит продаж
                    </span>
                    <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-white leading-[1.05] mb-4 tracking-[-0.02em]">
                      Формула
                      <br />
                      САМОзапуска
                    </h3>
                    <p className="text-[13px] text-white/35 uppercase tracking-[0.15em] font-medium mb-10">
                      6 модулей · 12 созвонов · поддержка 1 мес.
                    </p>
                    <ul className="space-y-3.5 mb-10 lg:mb-0">
                      {[
                        "Стратегия запуска под ключ",
                        "Оффер, контент-план, воронка",
                        "Мастермайнд-группа и куратор",
                        "Шаблоны, чек-листы, скрипты",
                        "Результат: от 300 000 ₽ за 6 недель",
                      ].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-[14px] text-white/55">
                          <svg className="w-5 h-5 shrink-0 text-[#D4B96A]" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-[300px] lg:shrink-0 pt-10 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/8 lg:pl-16">
                    <div className="text-[11px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-3">Стоимость</div>
                    <div className="text-shimmer font-display text-[clamp(2.5rem,5vw,3.8rem)] font-medium leading-none mb-10">
                      150 000 ₽
                    </div>
                    <a
                      href={TG + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sweep flex items-center justify-center gap-3 w-full h-[54px] rounded-full bg-white text-[14px] font-semibold text-[#191715] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
                    >
                      <TgIcon className="w-5 h-5" />
                      Узнать подробнее
                    </a>
                    <p className="text-[11px] text-white/20 mt-4 text-center tracking-wide">30+ экспертов уже запустились</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two smaller programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Распаковка суперсилы",
                sub: "3-4 часа · Zoom",
                features: ["Найдём уникальность", "Позиционирование", "10+ тем для контента", "Разберём блоки"],
                price: "5 000 ₽",
                link: TG + "?text=%D0%A0%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0",
              },
              {
                title: "Наставничество",
                sub: "Индивидуально · Команда Карины",
                features: ["Глубокий аудит проекта", "Стратегия роста", "От идеи до продаж", "Масштабирование"],
                price: "по запросу",
                link: TG + "?text=%D0%9D%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE",
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} group relative bg-white rounded-[20px] border border-[#E8E2DA] p-8 md:p-10 overflow-hidden card-glow`}
              >
                {/* Gold left accent on hover */}
                <div className="absolute left-0 top-[15%] bottom-[15%] w-[3px] bg-[#B08D3E] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 group-hover:translate-x-0" />

                <h3 className="font-display text-[22px] font-medium text-[#191715] mb-1">{p.title}</h3>
                <p className="text-[12px] text-[#B5ADA4] font-medium uppercase tracking-[0.1em] mb-8">{p.sub}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[14px] text-[#8A8078]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4B96A] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-[#E8E2DA]">
                  <div className="font-display text-[28px] font-medium text-[#B08D3E] leading-none mb-6">{p.price}</div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-[48px] rounded-full border-2 border-[#E8E2DA] text-[13px] font-semibold text-[#8A8078] transition-all duration-300 hover:border-[#B08D3E] hover:text-[#B08D3E]"
                  >
                    Подробнее <Arrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="gold-line" />

      {/* ─────────────────────────────────────────
          RESULTS — numbers that speak
          ───────────────────────────────────────── */}
      <section id="cases" className="section-pad bg-[#F7F2EC]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="reveal mb-16 md:mb-20 md:flex md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D3E] mb-5">Кейсы</p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715]">
                Результаты
              </h2>
            </div>
            <p className="text-[15px] text-[#8A8078] mt-4 md:mt-0 max-w-[280px] leading-relaxed">
              Цифры говорят лучше слов
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { n: "4,3 млн ₽", l: "за 24 часа", d: "Монетизация базы" },
              { n: "243%", l: "ROMI", d: "Окупаемость рекламы" },
              { n: "2,3 млн", l: "за 28 дней", d: "Масштаб школы" },
              { n: "30+", l: "экспертов", d: "Нашли суперсилу" },
            ].map((r, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} relative bg-white rounded-[20px] border border-[#E8E2DA]/80 p-7 md:p-8 overflow-hidden`}
              >
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B08D3E] to-[#D4B96A]" />
                <div className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-[#B08D3E] leading-none mb-2">
                  {r.n}
                </div>
                <div className="text-[11px] text-[#B5ADA4] uppercase tracking-[0.14em] font-semibold mb-4">{r.l}</div>
                <div className="text-[13px] text-[#8A8078] leading-relaxed">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT — editorial quote
          ───────────────────────────────────────── */}
      <section className="section-pad">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="reveal relative">
            {/* Giant decorative quotation mark */}
            <div
              className="absolute -top-8 -left-2 md:-top-10 md:-left-6 font-display text-[140px] md:text-[200px] leading-none text-[#F0E9DF] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="relative pt-8 md:pt-12">
              <p className="font-display text-[clamp(1.3rem,2.8vw,2rem)] text-[#191715] leading-[1.5] font-medium italic">
                Провожу трансформационные распаковки, после которых эксперты начинают продавать, расти
                и&nbsp;зарабатывать больше, чем за все предыдущие обучения.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4B96A] to-[#B08D3E] flex items-center justify-center text-white font-display text-[16px] font-semibold">
                  К
                </div>
                <div>
                  <div className="font-semibold text-[15px] text-[#191715]">Карина Мамедова</div>
                  <div className="text-[12px] text-[#B5ADA4] mt-0.5 tracking-wide">7 лет в онлайн-бизнесе · Стамбул</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* gold divider */}
      <div className="gold-line" />

      {/* ─────────────────────────────────────────
          MATERIALS
          ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-32 bg-[#F7F2EC]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <div className="reveal mb-12 md:mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D3E] mb-5">Бесплатно</p>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium text-[#191715]">Материалы</h2>
          </div>
          <div className="reveal space-y-3">
            {[
              "Чек-лист: 10 шагов запуска онлайн-курса",
              "PDF: 100 продающих заголовков",
              "Видеоурок: Позиционирование и суперсила",
              "Таблица прогнозирования дохода",
              "Шаблон X-mind карты для целей",
            ].map((m, i) => (
              <a
                key={i}
                href={TG + "?text=" + encodeURIComponent(m.split(":")[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 bg-white rounded-2xl border border-[#E8E2DA]/80 px-6 py-5 overflow-hidden transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
              >
                {/* Gold left accent on hover */}
                <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-[#B08D3E] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 group-hover:translate-x-0" />
                <span className="text-[12px] font-mono text-[#D6CFC6] shrink-0 tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] text-[#57534E] group-hover:text-[#191715] transition-colors duration-300 flex-1 font-medium">
                  {m}
                </span>
                <span className="text-[#D6CFC6] group-hover:text-[#B08D3E] transition-all duration-300 group-hover:translate-x-1 shrink-0">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CTA — dark, cinematic
          ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#191715]">
        {/* Golden glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B08D3E]/[0.06] blur-[150px]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08D3E]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 py-28 md:py-40 text-center">
          <div className="reveal">
            {/* Ornament */}
            <div className="mb-10">
              <Ornament light />
            </div>

            <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] font-medium text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Готов зарабатывать
              <br />
              на&nbsp;экспертности?
            </h2>
            <p className="text-[16px] text-white/35 mb-14 max-w-[380px] mx-auto leading-relaxed">
              Напиши «Разбор» — покажу, как выйти на&nbsp;300&nbsp;000&nbsp;₽ за&nbsp;6 недель
            </p>
            <a
              href={TG + "?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep pulse-gold inline-flex items-center gap-3 h-[60px] px-14 rounded-full bg-white text-[16px] font-semibold text-[#191715] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(255,255,255,0.12)] hover:-translate-y-0.5"
            >
              <TgIcon className="w-5 h-5" />
              Написать «Разбор»
            </a>
            <p className="text-[12px] text-white/15 mt-6 tracking-wide">Бесплатно, без обязательств</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOOTER
          ───────────────────────────────────────── */}
      <footer className="bg-[#191715]">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B08D3E]/20 to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-[16px] text-white/25 font-medium italic">Карина Мамедова</span>
          <div className="flex items-center gap-8">
            <a
              href={CH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/20 hover:text-white/50 transition-colors duration-300 tracking-wide"
            >
              Канал
            </a>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/20 hover:text-white/50 transition-colors duration-300 tracking-wide"
            >
              Написать
            </a>
          </div>
          <span className="text-[11px] text-white/10">&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
