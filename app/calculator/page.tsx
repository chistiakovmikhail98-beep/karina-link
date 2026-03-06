"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ToolLayout from "@/app/components/ToolLayout";

/* ─────────────── HELPERS ─────────────── */

/** Format number with spaces: 1000000 -> "1 000 000" */
function fmt(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

/** Animated counter hook — counts from 0 to target over `duration` ms */
function useAnimatedNumber(target: number, duration = 1200, active = true) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, active]);

  return value;
}

/* ─────────────── TYPES ─────────────── */

type LaunchType = "webinar" | "marathon" | "direct" | "autofunnel";

interface LaunchTypeOption {
  key: LaunchType;
  label: string;
  convRange: string;
  convMin: number;
  convMax: number;
  timeRange: string;
}

const LAUNCH_TYPES: LaunchTypeOption[] = [
  { key: "webinar", label: "Вебинар", convRange: "3-7%", convMin: 3, convMax: 7, timeRange: "2-3 нед." },
  { key: "marathon", label: "Марафон", convRange: "5-10%", convMin: 5, convMax: 10, timeRange: "3-4 нед." },
  { key: "direct", label: "Прямые продажи", convRange: "1-3%", convMin: 1, convMax: 3, timeRange: "1-2 нед." },
  { key: "autofunnel", label: "Автоворонка", convRange: "2-5%", convMin: 2, convMax: 5, timeRange: "4-6 нед." },
];

const PRICE_PRESETS = [3000, 5000, 10000, 30000, 50000, 100000, 150000];

/* ─────────────── COMPONENT ─────────────── */

