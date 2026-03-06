"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";

/* ───────────────── TYPES ───────────────── */

interface Answers {
  name: string;
  niche: string;
  nicheCustom: string;
  experience: string;
  clientThanks: string;
  bestAt: string;
  clientResult: string;
  annoys: string;
  energy: string;
  explain10yo: string;
  currentIncome: string;
  desiredIncome: string;
  blockers: string[];
}

interface Results {
  superpower: string;
  positioning: string;
  contentTopics: string[];
  mainError: string;
  score: number;
}

/* ───────────────── CONSTANTS ───────────────── */

const NICHES = [
  "Психология",
  "Коучинг",
  "Нутрициология",
  "Фитнес",
  "Бизнес-консалтинг",
  "Маркетинг",
  "Дизайн",
  "Образование",
  "Эзотерика",
  "Медицина",
  "Финансы",
  "Другое",
];

const EXPERIENCE_OPTIONS = [
  "Меньше 1 года",
  "1-3 года",
  "3-5 лет",
  "5-10 лет",
  "10+ лет",
];

const INCOME_CURRENT = [
  "0-50К",
  "50-100К",
  "100-300К",
  "300-500К",
  "500К-1М",
  "1М+",
];

const INCOME_DESIRED = [
  "100-300К",
  "300-500К",
  "500К-1М",
  "1М-3М",
  "3М+",
];

const BLOCKERS = [
  "Не знаю свою уникальность",
  "Боюсь продавать",
  "Нет стратегии",
  "Синдром самозванца",
  "Нет аудитории",
  "Не умею делать контент",
  "Выгорание",
];

const TOTAL_STEPS = 12;

/* ───────────────── RESULT GENERATION ───────────────── */

function generateResults(a: Answers): Results {
  const niche = a.niche === "Другое" ? a.nicheCustom : a.niche;
  const nicheLower = niche.toLowerCase();

  /* ── Superpower (q4 + q5 + q8) ── */
  const thanksWords = extractKeyPhrases(a.clientThanks);
  const bestWords = extractKeyPhrases(a.bestAt);
  const energyWords = extractKeyPhrases(a.energy);

  const superpowerTemplates = [
    `${a.name}, твоя суперсила — это умение ${bestWords} так, что клиенты благодарят тебя за ${thanksWords}. Ты заряжаешься, когда ${energyWords}, и именно это делает тебя уникальным экспертом в ${nicheLower}.`,
    `Твоя суперсила, ${a.name}, — это редкое сочетание: ${bestWords} в сфере ${nicheLower}. Клиенты ценят тебя за ${thanksWords}, а максимум энергии ты получаешь от ${energyWords}. Это твоё конкурентное преимущество.`,
    `${a.name}, ты — эксперт, который ${bestWords} в ${nicheLower}. Твоя уникальность в том, что ${thanksWords}, а драйв ты получаешь, когда ${energyWords}. Это и есть твоя суперсила.`,
  ];
  const superpower = superpowerTemplates[hashString(a.name) % superpowerTemplates.length];

  /* ── Positioning (q6 — client result) ── */
  const resultPhrase = trimToSentence(a.clientResult);
  const nicheAudience = getNicheAudience(niche);
  const positioning = `Я помогаю ${nicheAudience} ${resultPhrase} через ${getMethodFromNiche(niche, a.bestAt)}`;

  /* ── Content topics (q7 — annoys, inverted + niche) ── */
  const annoyTopics = generateContentFromAnnoyance(a.annoys, niche);
  const nicheTopics = getNicheContentTopics(niche);
  const allTopics = [...annoyTopics, ...nicheTopics];
  const contentTopics = pickUnique(allTopics, 3, a.name);

  /* ── Main error (q12 — blockers) ── */
  const mainError = generateMainError(a.blockers, niche, a.name);

  /* ── Score ── */
  const score = calculateScore(a);

  return { superpower, positioning, contentTopics, mainError, score };
}

function extractKeyPhrases(text: string): string {
  const cleaned = text
    .replace(/[.!?,;:()]/g, "")
    .trim()
    .toLowerCase();
  const words = cleaned.split(/\s+/).filter((w) => w.length > 3);
  if (words.length <= 5) return cleaned;
  return words.slice(0, 8).join(" ");
}

