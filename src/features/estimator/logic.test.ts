import { describe, expect, it } from "vitest";
import { computeEstimate, computeTimeline, clampArea } from "./logic";
import { defaultSelection } from "./pricing";

describe("estimator", () => {
  it("reproduces the original default exactly", () => {
    const estimate = computeEstimate(defaultSelection);
    expect(estimate.total).toBe(3_310_000);
    expect(estimate.ratePerM2).toBe(20_688);
  });

  it("applies the unit multiplier before per-m2 add-ons", () => {
    const estimate = computeEstimate({ ...defaultSelection, unit: "villa", gypsum: false, door: false });
    expect(estimate.effectiveRate).toBe(23_000);
    expect(estimate.total).toBe(23_000 * 160);
  });

  it("adds flat add-ons after the variable part", () => {
    const withDoor = computeEstimate({ ...defaultSelection, door: true });
    const withoutDoor = computeEstimate({ ...defaultSelection, door: false });
    expect(withDoor.total - withoutDoor.total).toBe(22_000);
  });

  it("splits the breakdown 60/25/15", () => {
    const { breakdown, total } = computeEstimate(defaultSelection);
    expect(breakdown.materials).toBe(Math.round(total * 0.6));
    expect(breakdown.labor).toBe(Math.round(total * 0.25));
    expect(breakdown.supervision).toBe(Math.round(total * 0.15));
  });

  it("computes the timeline from area and tier", () => {
    expect(computeTimeline(160, 20000)).toEqual({ min: 15, max: 18 });
    expect(computeTimeline(90, 5500)).toEqual({ min: 8, max: 11 });
  });

  it("clamps the area to the slider range", () => {
    expect(clampArea(10)).toBe(50);
    expect(clampArea(1000)).toBe(600);
    expect(clampArea(163)).toBe(165);
  });
});
