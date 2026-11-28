"use client";

import { useReducer } from "react";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { scoreQuiz, type Style } from "@/features/quiz/logic";
import { quizLabels, quizMessage, quizOptions, quizResults } from "@/features/quiz/content";
import { buildWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/cn";

type State = { step: number; answers: Style[] };
type Action = { type: "answer"; value: Style } | { type: "reset" };

const initial: State = { step: 0, answers: [] };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return initial;
  return { step: state.step + 1, answers: [...state.answers, action.value] };
}

export function Quiz({ locale }: { locale: "ar" | "en" }) {
  const t = useTranslations();
  const [state, dispatch] = useReducer(reducer, initial);
  const questions = [t("quiz.q1"), t("quiz.q2"), t("quiz.q3")];

  if (state.step >= questions.length) {
    const result = scoreQuiz(state.answers);
    const content = quizResults[result];
    const title = content.title[locale];
    const mats = content.mats[locale];
    return (
      <div className="rounded-md border border-hairline bg-paper p-6">
        <p className="text-[0.78rem] tracking-[0.16em] text-brass-ink uppercase">{t("quiz.res_tag")}</p>
        <h2 className="mt-2 text-[length:var(--text-step-2)] font-semibold">{title}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{content.desc[locale]}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-hairline p-4">
            <p className="text-[0.75rem] text-ink-soft">{quizLabels.materials[locale]}</p>
            <p className="mt-1 font-medium">{mats}</p>
          </div>
          <div className="rounded-sm border border-hairline p-4">
            <p className="text-[0.75rem] text-ink-soft">{quizLabels.palette[locale]}</p>
            <div className="mt-2 flex gap-2">
              {content.swatches.map((color) => (
                <span key={color} className="size-8 rounded-full border border-hairline" style={{ background: color }} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={buildWhatsAppUrl(quizMessage(locale, title, mats))}
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
        <span className="text-[0.78rem] text-ink-soft">{quizLabels.step[locale](state.step + 1, questions.length)}</span>
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
            style={{ width: `${((state.step + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="inline-flex items-center gap-1 text-[0.78rem] text-ink-soft">
          <Zap size={13} aria-hidden />
          {quizLabels.hint[locale]}
        </span>
      </div>
      <h2 className="mt-5 text-[length:var(--text-step-1)] font-medium">{questions[state.step]}</h2>
      <div className="mt-5 grid gap-2">
        {quizOptions[state.step].map((option) => (
          <button
            key={option.style}
            type="button"
            onClick={() => dispatch({ type: "answer", value: option.style })}
            className={cn(
              "rounded-sm border border-hairline px-4 py-3 text-start",
              "hover:border-olive hover:bg-sand/60",
            )}
          >
            <strong className="block text-[0.95rem] font-medium">{option.title[locale]}</strong>
            <span className="mt-0.5 block text-[0.82rem] text-ink-soft">{option.sub[locale]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