function trimToSentence(text: string): string {
  const cleaned = text.trim();
  const firstSentence = cleaned.split(/[.!?]/)[0].trim().toLowerCase();
  if (firstSentence.length > 80) {
    return firstSentence.slice(0, 80).replace(/\s\S*$/, "...");
  }
  return firstSentence;
}

function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getNicheAudience(niche: string): string {
  const map: Record<string, string> = {
    "Психология": "людям",
    "Коучинг": "тем, кто хочет расти",
    "Нутрициология": "тем, кто заботится о здоровье",
    "Фитнес": "тем, кто хочет быть в форме",
    "Бизнес-консалтинг": "предпринимателям",
    "Маркетинг": "экспертам и бизнесам",
    "Дизайн": "брендам и экспертам",
    "Образование": "тем, кто хочет учиться",
    "Эзотерика": "тем, кто ищет себя",
    "Медицина": "тем, кто заботится о здоровье",
    "Финансы": "тем, кто хочет управлять деньгами",
  };
  return map[niche] || "людям";
}

function getMethodFromNiche(niche: string, bestAt: string): string {
  const bestLower = bestAt.toLowerCase();
  if (bestLower.length > 3) {
    const shortBest = bestLower.split(/[.!?,;]/)[0].trim();
    if (shortBest.length <= 60 && shortBest.length > 5) {
      return shortBest;
    }
  }
  const map: Record<string, string> = {
    "Психология": "глубинную работу с мышлением и эмоциями",
    "Коучинг": "системный подход к трансформации",
    "Нутрициология": "индивидуальные программы питания",
    "Фитнес": "персональные тренировочные программы",
    "Бизнес-консалтинг": "стратегическое планирование и внедрение",
    "Маркетинг": "проверенные стратегии продвижения",
    "Дизайн": "визуальные решения, которые продают",
    "Образование": "структурированные образовательные программы",
    "Эзотерика": "практики осознанности и самопознания",
    "Медицина": "доказательный подход к здоровью",
    "Финансы": "финансовое планирование и стратегию",
  };
  return map[niche] || "индивидуальный подход и экспертность";
}

function generateContentFromAnnoyance(annoys: string, niche: string): string[] {
  const lower = annoys.toLowerCase();
  const topics: string[] = [];

  if (lower.includes("не понимают") || lower.includes("не ценят") || lower.includes("не слушают")) {
    topics.push(`Почему ${niche.toLowerCase()} — это не магия, а система: как объяснить клиентам ценность`);
  }
  if (lower.includes("ожида") || lower.includes("хотят быстр") || lower.includes("мгновенн")) {
    topics.push(`Реалистичные сроки результатов: честный разговор с аудиторией`);
  }
  if (lower.includes("цен") || lower.includes("дорого") || lower.includes("торг")) {
    topics.push(`Почему дешёвый эксперт обходится дороже: как формировать ценность`);
  }
  if (lower.includes("ответственность") || lower.includes("не делают") || lower.includes("ленятся")) {
    topics.push(`5 вещей, которые отличают клиентов, которые получают результат`);
  }
  if (lower.includes("границ") || lower.includes("пишут ночью") || lower.includes("личн")) {
    topics.push(`Как выстроить здоровые границы с клиентами и не выгореть`);
  }

  // Fallback inversions
  if (topics.length < 2) {
    topics.push(`Мифы о ${niche.toLowerCase()}: что на самом деле важно для результата`);
    topics.push(`Топ-3 ошибки клиентов в ${niche.toLowerCase()} и как их избежать`);
  }

  return topics;
}

