"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";

/* ───────────────── TYPES ───────────────── */

interface CriterionResult {
  key: string;
  label: string;
  score: number;
  feedback: string;
  details: string;
  icon: React.ReactNode;
}

/* ───────────────── CONSTANTS ───────────────── */

const NICHES = [
  "Психология",
  "Коучинг",
  "Нутрициология",
  "Фитнес",
  "Бизнес",
  "Маркетинг",
  "Дизайн",
  "Образование",
  "Другое",
];

const ANALYSIS_STEPS = [
  "Проверяю понятность...",
  "Оцениваю результат...",
  "Анализирую уникальность...",
  "Проверяю ценность...",
  "Оцениваю призыв к действию...",
];

const PLACEHOLDER_OFFER = `Пример: «Помогу тебе выйти на доход 300 000 ₽ за 8 недель через систему запуска онлайн-курса. Ты получишь пошаговую стратегию, шаблоны, личное сопровождение и гарантию результата. Запишись на бесплатный разбор — напиши "ХОЧУ" в Telegram.»`;

/* ───────────────── ICONS ───────────────── */

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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

function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function CurrencyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function MegaphoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function LightbulbIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function DocumentIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function CopyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function ArrowPathIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
    </svg>
  );
}

/* ───────────────── CIRCULAR PROGRESS ───────────────── */

function CircularScore({ score, size = 72, strokeWidth = 5 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? "#22C55E" : score >= 40 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span
        className="absolute text-sm font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/* ───────────────── OVERALL SCORE CIRCLE (larger) ───────────────── */

function OverallScore({ score }: { score: number }) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? "#22C55E" : score >= 40 ? "#F59E0B" : "#EF4444";
  const label = score >= 70 ? "Сильный оффер" : score >= 40 ? "Нужна доработка" : "Слабый оффер";
  const bg = score >= 70 ? "rgba(34,197,94,0.08)" : score >= 40 ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.08)";

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: bg }}>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1500 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}</span>
          <span className="text-[10px] text-white/40">из 100</span>
        </div>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

/* ───────────────── SCORING LOGIC ───────────────── */

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[ё]/g, "е");
}

function scoreClarity(text: string): { score: number; feedback: string; details: string } {
  const normalized = normalizeText(text);
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLen = sentences.length > 0 ? wordCount / sentences.length : wordCount;

  let score = 60;

  // Optimal length: 20-60 words
  if (wordCount < 10) score -= 25;
  else if (wordCount < 20) score -= 10;
  else if (wordCount >= 20 && wordCount <= 60) score += 15;
  else if (wordCount <= 100) score += 5;
  else if (wordCount <= 150) score -= 10;
  else score -= 25;

  // Check for numbers (concrete specifics)
  const hasNumbers = /\d+/.test(text);
  if (hasNumbers) score += 15;

  // Short sentences are clearer
  if (avgSentenceLen <= 15) score += 10;
  else if (avgSentenceLen > 25) score -= 10;

  // Penalize jargon / complex words
  const jargonWords = ["парадигма", "синергия", "коллаборация", "имплементация", "фасилитация", "комплексный подход", "методология", "трансформационный", "холистический", "интеграция"];
  const jargonCount = jargonWords.filter(w => normalized.includes(w)).length;
  score -= jargonCount * 8;

  // Reward direct address
  const directAddress = ["ты ", "тебе ", "тебя ", "твой", "твоя", "твои", "твоё", "вы ", "вам ", "вас ", "ваш"];
  const hasDirectAddress = directAddress.some(w => normalized.includes(w));
  if (hasDirectAddress) score += 10;

  score = Math.max(5, Math.min(100, score));

  let feedback: string;
  let details: string;

  if (score >= 70) {
    feedback = "Оффер понятен с первого прочтения";
    details = "Ваш оффер достаточно краток и конкретен. Клиент сможет быстро понять, о чём речь. " +
      (hasNumbers ? "Наличие конкретных цифр усиливает доверие. " : "Добавьте конкретные цифры для усиления. ") +
      (hasDirectAddress ? "Прямое обращение к клиенту создаёт связь." : "Попробуйте обращаться напрямую к клиенту.");
  } else if (score >= 40) {
    feedback = "Можно упростить формулировки";
    details = `В оффере ${wordCount} слов. ` +
      (wordCount > 80 ? "Попробуйте сократить до 40-60 слов — читатель сканирует, а не читает. " : "") +
      (!hasNumbers ? "Добавьте конкретные цифры (сроки, суммы, количество). " : "") +
      (avgSentenceLen > 20 ? "Разбейте длинные предложения на короткие — по 10-15 слов." : "Структура предложений в порядке.");
  } else {
    feedback = "Оффер сложно понять за 5 секунд";
    details = `Текст из ${wordCount} слов ${wordCount > 100 ? "слишком длинный" : "слишком размытый"}. ` +
      "Клиент должен за 5 секунд понять: что это, для кого, какой результат. " +
      "Уберите абстрактные формулировки. Каждое предложение должно нести конкретный смысл.";
  }

  return { score, feedback, details };
}

