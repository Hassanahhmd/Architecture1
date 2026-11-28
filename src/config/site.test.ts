import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, site } from "./site";

describe("whatsapp builder", () => {
  it("encodes Arabic and spaces", () => {
    const url = buildWhatsAppUrl("مرحبا يا حسن");
    expect(url.startsWith(site.whatsappBase + "?text=")).toBe(true);
    expect(url).not.toContain(" ");
    expect(decodeURIComponent(url.split("?text=")[1])).toBe("مرحبا يا حسن");
  });

  it("keeps the phone number in one place", () => {
    expect(site.whatsappBase).toContain(site.phone.replace("+", ""));
  });
});