function getNicheContentTopics(niche: string): string[] {
  const map: Record<string, string[]> = {
    "Психология": [
      "Как перестать откладывать жизнь на потом: 3 техники",
      "Синдром самозванца у экспертов: почему ты обесцениваешь себя",
      "Как говорить о своих услугах без стыда и страха",
    ],
    "Коучинг": [
      "Колесо баланса 2.0: почему классический инструмент не работает",
      "Как ставить цели, которые зажигают, а не давят",
      "3 вопроса, которые помогут найти свою точку роста",
    ],
    "Нутрициология": [
      "Почему диеты не работают: взгляд нутрициолога",
      "5 признаков, что вам нужно пересмотреть рацион",
      "Мифы о правильном питании, в которые верят даже эксперты",
    ],
    "Фитнес": [
      "Почему ты не видишь результатов в зале: 5 причин",
      "Тренировки дома vs зал: честное сравнение",
      "Как выбрать тренера и не разочароваться",
    ],
    "Бизнес-консалтинг": [
      "3 стратегии роста, которые работают в 2025",
      "Почему ваш бизнес буксует: взгляд со стороны",
      "Как нанять первого сотрудника и не пожалеть",
    ],
    "Маркетинг": [
      "Контент, который продаёт: формула для экспертов",
      "Почему ваш блог не приносит клиентов: 5 ошибок",
      "Как создать воронку продаж за выходные",
    ],
    "Дизайн": [
      "Почему красивый дизайн не всегда продаёт",
      "Тренды визуала, которые работают для экспертов",
      "Как создать фирменный стиль без дизайнера",
    ],
    "Образование": [
      "Как структурировать знания в онлайн-курс",
      "5 ошибок начинающих преподавателей онлайн",
      "Геймификация в обучении: как удержать внимание",
    ],
    "Эзотерика": [
      "Как объяснить свою работу скептикам",
      "Практика vs теория: что на самом деле даёт результат",
      "Почему эзотерика и бизнес — не противоречие",
    ],
    "Медицина": [
      "Доказательная медицина: как отличить факт от мифа",
      "Профилактика vs лечение: на чём делать акцент",
      "Как говорить с пациентами на их языке",
    ],
    "Финансы": [
      "3 привычки, которые меняют финансовое мышление",
      "Подушка безопасности: сколько на самом деле нужно",
      "Как начать инвестировать с минимальным бюджетом",
    ],
  };
  return map[niche] || [
    `Как найти свою нишу и уникальность в ${niche.toLowerCase()}`,
    `Топ ошибок экспертов в ${niche.toLowerCase()}`,
    `Как привлекать клиентов в ${niche.toLowerCase()} через контент`,
  ];
}

function pickUnique(items: string[], count: number, seed: string): string[] {
  const h = hashString(seed);
  const shuffled = [...items].sort((a, b) => {
    const ha = hashString(a + seed);
    const hb = hashString(b + seed);
    return ha - hb;
  });
  // Remove near-duplicates
  const result: string[] = [];
  for (const item of shuffled) {
    if (result.length >= count) break;
    const isDuplicate = result.some(
      (r) => r.toLowerCase().slice(0, 20) === item.toLowerCase().slice(0, 20)
    );
    if (!isDuplicate) result.push(item);
  }
  return result.length >= count ? result : shuffled.slice(0, count);
}

function generateMainError(blockers: string[], niche: string, name: string): string {
  if (blockers.length === 0) {
    return `${name}, похоже, у тебя нет явных блоков — но именно это может быть ловушкой. Часто мы не видим свои ограничения, потому что привыкли к ним. Рекомендую пройти глубинную распаковку, чтобы найти скрытые точки роста.`;
  }

  const primary = blockers[0];
  const errorMap: Record<string, string> = {
    "Не знаю свою уникальность": `${name}, твоя главная ошибка — ты пытаешься быть «как все» в ${niche.toLowerCase()}. Пока ты не сформулируешь, чем ты отличаешься, клиенты будут выбирать по цене. Тебе нужна глубинная распаковка суперсилы, после которой ты чётко скажешь: «Я — единственный, кто делает ЭТО».`,
    "Боюсь продавать": `${name}, ты обесцениваешь свою экспертность. Ты думаешь, что продавать = навязывать. Но правда в том, что НЕ продавать — значит отказывать людям в помощи. Твоя задача — начать говорить о своих услугах как о решении, которое меняет жизни.`,
    "Нет стратегии": `${name}, ты действуешь хаотично. Пост здесь, сторис там, консультация по наитию. Без стратегии ты сжигаешь энергию впустую. Тебе нужен чёткий план: продукт → аудитория → контент → продажи. Пошагово, без суеты.`,
    "Синдром самозванца": `${name}, ты знаешь больше, чем 90% своей аудитории, но всё равно чувствуешь себя «недостаточно». Это не правда — это программа. Твоя задача — начать говорить о результатах клиентов, а не о своих дипломах. Результаты — вот что доказывает экспертность.`,
    "Нет аудитории": `${name}, отсутствие аудитории — это не приговор, а задача. Ошибка в том, что ты ждёшь, пока «наберётся» подписчиков. Но даже с 200 подписчиками можно сделать запуск на 300К+. Начни с тёплой базы и правильного оффера.`,
    "Не умею делать контент": `${name}, контент — это не про идеальные тексты и красивые фото. Это про пользу и честность. Твоя ошибка — ты думаешь, что нужно быть блогером. Нет. Нужно быть экспертом, который делится опытом. 3 поста в неделю по формуле — и клиенты придут.`,
    "Выгорание": `${name}, ты выгораешь, потому что делаешь всё сам и берёшь на себя слишком много. Главная ошибка — работать НА бизнес, а не В бизнесе. Тебе нужно делегировать, поднять чек и работать с меньшим количеством клиентов, но качественнее.`,
  };

  let error = errorMap[primary] || "";

  if (blockers.length > 1) {
    const secondary = blockers.filter((b) => b !== primary).slice(0, 2);
    const extras = secondary
      .map((b) => {
        const short: Record<string, string> = {
          "Не знаю свою уникальность": "поиск уникальности",
          "Боюсь продавать": "страх продаж",
          "Нет стратегии": "отсутствие стратегии",
          "Синдром самозванца": "синдром самозванца",
          "Нет аудитории": "нехватка аудитории",
          "Не умею делать контент": "трудности с контентом",
          "Выгорание": "выгорание",
        };
        return short[b] || b.toLowerCase();
      })
      .join(" и ");
    error += ` Также стоит обратить внимание на ${extras}.`;
  }

  return error;
}