function scoreResult(text: string): { score: number; feedback: string; details: string } {
  const normalized = normalizeText(text);

  let score = 35;

  // Result-oriented words
  const resultWords = [
    "получишь", "получите", "научишься", "научитесь", "заработаешь", "заработаете",
    "узнаешь", "узнаете", "сможешь", "сможете", "достигнешь", "достигнете",
    "выйдешь", "выйдете", "создашь", "создадите", "запустишь", "запустите",
    "увеличишь", "увеличите", "удвоишь", "удвоите", "вырастешь", "вырастете",
    "освоишь", "освоите", "построишь", "построите", "внедришь", "внедрите",
    "результат", "итог", "за неделю", "за месяц", "за день", "доход",
    "прибыль", "клиент", "заявк", "продаж", "выручк", "рост",
  ];
  const resultHits = resultWords.filter(w => normalized.includes(w)).length;
  score += Math.min(resultHits * 12, 45);

  // Concrete outcomes with numbers
  const outcomePatterns = [
    /\d+\s*₽/, /\d+\s*руб/, /\d+\s*тыс/, /\d+\s*млн/,
    /\d+\s*клиент/, /\d+\s*заяв/, /\d+\s*дн/, /\d+\s*недел/,
    /\d+\s*месяц/, /за\s+\d+/, /от\s+\d+/, /до\s+\d+/,
  ];
  const outcomeHits = outcomePatterns.filter(p => p.test(normalized)).length;
  score += Math.min(outcomeHits * 8, 25);

  // Penalize process words without result
  const processWords = ["расскажу", "покажу", "поделюсь", "объясню", "разберем", "разберём", "обсудим", "поговорим"];
  const processHits = processWords.filter(w => normalized.includes(w)).length;
  if (processHits > 0 && resultHits === 0) score -= processHits * 10;

  score = Math.max(5, Math.min(100, score));

  let feedback: string;
  let details: string;

  if (score >= 70) {
    feedback = "Оффер продаёт результат, а не процесс";
    details = "Вы говорите на языке результатов — клиент видит конкретную трансформацию, которую получит. " +
      (outcomeHits > 0 ? "Измеримые показатели (цифры, сроки) добавляют убедительности." : "Усильте цифрами и сроками.");
  } else if (score >= 40) {
    feedback = "Добавьте больше конкретных результатов";
    details = "Оффер частично описывает результат, но можно усилить. Вместо «расскажу как» используйте «ты получишь / ты заработаешь / ты научишься». " +
      "Добавьте конкретный измеримый результат: сумму, количество клиентов или сроки достижения.";
  } else {
    feedback = "Оффер описывает процесс, а не результат";
    details = "Клиент покупает не «обучение» и не «разбор», а конкретный результат: деньги, навык, решение проблемы. " +
      "Переформулируйте: что человек ПОЛУЧИТ после работы с вами? Какой конкретный результат в цифрах и сроках?";
  }

  return { score, feedback, details };
}

