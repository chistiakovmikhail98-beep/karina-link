"use client";

import { useEffect } from "react";
import Link from "next/link";

const TG = "https://t.me/KARINA_ProZAPUSKI";
const CH = "https://t.me/dengi_na_expertnosti";

const TgIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

const tools = [
  { title: "Сканер суперсилы", desc: "Найдём уникальное позиционирование", badge: "AI", href: "/scanner", icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" },
  { title: "Аудит оффера", desc: "Оценка + улучшенные варианты", badge: "AI", href: "/audit", icon: "M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
  { title: "Калькулятор запуска", desc: "Прогноз выручки за 60 секунд", badge: "New", href: "/calculator", icon: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" },
  { title: "Диагностика эксперта", desc: "Что мешает зарабатывать", badge: "Тест", href: "/diagnostic", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" },
  { title: "Контент-план 30 дней", desc: "Готовый план с заголовками", badge: "AI", href: "/content-plan", icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" },
];

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — полноэкранный, центр внимания
          ══════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#FFFDF9]">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF9]/80 backdrop-blur-lg">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#2E2A25] tracking-tight">КМ</span>
            <div className="hidden md:flex items-center gap-10">
              <a href="#tools" className="text-[14px] text-[#8A8078] hover:text-[#2E2A25] transition-colors">Инструменты</a>
              <a href="#programs" className="text-[14px] text-[#8A8078] hover:text-[#2E2A25] transition-colors">Программы</a>
              <a href="#cases" className="text-[14px] text-[#8A8078] hover:text-[#2E2A25] transition-colors">Кейсы</a>
            </div>
            <a href={TG} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 h-[42px] px-5 rounded-full bg-[#191715] text-[13px] font-semibold text-white hover:bg-[#2E2A25] transition-colors">
              <TgIcon className="w-4 h-4" /> Написать
            </a>
          </div>
        </nav>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#F0E9DF]/80 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[15%] w-[320px] h-[320px] rounded-full bg-[#F8F0DC] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-[#F0E9DF]/60 blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="max-w-[720px] pt-[120px] pb-[80px] md:pt-[160px] md:pb-[120px]">
            {/* Eyebrow */}
            <div className="animate-fade-up inline-flex items-center gap-2 text-[13px] text-[#B08D3E] font-semibold tracking-wide mb-8">
              <div className="w-8 h-px bg-[#B08D3E]" />
              Продюсер · Маркетолог · Наставник
            </div>

            {/* Main heading — massive */}
            <h1 className="animate-fade-up-d1 font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#191715] mb-8">
              Карина<br />
              <span className="font-display italic text-[#B08D3E]">Мамедова</span>
            </h1>

            {/* Subline */}
            <p className="animate-fade-up-d2 text-[clamp(1.1rem,2.2vw,1.4rem)] text-[#8A8078] leading-[1.6] max-w-[480px] mb-12">
              Помогаю экспертам превращать знания в&nbsp;деньги.
              От самозапуска на&nbsp;<strong className="text-[#2E2A25]">300K</strong>{" "}
              до системного бизнеса на&nbsp;<strong className="text-[#2E2A25]">1+ млн</strong>
            </p>

            {/* CTA */}
            <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4">
              <a href={TG} target="_blank" rel="noopener noreferrer"
                className="btn-sweep group flex items-center justify-center gap-3 h-[60px] px-10 rounded-full bg-[#191715] text-[16px] font-semibold text-white transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                <TgIcon className="w-5 h-5" />
                Написать Карине
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </a>
              <a href={CH} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-[60px] px-8 rounded-full border-2 border-[#E8E2DA] text-[16px] font-medium text-[#8A8078] transition-all hover:border-[#B08D3E] hover:text-[#B08D3E]">
                Канал
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar — прижатый к низу hero */}
        <div className="relative z-10 w-full border-t border-[#E8E2DA]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-3 divide-x divide-[#E8E2DA]">
              {[
                { n: "7+", l: "лет в онлайн" },
                { n: "50+", l: "ниш и экспертиз" },
                { n: "40М", l: "₽/мес рекорд" },
              ].map((s, i) => (
                <div key={i} className="py-8 md:py-10 text-center">
                  <div className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#B08D3E] leading-none">{s.n}</div>
                  <div className="text-[12px] md:text-[13px] text-[#B5ADA4] mt-2 font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AI TOOLS — большие карточки, визуальный акцент
          ══════════════════════════════════════════ */}
      <section id="tools" className="section-pad bg-[#F7F2EC]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Section header — left-aligned */}
          <div className="reveal mb-16 md:mb-20 max-w-[600px]">
            <span className="text-[13px] text-[#B08D3E] font-semibold tracking-wide">Бесплатные инструменты</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715] mt-4">
              AI-диагностика<br />вашей экспертности
            </h2>
            <p className="text-[17px] text-[#8A8078] mt-5 leading-relaxed">
              Пять инструментов, которые за 2 минуты покажут точку роста
            </p>
          </div>

          {/* Tools grid — asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((t, i) => (
              <Link key={i} href={t.href}
                className={`reveal reveal-d${Math.min(i + 1, 5)} group block bg-white rounded-[20px] p-7 md:p-8 border border-[#E8E2DA] transition-all duration-400 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#D4B96A]/40 ${i === 0 ? "lg:col-span-2 lg:row-span-2 lg:p-12 lg:flex lg:flex-col lg:justify-between" : ""}`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${i === 0 ? "w-16 h-16" : "w-12 h-12"} rounded-2xl bg-[#F8F0DC] flex items-center justify-center text-[#B08D3E] transition-colors group-hover:bg-[#B08D3E] group-hover:text-white`}>
                      <svg className={`${i === 0 ? "w-7 h-7" : "w-5 h-5"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B08D3E] bg-[#F8F0DC] px-3 py-1 rounded-full">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className={`font-semibold text-[#191715] mb-2 ${i === 0 ? "text-[24px] md:text-[28px]" : "text-[18px]"}`}>{t.title}</h3>
                  <p className={`text-[#8A8078] leading-relaxed ${i === 0 ? "text-[16px] max-w-[400px]" : "text-[14px]"}`}>{t.desc}</p>
                </div>
                <div className={`flex items-center gap-2 text-[#B5ADA4] group-hover:text-[#B08D3E] transition-all group-hover:gap-3 ${i === 0 ? "mt-10" : "mt-6"}`}>
                  <span className="text-[14px] font-semibold">Пройти</span>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROGRAMS — чередующиеся блоки
          ══════════════════════════════════════════ */}
      <section id="programs" className="section-pad">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="reveal mb-16 md:mb-24 max-w-[600px]">
            <span className="text-[13px] text-[#B08D3E] font-semibold tracking-wide">Программы</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715] mt-4">
              Работа с Кариной
            </h2>
          </div>

          {/* FEATURED — full-width horizontal */}
          <div className="reveal mb-8">
            <div className="relative bg-[#191715] rounded-[24px] overflow-hidden">
              <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#B08D3E]/10 to-transparent pointer-events-none" />
              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="lg:flex lg:items-center lg:gap-16">
                  <div className="lg:flex-1">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#B08D3E] text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-8">
                      Хит продаж
                    </span>
                    <h3 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-medium text-white leading-[1.1] mb-4">
                      Формула<br />САМОзапуска
                    </h3>
                    <p className="text-[14px] text-white/40 uppercase tracking-[0.12em] font-medium mb-8">
                      6 модулей · 12 созвонов · поддержка 1 мес.
                    </p>
                    <ul className="space-y-3 mb-8 lg:mb-0">
                      {["Стратегия запуска под ключ", "Оффер, контент-план, воронка", "Мастермайнд-группа и куратор", "Шаблоны, чек-листы, скрипты", "Результат: от 300 000 ₽ за 6 недель"].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-[15px] text-white/60">
                          <svg className="w-5 h-5 shrink-0 text-[#D4B96A]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-[320px] lg:shrink-0 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-16">
                    <div className="text-[12px] text-white/30 uppercase tracking-[0.2em] font-semibold mb-3">Стоимость</div>
                    <div className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium text-[#D4B96A] leading-none mb-10">
                      150 000 ₽
                    </div>
                    <a href={TG + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA"} target="_blank" rel="noopener noreferrer"
                      className="btn-sweep flex items-center justify-center gap-3 w-full h-[56px] rounded-full bg-white text-[15px] font-semibold text-[#191715] transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
                      <TgIcon className="w-5 h-5" />
                      Узнать подробнее
                    </a>
                    <p className="text-[12px] text-white/25 mt-4 text-center">30+ экспертов уже запустились</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Распаковка суперсилы", sub: "3-4 часа · Zoom", features: ["Найдём уникальность", "Позиционирование", "10+ тем для контента", "Разберём блоки"], price: "5 000 ₽", link: TG + "?text=%D0%A0%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0" },
              { title: "Наставничество", sub: "Индивидуально · Команда Карины", features: ["Глубокий аудит проекта", "Стратегия роста", "От идеи до продаж", "Масштабирование"], price: "по запросу", link: TG + "?text=%D0%9D%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE" },
            ].map((p, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} bg-white rounded-[20px] border border-[#E8E2DA] p-8 md:p-10 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1`}>
                <h3 className="font-display text-[22px] font-medium text-[#191715] mb-1">{p.title}</h3>
                <p className="text-[13px] text-[#B5ADA4] font-medium mb-8">{p.sub}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[15px] text-[#8A8078]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4B96A] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-[#E8E2DA]">
                  <div className="font-display text-[28px] font-medium text-[#B08D3E] leading-none mb-6">{p.price}</div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-[50px] rounded-full border-2 border-[#E8E2DA] text-[14px] font-semibold text-[#8A8078] transition-all hover:border-[#B08D3E] hover:text-[#B08D3E]">
                    Подробнее <ArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESULTS — горизонтальный скроллер
          ══════════════════════════════════════════ */}
      <section id="cases" className="section-pad bg-[#F7F2EC]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="reveal mb-16 md:mb-20 md:flex md:items-end md:justify-between">
            <div>
              <span className="text-[13px] text-[#B08D3E] font-semibold tracking-wide">Кейсы</span>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#191715] mt-4">
                Результаты
              </h2>
            </div>
            <p className="text-[16px] text-[#8A8078] mt-4 md:mt-0 max-w-[320px]">
              Цифры говорят лучше слов
            </p>
          </div>

          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "4,3 млн ₽", l: "за 24 часа", d: "Монетизация базы" },
              { n: "243%", l: "ROMI", d: "Окупаемость рекламы" },
              { n: "2,3 млн", l: "за 28 дней", d: "Масштаб школы" },
              { n: "30+", l: "экспертов", d: "Нашли суперсилу" },
            ].map((r, i) => (
              <div key={i} className={`reveal-d${i + 1} bg-white rounded-[20px] border border-[#E8E2DA] p-7 md:p-8`}>
                <div className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-[#B08D3E] leading-none mb-2">{r.n}</div>
                <div className="text-[12px] text-[#B5ADA4] uppercase tracking-[0.12em] font-semibold mb-4">{r.l}</div>
                <div className="text-[14px] text-[#8A8078]">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT — цитата-блок, большой и уверенный
          ══════════════════════════════════════════ */}
      <section className="section-pad">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 reveal">
          <div className="relative">
            <div className="absolute -top-6 -left-4 md:-left-8 font-display text-[120px] md:text-[180px] leading-none text-[#F0E9DF] select-none pointer-events-none">&ldquo;</div>
            <div className="relative">
              <p className="font-display text-[clamp(1.4rem,3vw,2.2rem)] text-[#191715] leading-[1.4] font-medium italic">
                Провожу трансформационные распаковки, после которых эксперты начинают продавать, расти
                и зарабатывать больше, чем за все предыдущие обучения.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F0DC] flex items-center justify-center text-[#B08D3E] font-display text-[18px] font-semibold">К</div>
                <div>
                  <div className="font-semibold text-[#191715]">Карина Мамедова</div>
                  <div className="text-[13px] text-[#B5ADA4]">7 лет в онлайн-бизнесе · Стамбул</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MATERIALS — минимальный список
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F7F2EC]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <div className="reveal mb-12">
            <span className="text-[13px] text-[#B08D3E] font-semibold tracking-wide">Бесплатно</span>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium text-[#191715] mt-3">Материалы</h2>
          </div>
          <div className="reveal space-y-3">
            {[
              "Чек-лист: 10 шагов запуска онлайн-курса",
              "PDF: 100 продающих заголовков",
              "Видеоурок: Позиционирование и суперсила",
              "Таблица прогнозирования дохода",
              "Шаблон X-mind карты для целей",
            ].map((m, i) => (
              <a key={i} href={TG + "?text=" + encodeURIComponent(m.split(":")[0])} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-white rounded-2xl border border-[#E8E2DA] px-6 py-5 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5">
                <span className="text-[13px] font-mono text-[#D6CFC6] shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-[#57534E] group-hover:text-[#191715] transition-colors flex-1 font-medium">{m}</span>
                <span className="text-[#D6CFC6] group-hover:text-[#B08D3E] transition-all group-hover:translate-x-1 shrink-0">
                  <ArrowRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — тёмный, контрастный, мощный
          ══════════════════════════════════════════ */}
      <section className="relative bg-[#191715] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B08D3E]/[0.06] blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 py-24 md:py-36 text-center">
          <div className="reveal">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium text-white leading-[1.1] tracking-[-0.02em] mb-6">
              Готов зарабатывать<br />на экспертности?
            </h2>
            <p className="text-[17px] text-white/40 mb-12 max-w-[400px] mx-auto leading-relaxed">
              Напиши «Разбор» — покажу, как выйти на 300 000 ₽ за 6 недель
            </p>
            <a href={TG + "?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"} target="_blank" rel="noopener noreferrer"
              className="btn-sweep inline-flex items-center gap-3 h-[62px] px-14 rounded-full bg-white text-[17px] font-semibold text-[#191715] transition-all hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5">
              <TgIcon className="w-5 h-5" />
              Написать «Разбор»
            </a>
            <p className="text-[13px] text-white/20 mt-6">Бесплатно, без обязательств</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════ */}
      <footer className="bg-[#191715] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-[16px] text-white/30 font-medium">Карина Мамедова</span>
          <div className="flex items-center gap-8">
            <a href={CH} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/25 hover:text-white/60 transition-colors">Канал</a>
            <a href={TG} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/25 hover:text-white/60 transition-colors">Написать</a>
          </div>
          <span className="text-[12px] text-white/15">&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
