"use client";

import { useReducer } from "react";
import { useTranslations } from "next-intl";
import { scoreQuiz, type Style } from "@/features/quiz/logic";
import { buildWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/cn";

type State = { step: number; answers: Style[] };
type Action = { type: "answer"; value: Style } | { type: "reset" };

const initial: State = { step: 0, answers: [] };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return initial;
  return { step: state.step + 1, answers: [...state.answers, action.value] };
}

const options: { style: Style; key: string }[] = [
  { style: "luxury", key: "quiz.o_luxury" },
  { style: "minimal", key: "quiz.o_minimal" },
  { style: "modern", key: "quiz.o_modern" },
];

export function Quiz({ locale }: { locale: "ar" | "en" }) {
  const t = useTranslations();
  const [state, dispatch] = useReducer(reducer, initial);
  const questions = [t("quiz.q1"), t("quiz.q2"), t("quiz.q3")];

  if (state.step >= questions.length) {
    const result = scoreQuiz(state.answers);
    const message =
      locale === "ar"
        ? `مرحبًا م. حسن، عملت الكويز وطلعلي طراز ${t(`quiz.style_${result}`)}، عايز نتكلم في تصميمه.`
        : `Hi Hassan, I took the quiz and got ${t(`quiz.style_${result}`)}. I'd like to discuss designing it.`;
    return (
      <div className="rounded-md border border-hairline bg-paper p-6">
        <p className="text-[0.78rem] tracking-[0.16em] text-brass-ink uppercase">{t("quiz.res_tag")}</p>
        <h2 className="mt-2 text-[length:var(--text-step-2)] font-semibold">{t(`quiz.style_${result}`)}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{t(`quiz.desc_${result}`)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={buildWhatsAppUrl(message)}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-sm bg-olive px-5 py-3 text-[0.9rem] text-alabaster"
          >
            {t("quiz.cta_whatsapp")}
          </a>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className="rounded-sm border border-hairline px-5 py-3 text-[0.9rem]"
          >
            {t("quiz.retake")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-hairline bg-paper p-6">
      <div className="flex items-center gap-3">
        <span className="text-[0.78rem] text-ink-soft">
          {state.step + 1} / {questions.length}
        </span>
        <div
          role="progressbar"
          aria-label={t("lab.tab_quiz")}
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={state.step}
          className="h-1 flex-1 rounded-full bg-sand"
        >
          <div
            className="h-1 rounded-full bg-olive transition-[width] duration-300"
            style={{ width: `${(state.step / questions.length) * 100}%` }}
          />
        </div>
      </div>
      <h2 className="mt-5 text-[length:var(--text-step-1)] font-medium">{questions[state.step]}</h2>
      <div className="mt-5 grid gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => dispatch({ type: "answer", value: option.style })}
            className={cn(
              "rounded-sm border border-hairline px-4 py-3 text-start text-[0.92rem]",
              "hover:border-olive hover:bg-sand/60",
            )}
          >
            {t(option.key)}
          </button>
        ))}
      </div>
    </div>
  );
}