function scoreUniqueness(text: string): { score: number; feedback: string; details: string } {
  const normalized = normalizeText(text);

  let score = 55;

  // Generic overused words
  const genericWords = [
    "консультация", "помогу", "помощь", "помогаю", "поддержка", "сопровождение",
    "эффективный", "уникальный", "индивидуальный подход", "комплексный",
    "качественный", "профессиональный", "опытный", "лучший",
    "быстро и просто", "легко и просто", "с нуля",
  ];
  const genericHits = genericWords.filter(w => normalized.includes(w)).length;
  score -= genericHits * 8;

  // Uniqueness boosters
  const uniqueElements = [
    /мой метод/i, /моя систем/i, /авторск/i, /формул[аеуы]/i,
    /\d+\s*шаг/i, /\d+\s*этап/i, /\d+\s*модул/i,
    /гаранти/i, /без\s+\w+/i, /даже если/i, /в отличие/i,
    /единственн/i, /впервые/i, /только у/i,
  ];
  const uniqueHits = uniqueElements.filter(p => p.test(text)).length;
  score += Math.min(uniqueHits * 12, 35);

  // Specific niche language (specificity = uniqueness signal)
  const specificPatterns = [/\d+[-–]\d+/, /\d+\s*₽/, /кейс/i, /пример/i, /история/i];
  const specificHits = specificPatterns.filter(p => p.test(text)).length;
  score += specificHits * 5;

  score = Math.max(5, Math.min(100, score));

  let feedback: string;
  let details: string;

  if (score >= 70) {
    feedback = "Оффер выделяется среди конкурентов";
    details = "В вашем оффере есть элементы, которые отличают его от тысячи других. " +
      "Авторская методика, конкретная система или уникальное обещание помогают клиенту выбрать именно вас.";
  } else if (score >= 40) {
    feedback = "Оффер похож на конкурентов";
    details = "Слова вроде «помогу», «консультация», «индивидуальный подход» есть в каждом втором оффере. " +
      "Замените их на конкретику: назовите вашу методику, опишите формат, укажите отличие от других. " +
      "Почему клиент должен выбрать именно вас?";
  } else {
    feedback = "Оффер не отличается от 1000 конкурентов";
    details = "Ваш текст можно поставить на сайт любого конкурента — и он будет так же работать (или не работать). " +
      "Создайте уникальность: придумайте название метода, опишите конкретный формат, " +
      "добавьте «даже если...» или «в отличие от...». Клиент должен запомнить именно ваш оффер.";
  }

  return { score, feedback, details };
}

function scorePriceValue(text: string): { score: number; feedback: string; details: string } {
  const normalized = normalizeText(text);

  let score = 30;

  // Price mentioned
  const pricePatterns = [/\d+\s*₽/, /\d+\s*руб/, /\d+\s*р\./, /бесплатн/, /0\s*₽/, /free/i];
  const hasPriceMention = pricePatterns.some(p => p.test(normalized));
  if (hasPriceMention) score += 20;

  // Value mentioned
  const valueWords = [
    "бонус", "подарок", "включено", "входит", "получишь", "получите",
    "шаблон", "чек-лист", "гайд", "урок", "модул", "доступ",
    "гарантия", "возврат", "бесплатн", "пробн", "демо",
    "скидк", "акци", "специальн", "ограниченн",
  ];
  const valueHits = valueWords.filter(w => normalized.includes(w)).length;
  score += Math.min(valueHits * 10, 35);

  // ROI / payback
  const roiPatterns = [/окуп/, /вернёшь/, /вернешь/, /вернете/, /заработ.*больше/, /х\d+/, /в\s*\d+\s*раз/];
  const hasRoi = roiPatterns.some(p => p.test(normalized));
  if (hasRoi) score += 20;

  // Stacking value (multiple items)
  const stackingPatterns = [/\+\s*бонус/, /а также/, /и ещё/, /и еще/, /плюс/, /дополнительно/];
  const hasStacking = stackingPatterns.some(p => p.test(normalized));
  if (hasStacking) score += 10;

  score = Math.max(5, Math.min(100, score));

  let feedback: string;
  let details: string;

  if (score >= 70) {
    feedback = "Ценность оффера хорошо обоснована";
    details = "Клиент видит, что получает больше, чем платит. Упоминание бонусов, гарантий или конкретного состава услуги создаёт ощущение выгодной сделки.";
  } else if (score >= 40) {
    feedback = "Добавьте обоснование ценности";
    details = "Клиент должен чувствовать, что он получает в 10 раз больше, чем платит. Перечислите всё, что входит в оффер. " +
      "Добавьте бонусы. Укажите, сколько стоило бы покупать всё по отдельности. Упомяните гарантию.";
  } else {
    feedback = "Не понятно, за что платить";
    details = "В оффере нет информации о том, что конкретно клиент получает за свои деньги. " +
      "Перечислите состав: модули, уроки, шаблоны, созвоны. Добавьте бонусы. " +
      "Покажите ROI: «вложи X — получи Y». Гарантия возврата снимает страх покупки.";
  }

  return { score, feedback, details };
}

