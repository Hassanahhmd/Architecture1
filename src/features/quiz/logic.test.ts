import { describe, expect, it } from "vitest";
import { scoreQuiz } from "./logic";

describe("quiz scoring", () => {
  it("defaults to luxury when nothing dominates", () => {
    expect(scoreQuiz(["luxury", "minimal", "modern"])).toBe("minimal");
    expect(scoreQuiz(["luxury"])).toBe("luxury");
  });

  it("prefers minimal on a tie with luxury", () => {
    expect(scoreQuiz(["minimal", "luxury"])).toBe("minimal");
  });

  it("prefers modern when it beats both others", () => {
    expect(scoreQuiz(["modern", "modern", "luxury"])).toBe("modern");
  });

  it("keeps the original order when minimal and modern tie", () => {
    expect(scoreQuiz(["minimal", "modern", "luxury"])).toBe("minimal");
  });
});
