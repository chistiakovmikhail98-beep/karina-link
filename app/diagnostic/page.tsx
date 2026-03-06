"use client";

import { useState, useCallback, useMemo } from "react";
import ToolLayout from "@/app/components/ToolLayout";

/* ───────────────── TYPES ───────────────── */

type Category = "A" | "B" | "C" | "D";

interface Answer {
  text: string;
  scores: Partial<Record<Category, number>>;
}

interface Question {
  id: number;
  text: string;
  category: Category;
  answers: Answer[];
}

interface TypeResult {
  key: Category;
  title: string;
  icon: string;
  color: string;
  colorBg: string;
  description: string;
  blockers: string[];
  actions: string[];
  program: string;
  programLink: string;
}

/* ───────────────── QUESTIONS DATA ───────────────── */

const questions: Question[] = [
  // Q1 - Category A
  {
    id: 1,
    text: "Сколько обучений ты прошёл(а) за последний год?",
    category: "A",
    answers: [
      { text: "0", scores: { A: 0 } },
      { text: "1\u20132", scores: { A: 1 } },
      { text: "3\u20135", scores: { A: 2 } },
      { text: "6+", scores: { A: 3 } },
    ],
  },
  // Q2 - Category B
  {
    id: 2,
    text: "Как часто ты публикуешь контент?",
    category: "B",
    answers: [
      { text: "Каждый день", scores: { B: 0 } },
      { text: "2\u20133 раза в неделю", scores: { B: 1 } },
      { text: "Раз в неделю", scores: { B: 2 } },
      { text: "Почти никогда", scores: { B: 3 } },
    ],
  },
  // Q3 - Category C
  {
    id: 3,
    text: "У тебя есть контент-план?",
    category: "C",
    answers: [
      { text: "Да, на месяц вперёд", scores: { C: 0 } },
      { text: "Примерно в голове", scores: { C: 1 } },
      { text: "Пишу что чувствую", scores: { C: 2 } },
      { text: "Нет", scores: { C: 3 } },
    ],
  },
  // Q4 - Category D
  {
    id: 4,
    text: "Твой доход за последние 3 месяца:",
    category: "D",
    answers: [
      { text: "Стабильно растёт", scores: { D: 0 } },
      { text: "Примерно одинаковый", scores: { D: 1 } },
      { text: "Скачет", scores: { D: 2 } },
      { text: "Падает", scores: { D: 3 } },
    ],
  },
  // Q5 - Category A
  {
    id: 5,
    text: "Что ты делаешь, когда не знаешь как продать?",
    category: "A",
    answers: [
      { text: "Иду учиться", scores: { A: 3 } },
      { text: "Спрашиваю коллег", scores: { A: 1 } },
      { text: "Пробую сам", scores: { A: 0 } },
      { text: "Ничего", scores: { A: 2 } },
    ],
  },
  // Q6 - Category B
  {
    id: 6,
    text: "Ты записываешь сторис и видео?",
    category: "B",
    answers: [
      { text: "Регулярно", scores: { B: 0 } },
      { text: "Иногда", scores: { B: 1 } },
      { text: "Очень редко", scores: { B: 2 } },
      { text: "Никогда, боюсь камеры", scores: { B: 3 } },
    ],
  },
  // Q7 - Category C
  {
    id: 7,
    text: "Как ты ведёшь базу клиентов?",
    category: "C",
    answers: [
      { text: "CRM/таблица", scores: { C: 0 } },
      { text: "Записываю в заметки", scores: { C: 1 } },
      { text: "В голове", scores: { C: 2 } },
      { text: "Не веду", scores: { C: 3 } },
    ],
  },
  // Q8 - Category D
  {
    id: 8,
    text: "Ты делегируешь задачи?",
    category: "D",
    answers: [
      { text: "Да, у меня команда", scores: { D: 0 } },
      { text: "Пытаюсь", scores: { D: 1 } },
      { text: "Хочу но не могу", scores: { D: 2 } },
      { text: "Всё сам(а)", scores: { D: 3 } },
    ],
  },
  // Q9 - Category A
  {
    id: 9,
    text: "Что для тебя важнее?",
    category: "A",
    answers: [
      { text: "Получить ещё один сертификат", scores: { A: 3 } },
      { text: "Заработать первые 100К", scores: { A: 0 } },
      { text: "Найти свой стиль", scores: { A: 1 } },
      { text: "Помочь людям", scores: { A: 2 } },
    ],
  },
  // Q10 - Category B
  {
    id: 10,
    text: "Твои подписчики знают, что ты продаёшь?",
    category: "B",
    answers: [
      { text: "Да, регулярно напоминаю", scores: { B: 0 } },
      { text: "Иногда упоминаю", scores: { B: 1 } },
      { text: "Не уверен(а)", scores: { B: 2 } },
      { text: "Нет, стесняюсь", scores: { B: 3 } },
    ],
  },
  // Q11 - Category C
  {
    id: 11,
    text: "Есть ли у тебя воронка продаж?",
    category: "C",
    answers: [
      { text: "Да, автоматизированная", scores: { C: 0 } },
      { text: "Есть но ручная", scores: { C: 1 } },
      { text: "Пытаюсь собрать", scores: { C: 2 } },
      { text: "Не знаю что это", scores: { C: 3 } },
    ],
  },
  // Q12 - Category D
  {
    id: 12,
    text: "Что ты чувствуешь, называя цену?",
    category: "D",
    answers: [
      { text: "Уверенность", scores: { D: 0 } },
      { text: "Небольшой дискомфорт", scores: { D: 1 } },
      { text: "Неловкость", scores: { D: 2 } },
      { text: "Страх", scores: { D: 3 } },
    ],
  },
  // Q13 - Category A
  {
    id: 13,
    text: "Сколько % времени ты учишься vs. делаешь?",
    category: "A",
    answers: [
      { text: "80/20 (учусь/делаю)", scores: { A: 3 } },
      { text: "60/40", scores: { A: 2 } },
      { text: "40/60", scores: { A: 1 } },
      { text: "20/80", scores: { A: 0 } },
    ],
  },
  // Q14 - Category B
  {
    id: 14,
    text: "Когда последний раз ты проводил(а) эфир?",
    category: "B",
    answers: [
      { text: "На этой неделе", scores: { B: 0 } },
      { text: "В этом месяце", scores: { B: 1 } },
      { text: "Давно", scores: { B: 2 } },
      { text: "Никогда", scores: { B: 3 } },
    ],
  },
  // Q15 - Category C
  {
    id: 15,
    text: "Ты знаешь свои цифры? (конверсия, LTV, CAC)",
    category: "C",
    answers: [
      { text: "Да, отслеживаю", scores: { C: 0 } },
      { text: "Примерно", scores: { C: 1 } },
      { text: "Слышал(а) но не считаю", scores: { C: 2 } },
      { text: "Нет", scores: { C: 3 } },
    ],
  },
  // Q16 - Category D
  {
    id: 16,
    text: "Ты знаешь свой потолок дохода?",
    category: "D",
    answers: [
      { text: "Нет, я расту", scores: { D: 0 } },
      { text: "Да, около текущего", scores: { D: 1 } },
      { text: "Чувствую что упёрся", scores: { D: 2 } },
      { text: "Мне кажется я застрял", scores: { D: 3 } },
    ],
  },
  // Q17 - Category A
  {
    id: 17,
    text: "Что ты чувствуешь перед запуском?",
    category: "A",
    answers: [
      { text: "Мне надо ещё подготовиться", scores: { A: 3 } },
      { text: "Страх", scores: { A: 2 } },
      { text: "Азарт", scores: { A: 0 } },
      { text: "Ничего", scores: { A: 1 } },
    ],
  },
  // Q18 - Category B
  {
    id: 18,
    text: "Как ты себя описываешь в био?",
    category: "B",
    answers: [
      { text: "Чётко и с оффером", scores: { B: 0 } },
      { text: "Кратко с нишей", scores: { B: 1 } },
      { text: "Размыто", scores: { B: 2 } },
      { text: "У меня нет био", scores: { B: 3 } },
    ],
  },
  // Q19 - Category C
  {
    id: 19,
    text: "Как ты планируешь неделю?",
    category: "C",
    answers: [
      { text: "Подробный план", scores: { C: 0 } },
      { text: "Список задач", scores: { C: 1 } },
      { text: "По настроению", scores: { C: 2 } },
      { text: "Не планирую", scores: { C: 3 } },
    ],
  },
  // Q20 - Category D
  {
    id: 20,
    text: "Чего тебе не хватает для x3 роста?",
    category: "D",
    answers: [
      { text: "Стратегии масштабирования", scores: { D: 3 } },
      { text: "Команды", scores: { D: 2 } },
      { text: "Уверенности в себе", scores: { D: 1 } },
      { text: "Я не знаю", scores: { D: 0 } },
    ],
  },
];