function scoreCTA(text: string): { score: number; feedback: string; details: string } {
  const normalized = normalizeText(text);

  let score = 20;

  // Direct CTA words
  const ctaWords = [
    "запишись", "запишитесь", "напиши", "напишите",
    "оставь", "оставьте", "нажми", "нажмите",
    "переходи", "переходите", "регистрируйся", "регистрируйтесь",
    "бронируй", "бронируйте", "забери", "заберите",
    "скачай", "скачайте", "получи", "получите",
    "записаться", "написать", "оставить заявку",
    "жми", "кликай", "забронируй", "успей",
  ];
  const ctaHits = ctaWords.filter(w => normalized.includes(w)).length;
  score += Math.min(ctaHits * 20, 45);

  // Urgency
  const urgencyWords = ["сейчас", "сегодня", "осталось", "ограничен", "только", "последн", "успей", "до конца"];
  const urgencyHits = urgencyWords.filter(w => normalized.includes(w)).length;
  score += Math.min(urgencyHits * 10, 20);

  // Channel mentioned
  const channelPatterns = [/telegram/i, /телеграм/, /whatsapp/i, /ватсап/, /директ/, /ссылк/, /форм[аеуы]/, /кнопк/];
  const hasChannel = channelPatterns.some(p => p.test(normalized));
  if (hasChannel) score += 15;

  // Lowering the barrier
  const lowBarrier = ["бесплатн", "пробн", "без обязательств", "ни к чему не обязывает", "демо", "разбор", "диагностик"];
  const hasLowBarrier = lowBarrier.some(w => normalized.includes(w));
  if (hasLowBarrier) score += 10;

  score = Math.max(5, Math.min(100, score));

  let feedback: string;
  let details: string;

  if (score >= 70) {
    feedback = "Чёткий призыв к действию";
    details = "Клиент точно знает, что делать дальше. Конкретное действие + канал связи + (в идеале) ощущение срочности — формула сильного CTA.";
  } else if (score >= 40) {
    feedback = "Призыв есть, но можно усилить";
    details = "Добавьте конкретику: не просто «напишите», а «напишите слово ХОЧУ в Telegram». " +
      "Укажите, что произойдёт дальше: «я отвечу в течение часа». " +
      "Снизьте барьер: «это бесплатно и ни к чему не обязывает».";
  } else {
    feedback = "Нет чёткого следующего шага";
    details = "Клиент прочитал оффер — и не знает, что делать дальше. Добавьте конкретный призыв: " +
      "«Напиши ХОЧУ в Telegram @name», «Запишись по ссылке», «Оставь заявку — кнопка ниже». " +
      "Один оффер = одно действие. Не давайте выбор из 5 вариантов.";
  }

  return { score, feedback, details };
}

/* ───────────────── IMPROVED OFFER GENERATOR ───────────────── */

