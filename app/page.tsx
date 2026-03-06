"use client";

import { useEffect } from "react";
import Link from "next/link";

/* ─── icons ─── */

const TgIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Arrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
  </svg>
);

const Check = ({ accent }: { accent?: boolean }) => (
  <svg className={`w-5 h-5 shrink-0 ${accent ? "text-[#B8962E]" : "text-[#D6D3D1]"}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

/* ─── data ─── */

const TG = "https://t.me/KARINA_ProZAPUSKI";
const CH = "https://t.me/dengi_na_expertnosti";

const tools = [
  { icon: "sparkle", title: "Сканер суперсилы", desc: "AI найдёт уникальное позиционирование за 2 минуты", badge: "AI", href: "/scanner" },
  { icon: "target", title: "Аудит оффера", desc: "Оценка по 5 критериям + улучшенные варианты", badge: "AI", href: "/audit" },
  { icon: "calc", title: "Калькулятор запуска", desc: "Прогноз выручки за 60 секунд", badge: "New", href: "/calculator" },
  { icon: "clipboard", title: "Диагностика эксперта", desc: "20 вопросов — что мешает зарабатывать", badge: "Тест", href: "/diagnostic" },
  { icon: "pen", title: "Контент-план 30 дней", desc: "Готовый план постов с заголовками и CTA", badge: "AI", href: "/content-plan" },
];

const stats = [
  { value: "7+", label: "Лет в онлайн-бизнесе" },
  { value: "50+", label: "Ниш — от эзотерики до IT" },
  { value: "40М", label: "Рублей / месяц рекорд" },
];

const results = [
  { n: "4,3 млн ₽", sub: "за 24 часа", d: "Монетизация базы подписчиков" },
  { n: "759 976 ₽", sub: "первый запуск", d: "Онлайн-продукт с нуля" },
  { n: "2,3 млн", sub: "за 28 дней", d: "Масштаб онлайн-школы с 700K" },
  { n: "243%", sub: "ROMI", d: "Окупаемость рекламы на холодный трафик" },
  { n: "30+", sub: "экспертов", d: "Нашли суперсилу и продают" },
];

const materials = [
  { t: "Чек-лист: 10 шагов запуска онлайн-курса", k: "Чек-лист" },
  { t: "PDF: 100 продающих заголовков", k: "Заголовки" },
  { t: "Видеоурок: Позиционирование и суперсила", k: "Видеоурок" },
  { t: "Таблица прогнозирования дохода", k: "Таблица" },
  { t: "Шаблон X-mind карты для целей", k: "Карта целей" },
];

const toolIconPaths: Record<string, string> = {
  sparkle: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  target: "M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  calc: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z",
  clipboard: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z",
  pen: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ════════ NAV ════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E5E4]/60">
        <div className="max-w-[1100px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <span className="font-display text-[18px] font-semibold text-[#1C1917] tracking-tight">Карина Мамедова</span>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#tools" className="text-[14px] text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">Инструменты</a>
            <a href="#programs" className="text-[14px] text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">Программы</a>
            <a href="#results" className="text-[14px] text-[#78716C] hover:text-[#1C1917] transition-colors font-medium">Кейсы</a>
            <a href={TG} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#1C1917] text-[13px] font-semibold text-white transition-all hover:bg-[#2D2A26] hover:shadow-lg">
              <TgIcon /> Написать
            </a>
          </div>
        </div>
      </nav>

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-[64px] overflow-hidden">
        {/* warm bg blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#F5EDD4]/60 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#E8DCC8]/40 blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 py-20 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EDD4] text-[#8B6914] text-[12px] font-semibold tracking-wide mb-8">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
            Продюсер · Маркетолог · Наставник
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1917] mb-6">
            Помогаю экспертам<br />
            <span className="text-shimmer">зарабатывать</span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#78716C] leading-[1.7] max-w-[520px] mx-auto mb-10">
            От самозапуска на&nbsp;<span className="text-[#1C1917] font-semibold">300K</span>{" "}
            до системного бизнеса на&nbsp;<span className="text-[#1C1917] font-semibold">1+ млн</span>.
            Превращаю знания в стабильный доход.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={TG} target="_blank" rel="noopener noreferrer"
              className="btn-sweep flex items-center justify-center gap-2.5 h-[56px] px-8 rounded-full bg-[#1C1917] text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#2D2A26] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5">
              <TgIcon />
              Написать Карине
            </a>
            <a href={CH} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-[56px] px-8 rounded-full border border-[#E7E5E4] text-[15px] font-medium text-[#78716C] bg-white transition-all duration-200 hover:border-[#D6D3D1] hover:text-[#1C1917] hover:shadow-sm">
              Канал в Telegram
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-[#D6D3D1]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-6 reveal">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="card rounded-2xl py-8 px-4 text-center">
                <div className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-[#B8962E] leading-none mb-2">{s.value}</div>
                <div className="text-[clamp(0.65rem,1.3vw,0.8rem)] text-[#A8A29E] font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ AI TOOLS ════════ */}
      <section id="tools" className="py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="text-center reveal mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EDD4] text-[#8B6914] text-[12px] font-semibold tracking-wide mb-5">
              Бесплатно
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.8rem)] font-semibold leading-tight text-[#1C1917] tracking-[-0.02em]">
              AI-инструменты для экспертов
            </h2>
            <p className="text-[16px] text-[#78716C] mt-3 max-w-[420px] mx-auto">
              Получи персональный результат за 2 минуты
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((t, i) => (
              <Link key={i} href={t.href}
                className={`reveal reveal-d${Math.min(i + 1, 5)} group card card-hover rounded-2xl p-6 md:p-7 ${i === tools.length - 1 ? "md:col-span-2" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#F5EDD4] flex items-center justify-center text-[#B8962E] transition-all duration-300 group-hover:bg-[#B8962E] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(184,150,46,0.2)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={toolIconPaths[t.icon]} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[15px] font-semibold text-[#1C1917]">{t.title}</span>
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-[#B8962E] bg-[#F5EDD4] px-2 py-0.5 rounded-md">
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#78716C] leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="shrink-0 mt-1 text-[#D6D3D1] group-hover:text-[#B8962E] transition-all duration-300 group-hover:translate-x-1">
                    <Arrow />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROGRAMS ════════ */}
      <section id="programs" className="py-20 md:py-28 bg-[#F5F0EB]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="text-center reveal mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#78716C] text-[12px] font-semibold tracking-wide mb-5 shadow-sm">
              Программы
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.8rem)] font-semibold leading-tight text-[#1C1917] tracking-[-0.02em]">
              Работа с Кариной
            </h2>
          </div>

          {/* Featured card */}
          <div className="reveal mb-6">
            <div className="card-accent rounded-2xl overflow-hidden">
              <div className="p-8 md:p-10 lg:p-12">
                <div className="lg:flex lg:gap-12">
                  <div className="lg:flex-1">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#B8962E] text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-6">
                      Хит продаж
                    </span>
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#1C1917] mb-2">Формула САМОзапуска</h3>
                    <p className="text-[12px] uppercase tracking-[0.15em] text-[#A8A29E] font-medium mb-8">
                      6 модулей · 12 созвонов · поддержка 1 мес.
                    </p>
                    <ul className="space-y-3 mb-8 lg:mb-0">
                      {["Стратегия запуска под ключ", "Оффер, контент-план, воронка", "Мастермайнд-группа и куратор", "Шаблоны, чек-листы, скрипты", "Результат: от 300 000 ₽ за 6 недель"].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-[15px] text-[#57534E]">
                          <Check accent /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-[280px] lg:shrink-0 lg:flex lg:flex-col lg:justify-end pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E7E5E4] lg:pl-12">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#A8A29E] font-semibold mb-2">Стоимость</div>
                    <div className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold text-shimmer leading-none mb-8">
                      150 000 ₽
                    </div>
                    <a href={TG + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA"} target="_blank" rel="noopener noreferrer"
                      className="btn-sweep flex items-center justify-center gap-2.5 w-full h-[52px] rounded-full bg-[#1C1917] text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#2D2A26] hover:shadow-lg">
                      <TgIcon />
                      Узнать подробнее
                    </a>
                    <p className="text-[12px] text-[#A8A29E] mt-3 text-center">30+ экспертов уже запустились</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Распаковка суперсилы",
                sub: "Индивидуальная сессия · 3-4 часа · Zoom",
                features: ["Найдём уникальность и суперсилу", "Сформулируем позиционирование", "10+ тем для контента", "Разберём блоки и страхи"],
                price: "5 000 ₽",
                link: TG + "?text=%D0%A0%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0",
              },
              {
                title: "Наставничество с внедрением",
                sub: "Индивидуально · Команда Карины",
                features: ["Глубокий аудит проекта", "Персональная стратегия роста", "Ведение от идеи до продаж", "Мышление и масштабирование"],
                price: "по запросу",
                link: TG + "?text=%D0%9D%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE",
              },
            ].map((p, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} group card card-hover rounded-2xl p-7 md:p-8`}>
                <h3 className="font-display text-[clamp(1.1rem,2vw,1.35rem)] font-semibold text-[#1C1917] mb-1.5">{p.title}</h3>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#A8A29E] font-medium mb-6">{p.sub}</p>
                <ul className="space-y-2.5 mb-7">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-[14px] text-[#78716C]"><Check /> {f}</li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-[#E7E5E4]">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] font-semibold mb-1.5">Стоимость</div>
                  <div className="font-display text-[24px] font-semibold text-[#B8962E] leading-none mb-5">{p.price}</div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-[46px] rounded-full border border-[#E7E5E4] text-[13px] font-semibold text-[#78716C] transition-all duration-200 hover:border-[#B8962E] hover:text-[#B8962E] hover:bg-[#F5EDD4]/30">
                    Подробнее <Arrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ RESULTS ════════ */}
      <section id="results" className="py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="text-center reveal mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EDD4] text-[#8B6914] text-[12px] font-semibold tracking-wide mb-5">
              Кейсы
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.8rem)] font-semibold leading-tight text-[#1C1917] tracking-[-0.02em]">
              Результаты учеников
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <div key={i} className={`reveal reveal-d${Math.min(i + 1, 5)} card rounded-2xl p-6 md:p-7 ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className="font-display text-[clamp(1.4rem,2.5vw,1.75rem)] font-semibold text-[#B8962E] leading-none mb-2">{r.n}</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#A8A29E] font-medium mb-3">{r.sub}</div>
                <div className="text-[14px] text-[#78716C] leading-relaxed">{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MATERIALS ════════ */}
      <section className="py-16 md:py-24 bg-[#F5F0EB]">
        <div className="max-w-[720px] mx-auto px-6 md:px-12">
          <div className="text-center reveal mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#78716C] text-[12px] font-semibold tracking-wide mb-5 shadow-sm">
              Бесплатно
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-[#1C1917]">Материалы</h2>
          </div>
          <div className="space-y-3 reveal">
            {materials.map((m, i) => (
              <a key={i} href={TG + "?text=" + encodeURIComponent(m.k)} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 card card-hover rounded-xl px-5 py-4">
                <span className="text-[12px] font-mono text-[#D6D3D1] shrink-0 w-5 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14px] text-[#57534E] group-hover:text-[#1C1917] transition-colors flex-1 font-medium">{m.t}</span>
                <span className="shrink-0 ml-3 text-[#D6D3D1] group-hover:text-[#B8962E] transition-all group-hover:translate-x-1">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 reveal">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EDD4] text-[#8B6914] text-[12px] font-semibold tracking-wide mb-5">
              О себе
            </div>
          </div>
          <div className="card-accent rounded-2xl p-8 md:p-10 relative">
            <div className="absolute top-6 left-8 font-display text-[72px] leading-none text-[#B8962E]/10 select-none pointer-events-none">&ldquo;</div>
            <div className="relative space-y-5 text-[16px] text-[#57534E] leading-[1.8]">
              <p>
                <span className="text-[#1C1917] font-semibold">7 лет</span> в онлайн-бизнесе.
                Рекорд — <span className="text-[#1C1917] font-semibold">40 млн руб./мес</span> на 3 автоворонках.
              </p>
              <p>
                Живу в Стамбуле. Продавала в <span className="text-[#1C1917] font-semibold">50+ нишах</span> —
                от эзотерики до обучения профессиям.
              </p>
              <p>
                Провожу трансформационные распаковки, после которых эксперты начинают продавать.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="relative py-24 md:py-32 bg-[#1C1917] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B8962E]/[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center reveal">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.8rem)] font-semibold mb-5 leading-tight text-white tracking-[-0.02em]">
            Готов зарабатывать<br />на&nbsp;экспертности?
          </h2>
          <p className="text-[16px] text-white/50 mb-10 max-w-[400px] mx-auto leading-relaxed">
            Напиши «Разбор» — покажу, как выйти на&nbsp;300&nbsp;000&nbsp;₽ за&nbsp;6&nbsp;недель
          </p>

          <a href={TG + "?text=%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80"} target="_blank" rel="noopener noreferrer"
            className="btn-sweep inline-flex items-center gap-3 h-[58px] px-12 rounded-full bg-white text-[16px] font-semibold text-[#1C1917] transition-all duration-200 hover:bg-[#F5EDD4] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5">
            <TgIcon />
            Написать «Разбор»
          </a>
          <p className="text-[13px] text-white/30 mt-5">Бесплатная консультация, без обязательств</p>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-10 bg-[#1C1917]">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-[15px] text-white/40 font-medium tracking-tight">Карина Мамедова</span>
          <div className="flex gap-8">
            <a href={CH} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-white/70 transition-colors">Канал</a>
            <a href={TG} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-white/70 transition-colors">Написать</a>
          </div>
          <p className="text-[12px] text-white/20">&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
