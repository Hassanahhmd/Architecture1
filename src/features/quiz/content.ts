import type { Style } from "./logic";

type L = { ar: string; en: string };
type Option = { style: Style; title: L; sub: L };

/** Original wording, three questions x three options, plus the result copy. */
export const quizOptions: Option[][] = [
  [
    { style: "luxury", title: { ar: "الهيبة والفخامة الملكية", en: "Prestige and royal grandeur" }, sub: { ar: "مساحات مفتوحة، رخام متصل، وثريات معمارية عملاقة", en: "Open spaces, continuous marble and grand architectural chandeliers" } },
    { style: "minimal", title: { ar: "الهدوء والسكينة والرحابة", en: "Calm, serenity and openness" }, sub: { ar: "خطوط هندسية نظيفة، خامات طبيعية خشبية وألوان هادئة", en: "Clean geometric lines, natural wood materials and quiet colours" } },
    { style: "modern", title: { ar: "العصرية والذكاء العملي", en: "Modern, practical intelligence" }, sub: { ar: "أنظمة سمارت هوم، إضاءات خطية متطورة، وجلسات مريحة", en: "Smart home systems, advanced linear lighting and comfortable seating" } },
  ],
  [
    { style: "luxury", title: { ar: "الرخام المستورد والكرانيش المعمارية", en: "Imported marble and architectural moldings" }, sub: { ar: "رخام كلكتا أو إمبرادور مع بانوهات جدارية راقية", en: "Calacatta or Emperador marble with refined wall panels" } },
    { style: "minimal", title: { ar: "الأخشاب الطبيعية والدهانات المات", en: "Natural woods and matt paints" }, sub: { ar: "باركيه أو HDF فاخر مع درجات بيج وجوتن مات", en: "Premium parquet or HDF with beige tones and Jotun matt" } },
    { style: "modern", title: { ar: "البورسلين الليزر والتكسيات الخشبية", en: "Laser porcelain and timber cladding" }, sub: { ar: "بلاطات بورسلين كبيرة الحجم وتجاليد خشبية مضيئة", en: "Large-format porcelain slabs and illuminated wood cladding" } },
  ],
  [
    { style: "luxury", title: { ar: "إضاءات غير مباشرة وثريات فخمة", en: "Indirect lighting and statement chandeliers" }, sub: { ar: "بيوت نور هادئة تبرز جمال العمارة والأسقف المعلقة", en: "Soft cove lighting that highlights the architecture and dropped ceilings" } },
    { style: "minimal", title: { ar: "اعتماد كبير على الضوء الطبيعي", en: "Heavy reliance on natural light" }, sub: { ar: "نوافذ زجاجية عملاقة وإضاءات سبوت مخفية بلا بهرجة", en: "Giant glazed windows and concealed spot lights, no fuss" } },
    { style: "modern", title: { ar: "ماجنتيك تراك وإنارة ذكية سينمائية", en: "Magnetic track and cinematic smart lighting" }, sub: { ar: "سيناريوهات إضاءة متغيرة بالتحكم الصوتي أو الهاتف", en: "Changing lighting scenes controlled by voice or phone" } },
  ],
];

export const quizResults: Record<Style, { title: L; desc: L; mats: L; swatches: string[] }> = {
  luxury: {
    title: { ar: "نيوكلاسيك ملكي معاصر (Royal Neoclassical)", en: "Royal Contemporary Neoclassical" },
    desc: { ar: "أنت تعشق الفخامة الخالدة، التناظر المعماري، وأثر المساحات المفتوحة مع الرخام المتصل والإضاءات الدافئة التي تمنح إحساساً ملكياً لا ينضب.", en: "You appreciate timeless grandeur, architectural symmetry, and palatial openness with continuous marble and refined statement lighting." },
    mats: { ar: "رخام كلكتا إيطالي + كرانيش معمارية + إكسسوارات نحاسية", en: "Italian Calacatta Marble + Moldings + Brass" },
    swatches: ["#f5eee6", "#c5a880", "#2a2d34"],
  },
  minimal: {
    title: { ar: "مودرن جاباندي دافئ (Warm Minimalist / Japandi)", en: "Warm Minimalist / Japandi" },
    desc: { ar: "هدوؤك ينعكس في بيتك: تبحث عن خطوط هندسية نقية، خامات طبيعية كالأخشاب والحجر البيج، مع أقصى استفادة من ضوء النهار والشمس.", en: "Calm and grounded: you seek uncluttered geometry, organic woods, travertine stone, and generous natural daylight." },
    mats: { ar: "خشب جوز أمريكي + حجر ترافنتينو + دهانات جوتن مات", en: "American Walnut + Travertine + Jotun Matt" },
    swatches: ["#e0d6cc", "#795548", "#3e2723"],
  },
  modern: {
    title: { ar: "معماري عصري ذكي (Smart Contemporary Tech)", en: "Smart High-Tech Contemporary" },
    desc: { ar: "رؤيتك للمستقبل واضحة: تعشق تكامل التكنولوجيا، أنظمة السمارت هوم، مجريات الإضاءة الماجنتيك، والبورسلين الليزر مع أسطح داكنة مميزة.", en: "Visionary and ergonomic: you love smart home automation, magnetic track lights, laser-cut porcelain, and sleek dark accents." },
    mats: { ar: "بورسلين ليزر كبير + ماجنتيك تراك + أنظمة سمارت", en: "Large Porcelain + Magnetic Tracks + Smart Automation" },
    swatches: ["#cfd8dc", "#37474f", "#00e5ff"],
  },
};

export const quizLabels = {
  step: { ar: (n: number, total: number) => `السؤال ${n} من ${total}`, en: (n: number, total: number) => `Question ${n} of ${total}` },
  hint: { ar: "دقيقة واحدة فقط", en: "One minute only" },
  materials: { ar: "الخامات المثالية لك", en: "Your ideal materials" },
  palette: { ar: "الباليت المقترحة", en: "Suggested palette" },
};

export function quizMessage(locale: "ar" | "en", title: string, mats: string) {
  return locale === "ar"
    ? `مرحباً م. حسن أحمد،\nقمت للتو بإجراء كويز الطراز المعماري على موقعك وكانت نتيجتي:\n\n• الطراز المقترح: ${title}\n• الخامات المفضلة: ${mats}\n\nأرغب في استشارة معمارية لتطبيق هذا الطراز في شقتي / فيلتي. شكراً جزيلاً!`
    : `Hello Eng. Hassan Ahmed,\nI just completed your architectural style quiz and my result was:\n\n• Recommended Style: ${title}\n• Preferred Materials: ${mats}\n\nI would love to consult with you about designing my apartment / villa in this aesthetic. Thank you!`;
}