function calculateScore(a: Answers): number {
  let score = 30; // Base

  // Experience bonus
  const expMap: Record<string, number> = {
    "Меньше 1 года": 0,
    "1-3 года": 5,
    "3-5 лет": 10,
    "5-10 лет": 15,
    "10+ лет": 20,
  };
  score += expMap[a.experience] || 0;

  // Depth of self-awareness (longer answers = more aware)
  const awarenessAnswers = [a.clientThanks, a.bestAt, a.energy, a.explain10yo];
  const avgLength =
    awarenessAnswers.reduce((sum, ans) => sum + ans.trim().length, 0) /
    awarenessAnswers.length;
  if (avgLength > 100) score += 15;
  else if (avgLength > 50) score += 10;
  else if (avgLength > 20) score += 5;

  // Income gap penalty (wanting more = less realized)
  const currentIdx = INCOME_CURRENT.indexOf(a.currentIncome);
  const desiredIdx = INCOME_DESIRED.indexOf(a.desiredIncome);
  const gap = desiredIdx - currentIdx;
  if (gap <= 1) score += 15;
  else if (gap <= 2) score += 10;
  else if (gap <= 3) score += 5;

  // Fewer blockers = higher score
  if (a.blockers.length === 0) score += 15;
  else if (a.blockers.length <= 2) score += 10;
  else if (a.blockers.length <= 4) score += 5;

  return Math.min(100, Math.max(15, score));
}