export default function CalculatorPage() {
  /* — state — */
  const [audience, setAudience] = useState(500);
  const [audienceInput, setAudienceInput] = useState("500");
  const [price, setPrice] = useState(10000);
  const [customPrice, setCustomPrice] = useState("");
  const [isCustomPrice, setIsCustomPrice] = useState(false);
  const [launchType, setLaunchType] = useState<LaunchType>("webinar");
  const [hasExperience, setHasExperience] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  /* — derived calculations — */
  const lt = LAUNCH_TYPES.find((t) => t.key === launchType)!;
  const expMultiplier = hasExperience ? 1.5 : 1;

  // Pessimistic uses convMin, realistic uses midpoint, optimistic uses convMax
  const convPessimistic = (lt.convMin / 100) * expMultiplier;
  const convRealistic = (((lt.convMin + lt.convMax) / 2) / 100) * expMultiplier;
  const convOptimistic = (lt.convMax / 100) * expMultiplier;

  const revPessimistic = audience * convPessimistic * price;
  const revRealistic = audience * convRealistic * price;
  const revOptimistic = audience * convOptimistic * price;

  const leadsNeeded = Math.ceil(audience * convRealistic);

  // "Raised price" projection
  const raisedPrice = Math.round(price * 1.3);
  const revRaised = audience * convRealistic * raisedPrice;

  // "With mentor" multiplier
  const mentorMultiplier = 3.5;
  const revWithMentor = revRealistic * mentorMultiplier;

  /* — animated values — */
  const animPessimistic = useAnimatedNumber(revPessimistic, 1400, showResults);
  const animRealistic = useAnimatedNumber(revRealistic, 1400, showResults);
  const animOptimistic = useAnimatedNumber(revOptimistic, 1400, showResults);
  const animLeads = useAnimatedNumber(leadsNeeded, 1000, showResults);
  const animRaised = useAnimatedNumber(revRaised, 1200, showResults);
  const animMentor = useAnimatedNumber(revWithMentor, 1400, showResults);

  /* — handlers — */
  const handleAudienceSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setAudience(v);
    setAudienceInput(fmt(v));
  };

  const handleAudienceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, "").replace(/\u00A0/g, "");
    setAudienceInput(e.target.value);
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= 100 && n <= 100000) {
      setAudience(n);
    }
  };

  const handleAudienceBlur = () => {
    setAudienceInput(fmt(audience));
  };

  const handlePresetPrice = (p: number) => {
    setPrice(p);
    setIsCustomPrice(false);
    setCustomPrice("");
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, "").replace(/\u00A0/g, "");
    setCustomPrice(e.target.value);
    setIsCustomPrice(true);
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n > 0) {
      setPrice(n);
    }
  };

  const handleCalculate = useCallback(() => {
    setShowResults(false);
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1500);
  }, []);

  /* — slider background for Tailwind v4 — */
  const sliderPercent = ((audience - 100) / (100000 - 100)) * 100;

  /* — bar chart widths — */
  const barSoloWidth = showResults ? Math.min((revRealistic / revWithMentor) * 100, 100) : 0;
  const barMentorWidth = showResults ? 100 : 0;

  return (
    <ToolLayout
      title="Калькулятор запуска"
      subtitle="Узнай свой потенциал выручки"
      badge="Калькулятор"
    >
      {/* ───────── INPUT FORM ───────── */}
      <div className="space-y-5">

        {/* 1. Audience size */}
        <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
          <label className="block text-sm font-semibold text-[#1C1917] mb-1">
            Размер аудитории
          </label>
          <p className="text-[11px] text-[#A8A29E] mb-3">
            Подписчики, база email, контакты в мессенджерах
          </p>

          {/* number input */}
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              inputMode="numeric"
              value={audienceInput}
              onChange={handleAudienceInput}
              onBlur={handleAudienceBlur}
              className="w-full rounded-xl border border-[#E7E5E4] bg-white/[0.05] px-4 py-2.5 text-center text-lg font-bold text-[#B8962E] outline-none transition focus:border-[#B8962E]/50 focus:ring-1 focus:ring-[#B8962E]/30"
            />
          </div>

          {/* slider */}
          <div className="relative">
            <input
              type="range"
              min={100}
              max={100000}
              step={100}
              value={audience}
              onChange={handleAudienceSlider}
              className="w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #B8962E 0%, #B8962E ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%, rgba(255,255,255,0.1) 100%)`,
                WebkitAppearance: "none",
              }}
            />
            {/* Custom thumb via global style below */}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-[#A8A29E]">
            <span>100</span>
            <span>100 000</span>
          </div>
        </div>

        {/* 2. Average price */}
        <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
          <label className="block text-sm font-semibold text-[#1C1917] mb-1">
            Средний чек продукта
          </label>
          <p className="text-[11px] text-[#A8A29E] mb-3">
            Выберите из предложенных или введите свой
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {PRICE_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handlePresetPrice(p)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  price === p && !isCustomPrice
                    ? "bg-[#B8962E] text-[#FFFFFF] shadow-lg shadow-[#B8962E]/20"
                    : "border border-[#E7E5E4] bg-white/[0.05] text-[#57534E] hover:border-[#B8962E]/40 hover:text-[#1C1917]"
                }`}
              >
                {fmt(p)}&nbsp;₽
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Свой чек..."
              value={customPrice}
              onChange={handleCustomPriceChange}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold outline-none transition ${
                isCustomPrice
                  ? "border-[#B8962E]/50 bg-[#B8962E]/10 text-[#B8962E] ring-1 ring-[#B8962E]/30"
                  : "border-[#E7E5E4] bg-white/[0.05] text-[#78716C] placeholder:text-[#D6D3D1]"
              } focus:border-[#B8962E]/50 focus:ring-1 focus:ring-[#B8962E]/30`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A8A29E]">
              ₽
            </span>
          </div>
        </div>

        {/* 3. Launch type */}
        <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
          <label className="block text-sm font-semibold text-[#1C1917] mb-1">
            Тип запуска
          </label>
          <p className="text-[11px] text-[#A8A29E] mb-3">
            Выберите формат, который планируете
          </p>

          <div className="grid grid-cols-2 gap-2">
            {LAUNCH_TYPES.map((lt) => (
              <button
                key={lt.key}
                onClick={() => setLaunchType(lt.key)}
                className={`rounded-xl p-3 text-left transition-all duration-200 ${
                  launchType === lt.key
                    ? "border-2 border-[#B8962E] bg-[#B8962E]/10 shadow-lg shadow-[#B8962E]/10"
                    : "border border-[#E7E5E4] bg-white/[0.03] hover:border-[#E7E5E4]"
                }`}
              >
                <div
                  className={`text-sm font-bold ${
                    launchType === lt.key ? "text-[#B8962E]" : "text-[#1C1917]"
                  }`}
                >
                  {lt.label}
                </div>
                <div className="text-[11px] text-[#A8A29E] mt-0.5">
                  конверсия {lt.convRange}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Experience toggle */}
        <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-[#1C1917]">
                Был опыт продаж?
              </label>
              <p className="text-[11px] text-[#A8A29E] mt-0.5">
                Опыт увеличивает конверсию в 1.5 раза
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={() => setHasExperience((v) => !v)}
              className={`relative flex h-8 w-[88px] shrink-0 items-center rounded-full transition-colors duration-300 ${
                hasExperience
                  ? "bg-[#B8962E]"
                  : "bg-white/10"
              }`}
            >
              {/* labels inside toggle */}
              <span
                className={`absolute left-3 text-[11px] font-bold transition-opacity duration-200 ${
                  hasExperience ? "opacity-0" : "text-[#78716C] opacity-100"
                }`}
              >
                Нет
              </span>
              <span
                className={`absolute right-3 text-[11px] font-bold transition-opacity duration-200 ${
                  hasExperience ? "text-[#FFFFFF] opacity-100" : "opacity-0"
                }`}
              >
                Да
              </span>
              {/* thumb */}
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                  hasExperience ? "left-[58px]" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Calculate button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="pulse-gold w-full rounded-2xl bg-gradient-to-r from-[#B8962E] to-[#E8D5A0] py-4 text-base font-extrabold text-[#FFFFFF] transition-all duration-200 hover:shadow-lg hover:shadow-[#B8962E]/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCalculating ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Считаю...
            </span>
          ) : (
            "Рассчитать"
          )}
        </button>
      </div>

      {/* ───────── CALCULATING ANIMATION ───────── */}
      {isCalculating && (
        <div className="mt-6 flex flex-col items-center gap-3 py-8 fade-in-up">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#B8962E]/20" />
            <div className="absolute inset-2 animate-pulse rounded-full bg-[#B8962E]/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#B8962E] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-[#78716C] animate-pulse">
            Анализирую данные и строю прогноз...
          </p>
        </div>
      )}

      {/* ───────── RESULTS DASHBOARD ───────── */}
      {showResults && (
        <div ref={resultsRef} className="mt-6 space-y-4 fade-in-up">

          {/* Revenue prognosis — 3 columns */}
          <div className="rounded-2xl border border-[#B8962E]/20 bg-gradient-to-br from-[#B8962E]/10 to-transparent p-4">
            <h3 className="text-sm font-bold text-[#1C1917] mb-4 text-center">
              Прогноз выручки первого запуска
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {/* Pessimistic */}
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                  Пессимист.
                </div>
                <div className="text-lg font-extrabold text-[#57534E] leading-tight">
                  {fmt(animPessimistic)}
                </div>
                <div className="text-[10px] text-[#A8A29E] mt-0.5">₽</div>
              </div>

              {/* Realistic */}
              <div className="rounded-xl border border-[#B8962E]/30 bg-[#B8962E]/10 p-3 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#B8962E]/5 to-transparent" />
                <div className="relative">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#B8962E] mb-1.5">
                    Реалистич.
                  </div>
                  <div className="text-xl font-extrabold text-[#B8962E] leading-tight">
                    {fmt(animRealistic)}
                  </div>
                  <div className="text-[10px] text-[#B8962E]/60 mt-0.5">₽</div>
                </div>
              </div>

              {/* Optimistic */}
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                  Оптимист.
                </div>
                <div className="text-lg font-extrabold text-[#57534E] leading-tight">
                  {fmt(animOptimistic)}
                </div>
                <div className="text-[10px] text-[#A8A29E] mt-0.5">₽</div>
              </div>
            </div>
          </div>

          {/* Calculation breakdown */}
          <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
            <h3 className="text-sm font-bold text-[#1C1917] mb-3">
              Расчёт
            </h3>
            <div className="flex items-center justify-center gap-1 flex-wrap text-sm">
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-bold text-[#1C1917]">
                {fmt(audience)}
              </span>
              <span className="text-[#A8A29E]">&times;</span>
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-bold text-[#B8962E]">
                {(convRealistic * 100).toFixed(1)}%
              </span>
              <span className="text-[#A8A29E]">&times;</span>
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-bold text-[#1C1917]">
                {fmt(price)}&nbsp;₽
              </span>
              <span className="text-[#A8A29E]">=</span>
              <span className="rounded-lg bg-[#B8962E]/15 px-2.5 py-1.5 font-extrabold text-[#B8962E]">
                {fmt(animRealistic)}&nbsp;₽
              </span>
            </div>
          </div>

          {/* Leads needed + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1">
                Заявок нужно
              </div>
              <div className="text-2xl font-extrabold text-[#B8962E]">
                {fmt(animLeads)}
              </div>
              <div className="text-[10px] text-[#A8A29E] mt-1">
                при конверсии {(convRealistic * 100).toFixed(1)}%
              </div>
            </div>
            <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-1">
                Время до денег
              </div>
              <div className="text-2xl font-extrabold text-[#E8D5A0]">
                {lt.timeRange}
              </div>
              <div className="text-[10px] text-[#A8A29E] mt-1">
                формат: {lt.label.toLowerCase()}
              </div>
            </div>
          </div>

          {/* Bar chart: Solo vs Mentor */}
          <div className="rounded-2xl border border-[#E7E5E4] bg-white/[0.03] p-4">
            <h3 className="text-sm font-bold text-[#1C1917] mb-4">
              Сам vs С наставником
            </h3>

            {/* Solo bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#78716C]">Самостоятельно</span>
                <span className="text-xs font-bold text-[#57534E]">{fmt(animRealistic)} ₽</span>
              </div>
              <div className="h-7 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/10 transition-all duration-1000 ease-out"
                  style={{ width: `${barSoloWidth}%` }}
                />
              </div>
            </div>

            {/* Mentor bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#B8962E]">С наставником</span>
                <span className="text-xs font-bold text-[#B8962E]">{fmt(animMentor)} ₽</span>
              </div>
              <div className="h-7 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#B8962E] to-[#E8D5A0] transition-all duration-1000 ease-out relative"
                  style={{ width: `${barMentorWidth}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#B8962E]/15 px-3 py-1 text-[11px] font-bold text-[#B8962E]">
                  &times;{mentorMultiplier} к выручке с наставником
                </span>
              </div>
            </div>
          </div>

          {/* Raise price projection */}
          <div className="rounded-2xl border border-[#B8962E]/15 bg-gradient-to-r from-[#B8962E]/[0.07] to-transparent p-4">
            <h3 className="text-sm font-bold text-[#1C1917] mb-2">
              Если поднять чек на 30%...
            </h3>
            <p className="text-[11px] text-[#A8A29E] mb-3">
              Новый чек: <span className="font-bold text-[#78716C]">{fmt(raisedPrice)} ₽</span> вместо {fmt(price)} ₽
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-white/[0.05] p-3 text-center">
                <div className="text-[10px] text-[#A8A29E] mb-1">Было</div>
                <div className="text-base font-extrabold text-[#78716C]">{fmt(animRealistic)} ₽</div>
              </div>
              <div className="shrink-0">
                <svg className="w-5 h-5 text-[#B8962E]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <div className="flex-1 rounded-xl border border-[#B8962E]/30 bg-[#B8962E]/10 p-3 text-center">
                <div className="text-[10px] text-[#B8962E]/60 mb-1">Стало</div>
                <div className="text-base font-extrabold text-[#B8962E]">{fmt(animRaised)} ₽</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-[11px] text-[#A8A29E]">
                Разница: <span className="font-bold text-[#B8962E]">+{fmt(revRaised - revRealistic)} ₽</span>
              </span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl border border-[#B8962E]/25 bg-gradient-to-br from-[#B8962E]/15 to-[#FFFFFF] p-5 text-center">
            <p className="text-base font-bold text-[#1C1917] mb-1">
              Хочешь получить не прогноз,
            </p>
            <p className="text-base font-bold text-[#1C1917] mb-1">
              а реальные <span className="text-[#B8962E]">300К за 6 недель</span>?
            </p>
            <p className="text-[11px] text-[#A8A29E] mt-2 mb-4">
              Карина покажет как превратить эти цифры в деньги на счету
            </p>
            <a
              href="https://t.me/KARINA_ProZAPUSKI?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E"
              target="_blank"
              rel="noopener noreferrer"
              className="pulse-gold inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B8962E] to-[#E8D5A0] px-7 py-3 text-sm font-extrabold text-[#FFFFFF] transition hover:shadow-lg hover:shadow-[#B8962E]/30"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Записаться к Карине
            </a>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setShowResults(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full rounded-xl border border-[#E7E5E4] bg-white/[0.03] py-3 text-sm font-semibold text-[#78716C] transition hover:border-[#E7E5E4] hover:text-[#57534E]"
          >
            Пересчитать с другими данными
          </button>
        </div>
      )}

      {/* ───────── INLINE STYLES FOR SLIDER THUMB ───────── */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8D5A0, #B8962E);
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 8px rgba(200, 168, 78, 0.4);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 14px rgba(200, 168, 78, 0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8D5A0, #B8962E);
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 8px rgba(200, 168, 78, 0.4);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </ToolLayout>
  );
}