/* ───────────────── TYPE RESULTS DATA ───────────────── */

const TG_LINK = "https://t.me/KARINA_ProZAPUSKI";

const typeResults: Record<Category, TypeResult> = {
  A: {
    key: "A",
    title: "Вечный студент",
    icon: "\uD83D\uDCDA",
    color: "#B08D3E",
    colorBg: "rgba(200, 168, 78, 0.15)",
    description:
      "Ты знаешь больше, чем 90% экспертов, но не применяешь. Каждый новый курс даёт иллюзию прогресса, но доход не растёт. Тебе не нужно больше знаний \u2014 тебе нужна система и действие.",
    blockers: [
      "Бесконечное обучение без внедрения",
      "Синдром самозванца: «я ещё не готов(а)»",
      "Перфекционизм, который парализует запуск",
    ],
    actions: [
      "Запрети себе покупать новые курсы на 3 месяца",
      "Внедри одну модель продаж и доведи до первых денег",
      "Найди наставника, который будет толкать к действию, а не к теории",
    ],
    program: "Формула САМОзапуска \u2014 6 недель от знаний к первым 300К. Карина не даст сидеть в теории.",
    programLink: TG_LINK + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA",
  },
  B: {
    key: "B",
    title: "Невидимка",
    icon: "\uD83D\uDC7B",
    color: "#8B9FEF",
    colorBg: "rgba(139, 159, 239, 0.15)",
    description:
      "У тебя есть экспертиза и результаты, но мир о них не знает. Ты прячешься за «мне нечего сказать» или «я не фотогеничная». Пока ты молчишь \u2014 клиенты уходят к тем, кто громче.",
    blockers: [
      "Страх быть на виду и получить осуждение",
      "Нет системы создания контента",
      "Убеждение, что «хороший продукт продаёт сам себя»",
    ],
    actions: [
      "Начни с 3 сторис в день \u2014 просто покажи свой день",
      "Запиши 1 экспертный Reels на тему, в которой ты сильна",
      "Пройди распаковку суперсилы \u2014 пойми, в чём твоя уникальность",
    ],
    program: "Распаковка суперсилы \u2014 за 3\u20134 часа найдём твою уникальность и создадим позиционирование, после которого ты захочешь заявить о себе.",
    programLink: TG_LINK + "?text=%D0%A0%D0%B0%D1%81%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0",
  },
  C: {
    key: "C",
    title: "Хаотик",
    icon: "\uD83C\uDF00",
    color: "#E07B5B",
    colorBg: "rgba(224, 123, 91, 0.15)",
    description:
      "Ты действуешь, но без системы. Посты без плана, продажи без воронки, клиенты без CRM. У тебя есть энергия \u2014 не хватает структуры, чтобы она приносила деньги.",
    blockers: [
      "Отсутствие чёткой воронки продаж",
      "Хаотичный контент без стратегии",
      "Нет аналитики и учёта клиентов",
    ],
    actions: [
      "Создай простую воронку: лид-магнит \u2192 прогрев \u2192 продажа",
      "Составь контент-план на 2 недели и следуй ему",
      "Заведи таблицу клиентов и начни считать конверсии",
    ],
    program: "Формула САМОзапуска \u2014 получишь готовую систему: воронка, контент-план, шаблоны, CRM. Всё, чтобы хаос стал системой.",
    programLink: TG_LINK + "?text=%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA",
  },
  D: {
    key: "D",
    title: "Стеклянный потолок",
    icon: "\uD83D\uDCC8",
    color: "#7BC89F",
    colorBg: "rgba(123, 200, 159, 0.15)",
    description:
      "Ты уже зарабатываешь, но уперся в потолок. Делаешь всё сам, боишься поднять цену, не умеешь делегировать. Тебе нужна стратегия масштабирования, а не ещё один запуск.",
    blockers: [
      "Делаешь всё в одиночку \u2014 нет команды",
      "Страх поднять цену и потерять клиентов",
      "Нет стратегии роста \u2014 только операционка",
    ],
    actions: [
      "Подними цену на 30% \u2014 и посмотри, что произойдёт",
      "Делегируй 3 задачи, которые не требуют твоей экспертизы",
      "Создай продуктовую линейку: от недорогого до премиум",
    ],
    program: "Наставничество с внедрением \u2014 Карина лично разберёт твой бизнес и выстроит стратегию масштабирования до x3\u2013x5.",
    programLink: TG_LINK + "?text=%D0%9D%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE",
  },
};