/* ───────────────── COMPONENTS ───────────────── */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#A8A29E]">
          Шаг {step} из {total}
        </span>
        <span className="text-xs text-[#B8962E] font-medium">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#B8962E] to-[#E8D5A0] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  children,
  onNext,
  onBack,
  canProceed,
  step,
}: {
  question: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  step: number;
}) {
  return (
    <div className="animate-[fadeSlideIn_0.4s_ease-out_forwards]">
      <div className="glass-card rounded-2xl p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-[#1C1917] mb-5 leading-snug">
          {question}
        </h2>
        <div className="mb-6">{children}</div>
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 rounded-full border border-[#E7E5E4] px-4 py-2.5 text-sm text-[#78716C] transition-all hover:border-[#E7E5E4] hover:text-[#57534E]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Назад
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all duration-300 ${
              canProceed
                ? "bg-[#B8962E] text-[#FFFFFF] hover:bg-[#E8D5A0] shadow-[0_0_20px_rgba(200,168,78,0.15)]"
                : "bg-white/5 text-[#D6D3D1] cursor-not-allowed"
            }`}
          >
            {step === TOTAL_STEPS ? "Узнать результат" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyzingScreen() {
  const [dots, setDots] = useState(1);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 500);
    const phaseTimeout1 = setTimeout(() => setPhase(1), 1000);
    const phaseTimeout2 = setTimeout(() => setPhase(2), 2000);
    return () => {
      clearInterval(dotInterval);
      clearTimeout(phaseTimeout1);
      clearTimeout(phaseTimeout2);
    };
  }, []);

  const phases = [
    "Анализирую ответы",
    "Определяю суперсилу",
    "Формирую профиль",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20">

      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div
          className="absolute inset-0 rounded-full border-[3px] border-[#B8962E]/20"
        />
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#B8962E] border-r-[#B8962E]"
          style={{ animation: "spinGold 1s linear infinite" }}
        />
        <div
          className="absolute inset-3 rounded-full border-[2px] border-transparent border-b-[#E8D5A0] border-l-[#E8D5A0]"
          style={{ animation: "spinGold 1.5s linear infinite reverse" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-3 h-3 rounded-full bg-[#B8962E]"
            style={{ animation: "pulseScale 1.2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Text */}
      <p className="text-[#1C1917] font-semibold text-base mb-2">
        {phases[phase]}
        {".".repeat(dots)}
      </p>
      <p className="text-[#A8A29E] text-sm">Это займёт несколько секунд</p>

      {/* Progress hints */}
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
              i <= phase ? "bg-[#B8962E]" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8962E" />
            <stop offset="100%" stopColor="#E8D5A0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[#B8962E]">{score}</span>
        <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider">
          из 100
        </span>
      </div>
    </div>
  );
}

function ResultsScreen({ results, name }: { results: Results; name: string }) {
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setVisibleSections(i), i * 300));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const sectionClass = (idx: number) =>
    `transition-all duration-500 ${
      visibleSections >= idx
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={sectionClass(1)}>
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B8962E]/15 px-3 py-1 text-xs font-bold text-[#B8962E] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
            Результаты сканирования
          </div>
          <h2 className="text-xl font-bold text-[#1C1917]">
            {name}, вот твой профиль
          </h2>
        </div>
      </div>

      {/* Score */}
      <div className={sectionClass(1)}>
        <div className="glass-card rounded-2xl/80 p-5 text-center">
          <p className="text-xs text-[#A8A29E] uppercase tracking-wider mb-3">
            Раскрытие потенциала
          </p>
          <ScoreRing score={results.score} />
          <p className="text-sm text-[#78716C] mt-3">
            {results.score >= 70
              ? "Ты уже близко к своему максимуму! Осталось доработать стратегию."
              : results.score >= 45
              ? "У тебя есть крепкая база. Пора раскрывать потенциал на полную."
              : "Огромный потенциал! Тебе нужна распаковка и стратегия, чтобы всё соединить."}
          </p>
        </div>
      </div>

      {/* Superpower */}
      <div className={sectionClass(2)}>
        <div className="glass-card rounded-2xl/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B8962E]/10">
              <svg className="w-4 h-4 text-[#B8962E]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#B8962E] uppercase tracking-wider">
              Твоя суперсила
            </h3>
          </div>
          <p className="text-sm text-[#1C1917] leading-relaxed">
            {results.superpower}
          </p>
        </div>
      </div>

      {/* Positioning */}
      <div className={sectionClass(3)}>
        <div className="glass-card rounded-2xl/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B8962E]/10">
              <svg className="w-4 h-4 text-[#B8962E]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#B8962E] uppercase tracking-wider">
              Позиционирование
            </h3>
          </div>
          <p className="text-base font-medium text-[#1C1917] leading-relaxed italic">
            &laquo;{results.positioning}&raquo;
          </p>
        </div>
      </div>

      {/* Content topics */}
      <div className={sectionClass(4)}>
        <div className="glass-card rounded-2xl/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B8962E]/10">
              <svg className="w-4 h-4 text-[#B8962E]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125h3.375" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#B8962E] uppercase tracking-wider">
              3 темы контента
            </h3>
          </div>
          <div className="space-y-2.5">
            {results.contentTopics.map((topic, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B8962E]/15 text-xs font-bold text-[#B8962E]">
                  {i + 1}
                </span>
                <p className="text-sm text-[#57534E] leading-relaxed">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main error */}
      <div className={sectionClass(5)}>
        <div className="rounded-2xl border border-red-500/15 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
              Главная ошибка
            </h3>
          </div>
          <p className="text-sm text-[#57534E] leading-relaxed">
            {results.mainError}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className={sectionClass(5)}>
        <div className="rounded-2xl bg-gradient-to-br from-[#B8962E]/20 to-[#B8962E]/5 border border-[#B8962E]/25 p-5 text-center">
          <p className="text-sm text-[#78716C] mb-1">
            Хочешь раскрыть суперсилу на полную?
          </p>
          <p className="text-xs text-[#A8A29E] mb-4">
            Карина лично проведёт глубинную распаковку
          </p>
          <a
            href="https://t.me/KARINA_ProZAPUSKI?text=%D0%A5%D0%BE%D1%87%D1%83+%D1%80%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D1%83"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#B8962E] px-6 py-2.5 text-sm font-bold text-[#FFFFFF] transition hover:bg-[#E8D5A0] pulse-gold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Записаться на распаковку
          </a>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── MAIN PAGE ───────────────── */

export default function ScannerPage() {
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<"quiz" | "analyzing" | "results">("quiz");
  const [answers, setAnswers] = useState<Answers>({
    name: "",
    niche: "",
    nicheCustom: "",
    experience: "",
    clientThanks: "",
    bestAt: "",
    clientResult: "",
    annoys: "",
    energy: "",
    explain10yo: "",
    currentIncome: "",
    desiredIncome: "",
    blockers: [],
  });
  const [results, setResults] = useState<Results | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateAnswer = useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleBlocker = useCallback((blocker: string) => {
    setAnswers((prev) => {
      const exists = prev.blockers.includes(blocker);
      return {
        ...prev,
        blockers: exists
          ? prev.blockers.filter((b) => b !== blocker)
          : [...prev.blockers, blocker],
      };
    });
  }, []);

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 1:
        return answers.name.trim().length >= 2;
      case 2:
        return (
          answers.niche !== "" &&
          (answers.niche !== "Другое" || answers.nicheCustom.trim().length >= 2)
        );
      case 3:
        return answers.experience !== "";
      case 4:
        return answers.clientThanks.trim().length >= 5;
      case 5:
        return answers.bestAt.trim().length >= 5;
      case 6:
        return answers.clientResult.trim().length >= 5;
      case 7:
        return answers.annoys.trim().length >= 5;
      case 8:
        return answers.energy.trim().length >= 5;
      case 9:
        return answers.explain10yo.trim().length >= 5;
      case 10:
        return answers.currentIncome !== "";
      case 11:
        return answers.desiredIncome !== "";
      case 12:
        return answers.blockers.length > 0;
      default:
        return false;
    }
  }, [step, answers]);

  const handleNext = useCallback(() => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Start analyzing
      setPhase("analyzing");
      setTimeout(() => {
        const r = generateResults(answers);
        setResults(r);
        setPhase("results");
      }, 3000);
    }
  }, [step, canProceed, answers]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((s) => s - 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  /* ── Input helpers ── */

  const textInput = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string
  ) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-[#E7E5E4] bg-white/[0.04] px-4 py-3 text-sm text-[#1C1917] placeholder-white/25 outline-none transition-all focus:border-[#B8962E]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#B8962E]/25"
      onKeyDown={(e) => {
        if (e.key === "Enter" && canProceed()) handleNext();
      }}
      autoFocus
    />
  );

  const textArea = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string
  ) => (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-xl border border-[#E7E5E4] bg-white/[0.04] px-4 py-3 text-sm text-[#1C1917] placeholder-white/25 outline-none transition-all focus:border-[#B8962E]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#B8962E]/25 resize-none"
      autoFocus
    />
  );

  const selectGrid = (
    options: string[],
    value: string,
    onChange: (v: string) => void
  ) => (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-xl border px-3 py-2.5 text-sm text-left transition-all ${
            value === opt
              ? "border-[#B8962E]/60 bg-[#B8962E]/15 text-[#B8962E] font-medium"
              : "border-[#E7E5E4] bg-white/[0.03] text-[#78716C] hover:border-[#E7E5E4] hover:bg-white/[0.06]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const checkboxList = (
    options: string[],
    selected: string[],
    onToggle: (v: string) => void
  ) => (
    <div className="space-y-2">
      {options.map((opt) => {
        const isChecked = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm text-left transition-all ${
              isChecked
                ? "border-[#B8962E]/60 bg-[#B8962E]/15 text-[#1C1917]"
                : "border-[#E7E5E4] bg-white/[0.03] text-[#78716C] hover:border-[#E7E5E4] hover:bg-white/[0.06]"
            }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                isChecked
                  ? "border-[#B8962E] bg-[#B8962E]"
                  : "border-[#E7E5E4] bg-transparent"
              }`}
            >
              {isChecked && (
                <svg
                  className="w-3 h-3 text-[#FFFFFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            {opt}
          </button>
        );
      })}
    </div>
  );

  /* ── Render question by step ── */

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <QuestionCard
            question="Как тебя зовут?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textInput(answers.name, (v) => updateAnswer("name", v), "Твоё имя")}
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            question="В какой нише ты работаешь?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            <div className="space-y-3">
              {selectGrid(NICHES, answers.niche, (v) =>
                updateAnswer("niche", v)
              )}
              {answers.niche === "Другое" && (
                <div className="mt-3 animate-[fadeSlideIn_0.3s_ease-out_forwards]">
                  {textInput(
                    answers.nicheCustom,
                    (v) => updateAnswer("nicheCustom", v),
                    "Напиши свою нишу"
                  )}
                </div>
              )}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            question="Сколько лет у тебя опыта?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {selectGrid(EXPERIENCE_OPTIONS, answers.experience, (v) =>
              updateAnswer("experience", v)
            )}
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            question="За что тебя чаще всего благодарят клиенты?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.clientThanks,
              (v) => updateAnswer("clientThanks", v),
              "Напиши, за что тебя хвалят и благодарят..."
            )}
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            question="Что ты делаешь лучше других в своей нише?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.bestAt,
              (v) => updateAnswer("bestAt", v),
              "В чём твоя сильная сторона..."
            )}
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            question="Какой результат получают твои клиенты?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.clientResult,
              (v) => updateAnswer("clientResult", v),
              "Какие изменения происходят у клиентов..."
            )}
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard
            question="Что тебя бесит в работе с клиентами?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.annoys,
              (v) => updateAnswer("annoys", v),
              "Что раздражает или напрягает..."
            )}
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard
            question="Какой момент в работе приносит тебе больше всего энергии?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.energy,
              (v) => updateAnswer("energy", v),
              "Когда ты чувствуешь максимум кайфа от работы..."
            )}
          </QuestionCard>
        );

      case 9:
        return (
          <QuestionCard
            question="Если бы тебе нужно было объяснить 10-летнему ребёнку, чем ты занимаешься — что бы сказал(а)?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {textArea(
              answers.explain10yo,
              (v) => updateAnswer("explain10yo", v),
              "Объясни простыми словами..."
            )}
          </QuestionCard>
        );

      case 10:
        return (
          <QuestionCard
            question="Сколько ты сейчас зарабатываешь в месяц?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {selectGrid(INCOME_CURRENT, answers.currentIncome, (v) =>
              updateAnswer("currentIncome", v)
            )}
          </QuestionCard>
        );

      case 11:
        return (
          <QuestionCard
            question="Какой доход хочешь?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            {selectGrid(INCOME_DESIRED, answers.desiredIncome, (v) =>
              updateAnswer("desiredIncome", v)
            )}
          </QuestionCard>
        );

      case 12:
        return (
          <QuestionCard
            question="Что мешает тебе зарабатывать больше?"
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed()}
          >
            <p className="text-xs text-[#A8A29E] mb-3">
              Выбери все подходящие варианты
            </p>
            {checkboxList(BLOCKERS, answers.blockers, toggleBlocker)}
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <ToolLayout
      title="Сканер суперсилы"
      subtitle="AI-анализ твоей экспертности"
      badge="AI"
    >
      <div ref={scrollRef}>
        {phase === "quiz" && (
          <>
            <ProgressBar step={step} total={TOTAL_STEPS} />
            {renderQuestion()}
          </>
        )}

        {phase === "analyzing" && <AnalyzingScreen />}

        {phase === "results" && results && (
          <ResultsScreen results={results} name={answers.name} />
        )}
      </div>
    </ToolLayout>
  );
}
