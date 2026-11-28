// Generated from the original site data (assets/projects-data.json in Architecture1).
// Do not hand-edit shapes: PARITY.md requires all 16 projects and their galleries.

export type ProjectCategory = "architectural" | "interior" | "retail" | "industrial";

export type Localized = { ar: string; en: string };

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: Localized;
  description: Localized;
  client: string;
  tools: string[];
  cover: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    "slug": "store",
    "category": "retail",
    "title": {
      "ar": "S.T.O.R.E — متجر مجوهرات وألماس فاخر",
      "en": "S.T.O.R.E — Luxury Jewelry & Diamond Showroom"
    },
    "description": {
      "ar": "تصميم وتنفيذ متجر مجوهرات وألماس راقي بواجهات عرض زجاجية مضيئة، كاونترات رخامية فاخرة وتجاليد خشبية دافئة مع إضاءة سبوت متخصصة CRI 95+ لإبراز بريق الذهب والأحجار الكريمة.",
      "en": "High-end luxury jewelry & diamond showroom featuring bespoke illuminated display vitrines, bookmatched marble consultation counters, and calibrated CRI 95+ accent lighting."
    },
    "client": "Luxury Jewelry Brand",
    "tools": [
      "3ds Max",
      "Lumion",
      "Photoshop",
      "Lighting Design"
    ],
    "cover": "/images/projects/jewelry-store-1.jpg",
    "gallery": [
      "/images/projects/jewelry-store-1.jpg",
      "/images/projects/jewelry-store-2.jpg",
      "/images/projects/jewelry-store-3.jpg",
      "/images/projects/jewelry-store-4.jpg",
      "/images/projects/jewelry-store-5.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/4a33ac187527269.689d265da1ea5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/d7fb64187527269.689d265da2527.png"
    ]
  },
  {
    "slug": "facade",
    "category": "architectural",
    "title": {
      "ar": "F.A.C.A.D.E. — واجهة عمارة سكنية نيوكلاسيك ملكي",
      "en": "F.A.C.A.D.E. — Royal Neoclassical Residential Building"
    },
    "description": {
      "ar": "تصميم معماري لواجهة مبنى سكني فاخر من 6 طوابق بالطراز النيوكلاسيكي الملكي، يتضمن مصعداً بانورامياً زجاجياً مدمجاً، شرفات بأعمدة كلاسيكية وتيجان مذهبة، وتكسيات حجرية متينة.",
      "en": "Architectural facade design for a 6-story royal neoclassical residential building featuring an integrated panoramic glass elevator shaft, classical colonnades, and gold-leaf corbels."
    },
    "client": "Private Developer",
    "tools": [
      "AutoCAD",
      "3ds Max",
      "Lumion",
      "Working Drawings"
    ],
    "cover": "/images/projects/neoclassical-building-detail.jpg",
    "gallery": [
      "/images/projects/neoclassical-building-detail.jpg",
      "/images/projects/neoclassical-building-wide.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9ff924209462291.689d190e5cacf.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6d4112209462291.689d190e5bb93.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1523de209462291.689d190e5c312.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b99700209462291.689d190e5b353.png"
    ]
  },
  {
    "slug": "dressing",
    "category": "interior",
    "title": {
      "ar": "D.R.E.S.S.I.N.G — غرفة ملابس ودريسنج روم ماستر",
      "en": "D.R.E.S.S.I.N.G — Luxury Walk-in Dressing Suite"
    },
    "description": {
      "ar": "تصميم دريسنج روم مفتوح بتوزيع هندسي مدروس، خزائن بيضاء كلاسيكية بإضاءات LED خطية مدمجة، ركن تسريحة بمرآة مضيئة متموجة، ومنطقة جلوس استرخاء مخملية.",
      "en": "Custom walk-in dressing suite with tailored modular joinery, integrated concealed LED channel lighting, organic wavy illuminated vanity mirror, and plush lounge seating."
    },
    "client": "Private Villa Client",
    "tools": [
      "3ds Max",
      "D5 Render",
      "Photoshop"
    ],
    "cover": "/images/projects/master-suite-dressing.jpg",
    "gallery": [
      "/images/projects/master-suite-dressing.jpg",
      "/images/projects/dressing-vanity.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/01bbc2187967907.65946e7247ca8.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/830c34187967907.65946e7249b08.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/81e02e187967907.65946e7248e20.jpg"
    ]
  },
  {
    "slug": "master-bedroom-proposal",
    "category": "interior",
    "title": {
      "ar": "Master-bedroom design proposal. — جناح النوم الرئيسي الفاخر",
      "en": "Master-bedroom design proposal. — Luxury Master Suite"
    },
    "description": {
      "ar": "جناح نوم رئيسي يجمع بين الفخامة والسكينة، جدار خلفي من الرخام الأبيض متصل العروق مع إضاءات دافئة مخفية، ثريا زجاجية كريستالية، وكراسي مخملية زمردية.",
      "en": "Luxury master bedroom suite proposal featuring a bookmatched marble accent wall, warm architectural cove lighting, a statement sculptural chandelier, and emerald velvet lounge chairs."
    },
    "client": "Golden House Design",
    "tools": [
      "3ds Max",
      "Lumion",
      "Photoshop"
    ],
    "cover": "/images/projects/master-bedroom-marble.jpg",
    "gallery": [
      "/images/projects/master-bedroom-marble.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2275a6183964601.6549635aa30f1.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/78191f183964601.6549635aa3c3f.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d7ab92183964601.6549635aa4c82.jpg"
    ]
  },
  {
    "slug": "double-height-reception",
    "category": "interior",
    "title": {
      "ar": "DOUBLE HIGHT RECEPTION — ريسيبشن مزدوج الارتفاع فخم",
      "en": "DOUBLE HIGHT RECEPTION — Palatial Double-Height Space"
    },
    "description": {
      "ar": "تصميم داخلي فخم بارتفاع مزدوج لفيلا سكنية، تكسيات رخامية متصلة وثريات معمارية عملاقة مع توزيع إضاءة مدروس لإبراز فخامة الفراغ.",
      "en": "Palatial double-height interior space with continuous bookmatched marble, statement chandeliers, and layered illumination."
    },
    "client": "Compound Villa",
    "tools": [
      "3ds Max",
      "D5 Render",
      "Photoshop"
    ],
    "cover": "/images/projects/double-height-reception.jpg",
    "gallery": [
      "/images/projects/double-height-reception.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fe737a231648797.688cd4ec62c63.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/712d22231648797.688cd4ec626d6.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e5ea12231648797.688cd4ec63496.jpg"
    ]
  },
  {
    "slug": "luxe-villa",
    "category": "architectural",
    "title": {
      "ar": "L.U.X.E.  V.I.L.L.A. — فيلا لوكس ولاندسكيب متكامل",
      "en": "L.U.X.E.  V.I.L.L.A. — Exterior Architecture & Landscape"
    },
    "description": {
      "ar": "دراسة كتل معمارية ودمج المساحات الخضراء والمسابح مع الكتل السكنية لتحقيق أقصى درجات الخصوصية والجمال الهندسي.",
      "en": "Massing study and seamless integration of landscape and pool areas with residential volumes for ultimate privacy and aesthetic balance."
    },
    "client": "Private Client",
    "tools": [
      "Revit",
      "Lumion",
      "Photoshop"
    ],
    "cover": "/images/projects/luxe-villa.jpg",
    "gallery": [
      "/images/projects/luxe-villa.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dcacba209324363.66fd8244941c3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a7f6c8209324363.66fd82449b656.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/84928f209324363.66fd8244984e3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1730fd209324363.66fd8244951c2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/752706209324363.66fd8244921c0.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/14d1d4209324363.66fd824492cfb.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e71fcd209324363.66fd824499b17.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a71624209324363.66fd82449a243.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b0da73209324363.66fd824494a12.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f8ce3c209324363.66fd824493731.jpg"
    ]
  },
  {
    "slug": "villa-entrance",
    "category": "architectural",
    "title": {
      "ar": "V.I.L.L.A.  E.N.T.R.A.N.C.E. — مدخل فيلا ملكي معاصر",
      "en": "V.I.L.L.A.  E.N.T.R.A.N.C.E. — Grand Architectural Foyer Entrance"
    },
    "description": {
      "ar": "تصميم مدخل رئيسي لفيلا خاصة بكتل معمارية متدرجة، مسارات مائية وإضاءات أرضية مخفية توجه حركة الزوار نحو الباب الرئيسي.",
      "en": "Monumental private villa entrance featuring terraced volumes, water features, and recessed ground lighting guiding visitors toward the grand foyer."
    },
    "client": "Private Compound Villa",
    "tools": [
      "AutoCAD",
      "3ds Max",
      "D5 Render"
    ],
    "cover": "/images/projects/villa-entrance.jpg",
    "gallery": [
      "/images/projects/villa-entrance.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dcb271194502831.65fcde6154d2c.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/841e1a194502831.65fcde6154154.jpg"
    ]
  },
  {
    "slug": "boss-desk",
    "category": "retail",
    "title": {
      "ar": "B.O.S.S.  D.E.S.K. — مكتب إداري وتنفيذي راقي",
      "en": "B.O.S.S.  D.E.S.K. — Executive Corporate Suite"
    },
    "description": {
      "ar": "بيئة عمل تنفيذية راقية بتكسيات خشبية داكنة وجلسة اجتماعات مدمجة تعكس هوية الشركة وقوتها الإدارية.",
      "en": "High-end corporate executive suite featuring rich wood paneling, acoustic integration, and executive meeting zone."
    },
    "client": "Corporate HQ",
    "tools": [
      "AutoCAD",
      "3ds Max",
      "D5 Render"
    ],
    "cover": "/images/projects/boss-desk.jpg",
    "gallery": [
      "/images/projects/boss-desk.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1ba745187385871.6587402ef2021.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4e3f36187385871.6587402ef2b90.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d9430f187385871.6587402ef1217.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f226c7187385871.6587402ef3777.jpg"
    ]
  },
  {
    "slug": "modern-kitchen-360",
    "category": "interior",
    "title": {
      "ar": "Modern Kitchen 360. — مطبخ مودرن بانورامي تفاعلي",
      "en": "Modern Kitchen 360. — Panoramic Kitchen & Island"
    },
    "description": {
      "ar": "استغلال هندسي دقيق للمساحات، جزيرة مطبخ رخامية مدمجة مع أحدث أنظمة التخزين والإضاءة الذكية والتهوية المخفية.",
      "en": "Ergonomic kitchen design featuring a monolithic marble island, concealed storage systems, and smart task lighting."
    },
    "client": "Residential Fit-out",
    "tools": [
      "3ds Max",
      "Lumion"
    ],
    "cover": "/images/projects/modern-kitchen-360.jpg",
    "gallery": [
      "/images/projects/modern-kitchen-360.jpg",
      "https://kuula.co/shareimg/6512-fc76-981f-4805/en_3716/01-cover.jpg"
    ]
  },
  {
    "slug": "roof-design",
    "category": "architectural",
    "title": {
      "ar": "ROOF DESIGN — تصميم روف وتراس خارجي",
      "en": "ROOF DESIGN — Rooftop Terrace & Outdoor Living"
    },
    "description": {
      "ar": "تنسيق موقع خارجي وبرجولات خشبية ومناطق شواء مع مراعاة العزل المائي والحراري للأسطح وتصريف مياه الأمطار.",
      "en": "Rooftop terrace featuring wooden pergolas, fire pit, and BBQ zone with strict waterproofing & thermal insulation engineering."
    },
    "client": "Private Villa",
    "tools": [
      "Lumion",
      "AutoCAD"
    ],
    "cover": "/images/projects/roof-design.jpg",
    "gallery": [
      "/images/projects/roof-design.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/3e7e09243825161.6989ff455c333.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3afba3243825161.6989ff455e065.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3147ce243825161.6989ff455d0ec.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/6e0882243825161.6989ff455d8cd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/05187b243825161.6989ff455c966.jpg"
    ]
  },
  {
    "slug": "majles",
    "category": "interior",
    "title": {
      "ar": "M.A.J.L.E.S — مجلس ضيوف فاخر معاصر",
      "en": "M.A.J.L.E.S — Contemporary Luxury Majles"
    },
    "description": {
      "ar": "تصميم مجلس عربي بطابع مودرن راقي يجمع بين الأصالة وفخامة الخامات والخطوط المعمارية الهادئة مع لمسات ذهبية أنيقة.",
      "en": "Sophisticated contemporary majles blending cultural hospitality with refined materials and minimalist architectural lines."
    },
    "client": "Private Client",
    "tools": [
      "3ds Max",
      "Photoshop"
    ],
    "cover": "/images/projects/majles-luxury.jpg",
    "gallery": [
      "/images/projects/majles-luxury.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/fdc30d185126543.655e2db971a72.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/106121185126543.655e2db972538.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ff286a185126543.655e2db972f9d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/830014185126543.655e2db970f85.jpg"
    ]
  },
  {
    "slug": "neoclassical-apartment",
    "category": "interior",
    "title": {
      "ar": "Neoclassical Apartment. — شقة نيوكلاسيك هايد بارك ماونتن فيو",
      "en": "Neoclassical Apartment. — Turnkey Handover Mountain View"
    },
    "description": {
      "ar": "تشطيب كامل من الطوب الأحمر وحتى المفتاح، إشراف موقعي دقيق وتنسيق كافة البنود المعمارية والكهربائية بصفر مخالفات.",
      "en": "Turnkey fit-out from bare shell to final handover with on-site engineering supervision and refined neoclassical detailing."
    },
    "client": "Mountain View (Hyde Park)",
    "tools": [
      "AutoCAD",
      "MEP Coordination",
      "Site Execution"
    ],
    "cover": "/images/projects/neoclassical-apartment.jpg",
    "gallery": [
      "/images/projects/neoclassical-apartment.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/9cbafe179155205.64f4f765a826a.jpg"
    ]
  },
  {
    "slug": "panoramic-bedroom",
    "category": "interior",
    "title": {
      "ar": "Panoramic guest's bedroom design. — غرفة نوم ضيوف بانورامية",
      "en": "Panoramic guest's bedroom design. — Panoramic Master Bedroom"
    },
    "description": {
      "ar": "إطلالة بانورامية كاملة مع دراسة وافية للإضاءة الطبيعية والستائر الكهربائية وتوزيع الأثاث بما يحقق أقصى راحة للضيوف.",
      "en": "Panoramic guest bedroom with sweeping glazed views, motorized solar shading integration, and acoustic comfort zoning."
    },
    "client": "Residential Project",
    "tools": [
      "3ds Max",
      "Lumion"
    ],
    "cover": "/images/projects/panoramic-bedroom.jpg",
    "gallery": [
      "/images/projects/panoramic-bedroom.jpg",
      "https://kuula.co/shareimg/6534-1bbd-0449-1163/en_6767/01-cover.jpg"
    ]
  },
  {
    "slug": "reception-american",
    "category": "interior",
    "title": {
      "ar": "Reception with American kitchen. — ريسبشن مع مطبخ أمريكي",
      "en": "Reception with American kitchen. — Open Concept Living"
    },
    "description": {
      "ar": "مفهوم المساحات المفتوحة (Open Concept) يدمج منطقة الاستقبال مع مطبخ أمريكي عصري بركن إفطار رخامي متناسق.",
      "en": "Open-concept living space seamlessly bridging the formal reception with a contemporary American open kitchen and breakfast bar."
    },
    "client": "Modern Apartment",
    "tools": [
      "AutoCAD",
      "3ds Max",
      "Lumion"
    ],
    "cover": "/images/projects/reception-american.jpg",
    "gallery": [
      "/images/projects/reception-american.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c1c802179852147.6500c484b4270.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/6c52e6179852147.6500c484b372d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/434966179852147.6500c484b2b72.jpg"
    ]
  },
  {
    "slug": "bathroom",
    "category": "interior",
    "title": {
      "ar": "B.A.T.H.R.O.O.M — حمام ماستر فاخر",
      "en": "B.A.T.H.R.O.O.M — Luxury Master Bathroom"
    },
    "description": {
      "ar": "حمام ماستر بتكسيات رخامية متصلة، كابينة شاور زجاج سيكوريت مع أطقم وخلاطات دفن جروهي الألمانية وحوض رخامي معلق.",
      "en": "Luxury master bathroom with floor-to-ceiling porcelain slabs, frameless glass shower enclosure, Grohe concealed brassware, and floating vanity."
    },
    "client": "Villa Master Suite",
    "tools": [
      "3ds Max",
      "D5 Render"
    ],
    "cover": "/images/projects/luxury-bathroom.jpg",
    "gallery": [
      "/images/projects/luxury-bathroom.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/1063a8186382467.65746c2ee9fb5.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/030e8f186382467.65746c2ee9101.jpg"
    ]
  },
  {
    "slug": "kitchen-design",
    "category": "interior",
    "title": {
      "ar": "KITCHEN DESIGN — مطبخ عصري مدمج",
      "en": "KITCHEN DESIGN — Contemporary Fitted Kitchen"
    },
    "description": {
      "ar": "مطبخ مودرن مدمج بتشطيبات مات وأجهزة بيلت-إن وتوزيع ميكانيكي وكهربائي دقيق لتسهيل الحركة والعمل.",
      "en": "Modern integrated kitchen featuring matte cabinetry, flush built-in appliances, and precision ergonomic work triangle."
    },
    "client": "Residential Fit-out",
    "tools": [
      "AutoCAD",
      "3ds Max"
    ],
    "cover": "/images/projects/kitchen-design.jpg",
    "gallery": [
      "/images/projects/kitchen-design.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/375904243825531.698a121ba5cfe.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/08723d243825531.698a121ba7dfa.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/73e500243825531.698a121ba63b9.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/31e5eb243825531.698a121ba70af.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ea700f243825531.698a121ba6a55.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c58aeb243825531.698a121ba7759.jpg"
    ]
  }
];

export const categories: ProjectCategory[] = ["architectural","interior","retail","industrial"];

export function getProject(slug: string) { return projects.find((p) => p.slug === slug); }

export function countByCategory(category: ProjectCategory | "all") {
  return category === "all" ? projects.length : projects.filter((p) => p.category === category).length;
}