const categoryLabels: Record<Category, string> = {
  A: "Вечный студент",
  B: "Невидимка",
  C: "Хаотик",
  D: "Стеклянный потолок",
};

/* ───────────────── MAIN COMPONENT ───────────────── */

export default function DiagnosticPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  /* ── Calculate scores ── */
  const scores = useMemo(() => {
    const s: Record<Category, number> = { A: 0, B: 0, C: 0, D: 0 };
    Object.entries(answers).forEach(([qIndex, aIndex]) => {
      const q = questions[Number(qIndex)];
      const a = q.answers[aIndex];
      Object.entries(a.scores).forEach(([cat, val]) => {
        s[cat as Category] += val;
      });
    });
    return s;
  }, [answers]);

  const totalScore = useMemo(() => {
    return Math.max(scores.A + scores.B + scores.C + scores.D, 1);
  }, [scores]);

  const winningCategory = useMemo((): Category => {
    let max: Category = "A";
    (["A", "B", "C", "D"] as Category[]).forEach((cat) => {
      if (scores[cat] > scores[max]) max = cat;
    });
    return max;
  }, [scores]);

  const percentages = useMemo(() => {
    return {
      A: Math.round((scores.A / totalScore) * 100),
      B: Math.round((scores.B / totalScore) * 100),
      C: Math.round((scores.C / totalScore) * 100),
      D: Math.round((scores.D / totalScore) * 100),
    };
  }, [scores, totalScore]);

  /* ── Handlers ── */
  const handleSelectAnswer = useCallback(
    (answerIndex: number) => {
      if (isTransitioning) return;
      setSelectedAnswer(answerIndex);

      // Save answer and advance after a short delay
      setTimeout(() => {
        setAnswers((prev) => ({ ...prev, [currentQuestion]: answerIndex }));
        setSlideDirection("left");

        if (currentQuestion < totalQuestions - 1) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsTransitioning(false);
          }, 300);
        } else {
          // Quiz finished
          setIsTransitioning(true);
          setTimeout(() => {
            setQuizFinished(true);
            setIsTransitioning(false);
          }, 300);
        }
      }, 400);
    },
    [currentQuestion, totalQuestions, isTransitioning]
  );

  const handleGoBack = useCallback(() => {
    if (currentQuestion > 0 && !isTransitioning) {
      setSlideDirection("right");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentQuestion, isTransitioning]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setQuizFinished(false);
    setIsTransitioning(false);
  }, []);

  /* ── Current question data ── */
  const question = questions[currentQuestion];
  const result = typeResults[winningCategory];

  /* ── Sorted categories for bar chart ── */
  const sortedCategories = useMemo(() => {
    return (["A", "B", "C", "D"] as Category[]).sort(
      (a, b) => scores[b] - scores[a]
    );
  }, [scores]);

  return (
    <ToolLayout
      title="Диагностика эксперта"
      subtitle="20 вопросов \u2014 узнай, что тебя тормозит"
      badge="ТЕСТ"
    >
      {!quizFinished ? (
        /* ═══════════════ QUIZ SCREEN ═══════════════ */
        <div className="space-y-5">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8A8078]">
                Вопрос {currentQuestion + 1} из {totalQuestions}
              </span>
              <span className="text-[#B08D3E] font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B08D3E] to-[#D4B96A] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div
            className={`transition-all duration-300 ${
              isTransitioning
                ? slideDirection === "left"
                  ? "translate-x-[-20px] opacity-0"
                  : "translate-x-[20px] opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              {/* Question number badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#B08D3E]/15 text-[#B08D3E] text-sm font-bold">
                  {question.id}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#B08D3E]/20 to-transparent" />
              </div>

              {/* Question text */}
              <h2 className="text-base sm:text-lg font-semibold text-[#191715] leading-relaxed mb-5">
                {question.text}
              </h2>

              {/* Answer options */}
              <div className="space-y-2.5">
                {question.answers.map((answer, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const wasPreviouslySelected = answers[currentQuestion] === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 ${
                        isSelected
                          ? "border-[#B08D3E] bg-[#B08D3E]/20 text-[#191715] shadow-[0_0_20px_rgba(200,168,78,0.15)] scale-[1.02]"
                          : wasPreviouslySelected
                          ? "border-[#B08D3E]/30 bg-[#B08D3E]/10 text-[#191715]"
                          : "border-[#E8E2DA] bg-white/[0.03] text-[#57534E] hover:border-[#B08D3E]/30 hover:bg-[#B08D3E]/5 hover:text-[#191715] active:scale-[0.98]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? "border-[#B08D3E] bg-[#B08D3E] text-[#FFFFFF]"
                              : "border-[#E8E2DA] text-[#8A8078]"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{answer.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Back button */}
          {currentQuestion > 0 && (
            <button
              onClick={handleGoBack}
              disabled={isTransitioning || selectedAnswer !== null}
              className="flex items-center gap-1.5 text-sm text-[#8A8078] transition-colors hover:text-[#78716C] disabled:opacity-30"
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
        </div>
      ) : (
        /* ═══════════════ RESULTS SCREEN ═══════════════ */
        <div
          className={`space-y-5 transition-all duration-500 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Main result card */}
          <div className="rounded-2xl border border-[#B08D3E]/20 glass-card overflow-hidden">
            {/* Header with type icon and title */}
            <div
              className="p-6 text-center"
              style={{ backgroundColor: result.colorBg }}
            >
              <div className="text-5xl mb-3">{result.icon}</div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#8A8078] mb-1">
                Твой тип
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: result.color }}
              >
                {result.title}
              </h2>
            </div>

            {/* Description */}
            <div className="p-5 sm:p-6 space-y-5">
              <p className="text-sm text-[#57534E] leading-relaxed">
                {result.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Blockers */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#191715] mb-3">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  Что тебя тормозит
                </h3>
                <ul className="space-y-2">
                  {result.blockers.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#78716C]"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Actions */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#191715] mb-3">
                  <svg
                    className="w-4 h-4 text-[#B08D3E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Что делать
                </h3>
                <ol className="space-y-2">
                  {result.actions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#78716C]"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: result.colorBg,
                          color: result.color,
                        }}
                      >
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Percentage breakdown */}
          <div className="rounded-2xl border border-[#E8E2DA] glass-card p-5 sm:p-6">
            <h3 className="text-sm font-bold text-[#191715] mb-4">
              Твой профиль по типам
            </h3>
            <div className="space-y-3">
              {sortedCategories.map((cat) => {
                const tr = typeResults[cat];
                const pct = percentages[cat];
                const isWinner = cat === winningCategory;

                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{tr.icon}</span>
                        <span
                          className={`text-xs font-medium ${
                            isWinner ? "text-[#191715]" : "text-[#78716C]"
                          }`}
                        >
                          {categoryLabels[cat]}
                        </span>
                        {isWinner && (
                          <span className="inline-flex items-center rounded-full bg-[#B08D3E]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#B08D3E]">
                            MAX
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isWinner ? "text-[#191715]" : "text-[#8A8078]"
                        }`}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: isWinner ? tr.color : `${tr.color}66`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-[#8A8078] mt-3">
              Большинство экспертов сочетают в себе несколько типов. Работай над
              доминирующим \u2014 остальное подтянется.
            </p>
          </div>

          {/* Program recommendation */}
          <div className="rounded-2xl border border-[#B08D3E]/20 bg-gradient-to-br from-[#B08D3E]/10 to-[#B08D3E]/5 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-[#B08D3E]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
              <h3 className="text-sm font-bold text-[#B08D3E]">
                Рекомендованная программа Карины
              </h3>
            </div>
            <p className="text-sm text-[#57534E] leading-relaxed mb-4">
              {result.program}
            </p>
            <a
              href={result.programLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#B08D3E] px-6 py-2.5 text-sm font-bold text-[#FFFFFF] transition-all hover:bg-[#D4B96A]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Узнать подробнее
            </a>
          </div>

          {/* Restart button */}
          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#E8E2DA] py-3 text-sm text-[#8A8078] transition-all hover:border-[#E8E2DA] hover:text-[#78716C]"
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
              />
            </svg>
            Пройти тест заново
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
