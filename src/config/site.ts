/** Single source of truth for contact details and outbound links.
 *  The original repeated the phone number eight times across HTML and JS. */

export const site = {
  name: { ar: "م. حسن أحمد", en: "Eng. Hassan Ahmed" },
  role: { ar: "مهندس معماري ومصمم داخلي", en: "Architect & Interior Designer" },
  phone: "+201096978258",
  phoneDisplay: "+20 109 697 8258",
  email: "Hassan.A.Lasheen@gmail.com",
  location: {
    ar: "القاهرة، مصر — أعمل عن بعد وخارجيًا",
    en: "Cairo, Egypt — working remotely and on site",
  },
  behance: "https://www.behance.net/Hassan_ahhmd",
  tiktok: "https://www.tiktok.com/@designscape_art",
  whatsappBase: "https://wa.me/201096978258",
  socials: [
    { key: "behance", label: "Behance", href: "https://www.behance.net/Hassan_ahhmd" },
    { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@designscape_art" },
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/designscape_art" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/hassan-ahmed-architecture" },
  ],
} as const;

/** Every WhatsApp link on the site goes through this builder. */
export function buildWhatsAppUrl(message: string) {
  return `${site.whatsappBase}?text=${encodeURIComponent(message)}`;
}