function generateImprovedOffer(text: string, niche: string, scores: CriterionResult[]): string {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);

  // Extract key elements from the original text
  const hasNumbers = /\d+/.test(text);
  const numberMatch = text.match(/\d[\d\s]*(?:₽|руб|тыс|млн|дней|недел|месяц|шаг|модул|урок|клиент|заяв)/gi);
  const numbers = numberMatch ? numberMatch.map(n => n.trim()) : [];

  // Detect if there's a result mentioned
  const resultPatterns = /получишь|научишься|заработаешь|выйдешь|создашь|запустишь|увеличишь|сможешь/i;
  const hasResult = resultPatterns.test(text);

  // Detect CTA
  const ctaPattern = /напиши|запишись|оставь|нажми|переходи|забери|скачай|регистрируйся/i;
  const ctaMatch = text.match(ctaPattern);

  // Build improved version
  const parts: string[] = [];

  // 1. Strong hook
  const nicheTarget: Record<string, string> = {
    "Психология": "психолог",
    "Коучинг": "коуч",
    "Нутрициология": "нутрициолог",
    "Фитнес": "фитнес-тренер",
    "Бизнес": "предприниматель",
    "Маркетинг": "маркетолог",
    "Дизайн": "дизайнер",
    "Образование": "эксперт в обучении",
    "Другое": "эксперт",
  };
  const target = nicheTarget[niche] || "эксперт";

  // Extract the core promise from original text
  const corePromise = sentences[0] || text.slice(0, 100);

  // Build a structured improved offer
  // Line 1: Hook with result
  if (hasResult && sentences.length > 0) {
    const cleaned = sentences[0].replace(/^(помогу|помогаю|я помогу|я помогаю)\s+/i, "");
    parts.push(cleaned.charAt(0).toUpperCase() + cleaned.slice(1));
  } else {
    // Rewrite generic opening with result focus
    const mainIdea = sentences[0] || `Система для ${target}ов`;
    parts.push(mainIdea.charAt(0).toUpperCase() + mainIdea.slice(1));
  }

  // Line 2: What you get (if numbers exist, use them)
  if (numbers.length > 0) {
    parts.push(`Конкретный результат: ${numbers.slice(0, 3).join(", ")}`);
  } else if (sentences.length > 1) {
    parts.push(sentences[1].charAt(0).toUpperCase() + sentences[1].slice(1));
  }

  // Line 3: What's included (from middle sentences)
  if (sentences.length > 2) {
    const middleParts = sentences.slice(2, -1);
    if (middleParts.length > 0) {
      parts.push(middleParts.join(". "));
    }
  }

  // Line 4: Value addition (if missing in original)
  const clarityScore = scores.find(s => s.key === "price_value")?.score || 0;
  if (clarityScore < 60) {
    parts.push("Включено: пошаговая стратегия + шаблоны + личная поддержка");
  }

  // Line 5: CTA (strengthen existing or add new)
  const ctaScore = scores.find(s => s.key === "cta")?.score || 0;
  if (ctaMatch && ctaScore >= 50) {
    const lastSentence = sentences[sentences.length - 1];
    parts.push(lastSentence);
  } else {
    parts.push(`Напиши "ХОЧУ" — и я расскажу подробности (это бесплатно)`);
  }

  return parts.filter(Boolean).join(".\n\n");
}

/* ───────────────── IMPROVEMENT TIPS GENERATOR ───────────────── */

function generateTips(scores: CriterionResult[]): string[] {
  const sorted = [...scores].sort((a, b) => a.score - b.score);
  const tips: string[] = [];

  for (const criterion of sorted) {
    if (tips.length >= 3) break;

    switch (criterion.key) {
      case "clarity":
        if (criterion.score < 70)
          tips.push("Сократите оффер до 2-3 предложений. Клиент должен понять суть за 5 секунд, не перечитывая");
        break;
      case "result":
        if (criterion.score < 70)
          tips.push("Замените описание процесса на конкретный результат с цифрами: «Ты заработаешь X за Y дней»");
        break;
      case "uniqueness":
        if (criterion.score < 70)
          tips.push("Дайте название своему методу и укажите, чем он отличается от обычных консультаций");
        break;
      case "price_value":
        if (criterion.score < 70)
          tips.push("Перечислите всё, что входит в программу, и добавьте 1-2 бонуса — пусть ценность превышает цену в 10 раз");
        break;
      case "cta":
        if (criterion.score < 70)
          tips.push("Добавьте конкретный призыв: «Напиши ХОЧУ в Telegram» — одно действие, низкий барьер входа");
        break;
    }
  }

  // If all scores are high, add aspirational tips
  while (tips.length < 3) {
    const fillers = [
      "Добавьте отзыв или кейс для социального доказательства",
      "Протестируйте 2-3 варианта оффера на целевой аудитории",
      "Добавьте дедлайн или ограничение для усиления срочности",
    ];
    tips.push(fillers[tips.length]!);
  }

  return tips.slice(0, 3);
}

/* ───────────────── MAIN COMPONENT ───────────────── */

export default function AuditPage() {
  const [step, setStep] = useState<"input" | "loading" | "results">("input");
  const [offerText, setOfferText] = useState("");
  const [niche, setNiche] = useState("Психология");
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [results, setResults] = useState<CriterionResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [improvedOffer, setImprovedOffer] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [animatedScores, setAnimatedScores] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const runAnalysis = useCallback(() => {
    if (!offerText.trim()) return;

    setStep("loading");
    setLoadingStep(0);
    setLoadingProgress(0);

    // Animate through steps
    const stepDuration = 600; // 600ms per step = 3000ms total
    let currentStep = 0;

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep >= ANALYSIS_STEPS.length) {
        clearInterval(stepInterval);
      } else {
        setLoadingStep(currentStep);
      }
    }, stepDuration);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    // Calculate results after animation
    setTimeout(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);

      const clarity = scoreClarity(offerText);
      const result = scoreResult(offerText);
      const uniqueness = scoreUniqueness(offerText);
      const priceValue = scorePriceValue(offerText);
      const cta = scoreCTA(offerText);

      const criteriaResults: CriterionResult[] = [
        {
          key: "clarity",
          label: "Понятность",
          score: clarity.score,
          feedback: clarity.feedback,
          details: clarity.details,
          icon: <EyeIcon className="w-5 h-5" />,
        },
        {
          key: "result",
          label: "Результат",
          score: result.score,
          feedback: result.feedback,
          details: result.details,
          icon: <RocketIcon className="w-5 h-5" />,
        },
        {
          key: "uniqueness",
          label: "Уникальность",
          score: uniqueness.score,
          feedback: uniqueness.feedback,
          details: uniqueness.details,
          icon: <SparklesIcon className="w-5 h-5" />,
        },
        {
          key: "price_value",
          label: "Цена-ценность",
          score: priceValue.score,
          feedback: priceValue.feedback,
          details: priceValue.details,
          icon: <CurrencyIcon className="w-5 h-5" />,
        },
        {
          key: "cta",
          label: "Призыв к действию",
          score: cta.score,
          feedback: cta.feedback,
          details: cta.details,
          icon: <MegaphoneIcon className="w-5 h-5" />,
        },
      ];

      const avg = Math.round(
        criteriaResults.reduce((sum, c) => sum + c.score, 0) / criteriaResults.length
      );

      setResults(criteriaResults);
      setOverallScore(avg);
      setTips(generateTips(criteriaResults));
      setImprovedOffer(generateImprovedOffer(offerText, niche, criteriaResults));
      setStep("results");

      // Trigger score animation after render
      setTimeout(() => setAnimatedScores(true), 100);
    }, 3000);
  }, [offerText, niche]);

  const resetForm = () => {
    setStep("input");
    setOfferText("");
    setResults([]);
    setOverallScore(0);
    setExpandedCard(null);
    setImprovedOffer("");
    setTips([]);
    setCopied(false);
    setAnimatedScores(false);
  };

  const copyImprovedOffer = async () => {
    try {
      await navigator.clipboard.writeText(improvedOffer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = improvedOffer;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Scroll to results when they appear
  useEffect(() => {
    if (step === "results" && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  return (
    <ToolLayout
      title="Аудит оффера"
      subtitle="Проверь свой оффер по 5 критериям"
      badge="AI"
    >
      {/* ═══════════════════ INPUT SCREEN ═══════════════════ */}
      {step === "input" && (
        <div className="space-y-5 fade-in-up">
          {/* Intro */}
          <div className="glass-card rounded-2xl/60 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A55A]/10 text-[#C8A55A]">
                <LightbulbIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-white/70 leading-relaxed">
                  Вставь текст своего оффера — AI проанализирует его по 5 критериям и подскажет, как усилить
                </p>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Текст оффера
            </label>
            <textarea
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder={PLACEHOLDER_OFFER}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-[#141414]/80 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#C8A55A]/50 focus:ring-1 focus:ring-[#C8A55A]/25 resize-none"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-white/30">
                Вставь текст своего оффера
              </span>
              <span className={`text-[11px] ${offerText.trim().split(/\s+/).filter(Boolean).length > 150 ? "text-red-400" : "text-white/30"}`}>
                {offerText.trim() ? offerText.trim().split(/\s+/).filter(Boolean).length : 0} слов
              </span>
            </div>
          </div>

          {/* Niche selector */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Ниша
            </label>
            <div className="relative">
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#141414]/80 px-4 py-3 pr-10 text-sm text-white outline-none transition-all focus:border-[#C8A55A]/50 focus:ring-1 focus:ring-[#C8A55A]/25 cursor-pointer"
              >
                {NICHES.map(n => (
                  <option key={n} value={n} className="bg-[#141414] text-white">
                    {n}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={runAnalysis}
            disabled={!offerText.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C8A55A] py-3.5 text-sm font-bold text-[#141414] transition-all hover:bg-[#E8D5A0] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#C8A55A] pulse-gold"
          >
            <DocumentIcon className="w-5 h-5" />
            Проанализировать
          </button>
        </div>
      )}

      {/* ═══════════════════ LOADING SCREEN ═══════════════════ */}
      {step === "loading" && (
        <div className="flex flex-col items-center justify-center py-12 fade-in-up">
          {/* Scanning animation */}
          <div className="relative w-24 h-24 mb-8">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-[#C8A55A]/20"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            {/* Middle ring */}
            <div
              className="absolute inset-2 rounded-full border-2 border-[#C8A55A]/30"
              style={{ animation: "pulse 2s ease-in-out infinite 0.3s" }}
            />
            {/* Inner ring */}
            <div
              className="absolute inset-4 rounded-full border-2 border-[#C8A55A]/40"
              style={{ animation: "pulse 2s ease-in-out infinite 0.6s" }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <DocumentIcon className="w-8 h-8 text-[#C8A55A]" />
            </div>
            {/* Rotating scanner line */}
            <div
              className="absolute inset-0"
              style={{
                animation: "spin 2s linear infinite",
                transformOrigin: "center",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1/2 bg-gradient-to-b from-[#C8A55A] to-transparent rounded-full" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2">
            Анализирую оффер...
          </h3>

          {/* Current step text */}
          <p className="text-sm text-[#C8A55A] mb-6 h-5 transition-all duration-300">
            {ANALYSIS_STEPS[loadingStep]}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C8A55A] to-[#E8D5A0] transition-all duration-100 ease-linear"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex justify-between mt-3">
              {ANALYSIS_STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= loadingStep ? "bg-[#C8A55A] scale-110" : "bg-white/10"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════ RESULTS SCREEN ═══════════════════ */}
      {step === "results" && (
        <div ref={resultsRef} className="space-y-5 fade-in-up">
          {/* Overall score */}
          <OverallScore score={animatedScores ? overallScore : 0} />

          {/* Individual criteria */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
              Оценка по критериям
            </h3>

            {results.map((criterion, i) => {
              const isExpanded = expandedCard === criterion.key;
              return (
                <button
                  key={criterion.key}
                  onClick={() => setExpandedCard(isExpanded ? null : criterion.key)}
                  className="w-full text-left rounded-xl border border-white/8 bg-[#141414]/60 transition-all duration-300 hover:border-[#C8A55A]/20 overflow-hidden"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Main row */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C8A55A]/10 text-[#C8A55A]">
                      {criterion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">
                        {criterion.label}
                      </div>
                      <div className="text-xs text-white/45 truncate">
                        {criterion.feedback}
                      </div>
                    </div>
                    <CircularScore score={animatedScores ? criterion.score : 0} size={52} strokeWidth={4} />
                    <ChevronDownIcon
                      className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Expanded details */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="border-t border-white/5 pt-3">
                        <p className="text-xs text-white/60 leading-relaxed">
                          {criterion.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* What to improve */}
          <div className="glass-card rounded-2xl/60 p-5">
            <div className="flex items-center gap-2 mb-4">
              <LightbulbIcon className="w-5 h-5 text-[#C8A55A]" />
              <h3 className="text-sm font-bold text-white">Что улучшить</h3>
            </div>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8A55A]/15 text-[10px] font-bold text-[#C8A55A] mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/70 leading-relaxed">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improved offer */}
          <div className="rounded-2xl border border-[#C8A55A]/25 bg-gradient-to-br from-[#C8A55A]/8 to-[#C8A55A]/3 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-[#C8A55A]" />
                <h3 className="text-sm font-bold text-white">Улучшенный оффер</h3>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); copyImprovedOffer(); }}
                className="flex items-center gap-1.5 rounded-lg bg-[#C8A55A]/15 px-3 py-1.5 text-xs font-medium text-[#C8A55A] transition-all hover:bg-[#C8A55A]/25"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    Копировать
                  </>
                )}
              </button>
            </div>
            <div className="rounded-xl bg-[#141414]/80 border border-white/5 p-4">
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {improvedOffer}
              </p>
            </div>
          </div>

          {/* Try again */}
          <button
            onClick={resetForm}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#C8A55A]/25 py-3 text-sm font-semibold text-[#C8A55A] transition-all hover:bg-[#C8A55A]/10"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Проверить другой оффер
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
