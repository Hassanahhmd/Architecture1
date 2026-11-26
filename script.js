/**
 * HASSAN AHMED | ARCHITECTURAL PORTFOLIO SCRIPT
 * Bilingual Engine (AR/EN), Real Project Renders, Lightbox Gallery
 * & Interactive Finishing Cost Estimator / BOQ Generator
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Bilingual Translation Engine (AR / EN)
  // ==========================================
  const translations = {
    ar: {
      "nav.name": "حسن أحمد",
      "nav.role": "مهندس معماري",
      "nav.about": "نبذة",
      "nav.stats": "الإنجازات",
      "nav.projects": "المشاريع",
      "nav.estimator": "حاسبة التكلفة",
      "nav.experience": "الخبرات",
      "nav.skills": "المهارات والبرامج",
      "nav.contact": "تواصل معي",

      "hero.portrait_role": "Architecture Engineer & 3D Visualization Specialist",
      "reel.tag": "عرض سينمائي للأعمال",
      "reel.title": "جولة مرئية داخل أبرز مشاريعنا المنفذة",
      "reel.subtitle": "لقطات متحركة عالية الدقة تستعرض تفاصيل الإضاءة، الخامات، والتكوين المعماري من أرض الواقع والتصور ثلاثي الأبعاد",
      "reel.kicker": "إظهار معماري ثلاثي الأبعاد وتنفيذ متكامل",
      "hero.badge": "متاح للمشاريع والاستشارات المعمارية",
      "hero.name": "حسن أحمد",
      "hero.quiz": "ابدأ اختبار الطراز المعماري",
      "hero.subtitle": "Architecture Engineer & 3D Visualization Specialist",
      "hero.desc": "أصمم وأقود مشاريع معمارية وداخلية في مصر، من تطوير الفكرة والمخططات إلى تنسيق الموقع والتسليم. يجمع عملي بين وضوح الرؤية، دقة التفاصيل، وخبرة تسليم أكثر من 50 مشروعاً سكنياً وتجارياً وصناعياً.",
      "hero.zero_violations": "صفر مخالفات هندسية عبر 30+ مشروع",
      "hero.view_work": "تصفح المشاريع",
      "hero.whatsapp": "محادثة واتساب",
      "hero.avatar_label": "HASSAN AHMED ARCHITECTURE",
      "hero.floating_projects": "مشروع منفذ",
      "hero.floating_satisfaction": "جودة وتسليم للمفتاح",

      "stats.p1_title": "مشروع معماري وديكور",
      "stats.p1_desc": "سكني، تجاري، وصناعي تم تسليمهم بنجاح",
      "stats.p2_title": "مخالفات هندسية",
      "stats.p2_desc": "التزام تام بأكواد البناء في 30+ مشروع مرخص",
      "stats.p3_title": "مهندسين تحت القيادة",
      "stats.p3_desc": "قيادة فرق عمل معمارية وتنفيذية على أعلى مستوى",
      "stats.p4_title": "مجمعات سكنية كبرى",
      "stats.p4_desc": "Mivida, Mountain View, Orascom, Al-Futtaim وغيرهم",

      "projects.tag": "أبرز الأعمال",
      "projects.title": "مشاريع مختارة بعناية",
      "projects.subtitle": "نماذج حقيقية من مشاريع تم قيادتها من التصميم النظري وحتى التسليم النهائي",
      "projects.filter_all": "الكل",
      "projects.filter_arch": "معماري",
      "projects.filter_interior": "تصميم داخلي",
      "projects.filter_retail": "تجاري & ريتيل",
      "projects.filter_industrial": "صناعي وإنشائي",
      "projects.view_details": "عرض التفاصيل والصور",
      "projects.behance_cta": "عرض كافة الأعمال على Behance",
      "tiktok.tag": "من أعمال الاستوديو",
      "tiktok.title": "جولات المشاريع على تيك توك",
      "tiktok.subtitle": "شاهد تفاصيل التصميم والتحولات المعمارية من Design-Scape.",
      "tiktok.profile": "شاهد جميع الفيديوهات على تيك توك",

            // Estimator translations & 2027 Quotas (AR)
      "est.tag": "تخطيط أولي للميزانية",
      "est.title": "حاسبة تكلفة التشطيب التقديرية لعام 2027",
      "est.subtitle": "تقدير أولي للتكلفة حسب المساحة ومستوى التشطيب. الأسعار والمزايا قابلة للتغيير؛ اطلب عرض سعر مكتوباً ومحدثاً قبل اتخاذ قرار أو توقيع عقد.",
      "est.unit_type_label": "نوع الوحدة العقارية",
      "est.unit_apt": "شقة سكنية",
      "est.unit_villa": "فيلا / دوبلكس",
      "est.unit_office": "مكتب إداري",
      "est.unit_retail": "محل تجاري / ريتيل",
      "est.area_label": "المساحة الإجمالية (متر مربع)",
      "est.m2": "م²",
      "est.tier_label": "باقات التشطيب لعام 2027 وعناصر كل باقة",
      "est.quotas_live_tag": "أسعار باقات 2027 — تُؤكد بعرض سعر",
      "est.gift_box_title": "كوتة وهدايا الباقة المشمولة مجاناً:",
      "est.gift_note": "مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.",

      // 2027 Quotas Matrix
      "matrix.badge": "باقات وأسعار 2027 المعتمدة",
      "matrix.title": "جدول باقات التشطيب والهدايا لعام 2027",
      "matrix.desc": "استخدم القيم للتخطيط الأولي فقط. الأسعار والمزايا قد تتغير ويجب تأكيدها بعرض سعر مكتوب.",

      // 7 Tiers (AR)
      "tier.eco_name": "الباقة الإقتصادية (ECONOMIC)",
      "tier.eco_desc": "تشطيب عملي بمواد معتمدة تلبي معايير الجودة الهندسية الأساسية بأفضل ميزانية.",
      "tier.eco_gift": "التشطيب القياسي الأساسي (بدون أجهزة)",
      "tier.eco_f1": "دهانات GLC بلاستيك 3030 معجون 3 سكاكين",
      "tier.eco_f2": "سيراميك فرز أول كليوباترا / رويال",
      "tier.eco_f3": "أطقم صحي ليسيكو / إيديال ستاندارد",
      "tier.eco_f4": "تأسيس كهرباء كابلات السويدي الأصلية",

      "tier.med_name": "الباقة المتوسطة (MEDIUM)",
      "tier.med_desc": "توازن مثالي بين الخامات العصرية والأداء العملي مع أجهزة أساسية مشمولة.",
      "tier.med_gift": "هدية: سخانات كهرباء + تكييف 1.5 حصان ميديا",
      "tier.med_f1": "سخانات كهرباء عادية للحمامات",
      "tier.med_f2": "تكييف 1.5 حصان ميديا (Midea)",
      "tier.med_f3": "دهانات جوتن فينوماستيك أصلي ومظهر حريري",
      "tier.med_f4": "سيراميك قطع ليزر فاخر وأطقم ديورافيت",

      "tier.vip_name": "باقة في آي بي (VIP PACKAGE)",
      "tier.vip_desc": "مستوى راقٍ يجمع بين فخامة التشطيب وتجهيزات الترفيه والتبريد.",
      "tier.vip_gift": "هدية: تكييف 1.5 حصان ميديا + (2) شاشة LG 43 بوصة",
      "tier.vip_f1": "تكييف 1.5 حصان ميديا (Midea)",
      "tier.vip_f2": "(2) شاشة 43 LG بوصة سمارت",
      "tier.vip_f3": "بورسلين أرضيات مستورد + خشب HDF للغرف",
      "tier.vip_f4": "خلاطات جروهي (Grohe) وأسقف جبس بورد كناوف",

      "tier.uvip_name": "باقة ألترا في آي بي (ULTRA VIP)",
      "tier.uvip_desc": "أناقة فندقية راقية مع باقة تكييفات وشاشات سمارت مضاعفة.",
      "tier.uvip_gift": "هدية: (2) تكييف 1.5 حصان + (2) شاشة LG 43 بوصة",
      "tier.uvip_f1": "(2) تكييف 1.5 حصان سبليت",
      "tier.uvip_f2": "(2) شاشة 43 LG بوصة بدقة 4K",
      "tier.uvip_f3": "بورسلين مقاسات كبرى وإضاءات بروفايل وماجنتيك",
      "tier.uvip_f4": "صحي دفن معلق وأبواب قشرة أرو طبيعي فاخرة",

      "tier.suvip_name": "باقة سوبر ألترا في آي بي (S.U.VIP)",
      "tier.suvip_desc": "تشطيب نيوكلاسيك ومعاصر متكامل مع مطبخ وجزامة تفصيل مجاناً.",
      "tier.suvip_gift": "هدية: مطبخ تفصيل (15م) + جزامة تفصيل هدية",
      "tier.suvip_f1": "مطبخ هدية تفصيل كامل (15 متر طولي)",
      "tier.suvip_f2": "جزامة مدخل مودرن تفصيل هدية",
      "tier.suvip_f3": "رخام مستورد وتكسيات جدارية خشبية ورخامية",
      "tier.suvip_f4": "عزل صوتي متطور وأطقم صحية إيطالية متميزة",

      "tier.elite_badge": "خيار النخبة المعمارية (ELITE)",
      "tier.elite_name": "باقة إيليت (ELITE PACKAGE)",
      "tier.elite_desc": "أرقى مقاييس الذوق المعماري والصفوة؛ مطبخ فاخر ودريسنج كامل تفصيل.",
      "tier.elite_gift": "هدية: مطبخ تفصيل (15م) + دريسنج روم (5م)",
      "tier.elite_f1": "مطبخ هدية كامل تفصيل (15 متر) بخامات بولي لاك / أكرليك",
      "tier.elite_f2": "دريسنج روم كامل هدية تفصيل (5 متر) بإضاءات ليد سينسور",
      "tier.elite_f3": "رخام مستورد كلكتا / سيلفيا / إمبرادور مع جلي كريستالي",
      "tier.elite_f4": "سمارت هوم متكامل وتكسيات ديكورية وقواطع زجاجية سيكوريت",

      "tier.lux_badge": "قمة الفخامة (ROYAL LUXURY)",
      "tier.lux_name": "باقة لاكشري (LUXURY PACKAGE)",
      "tier.lux_desc": "فخامة القصور والفلل الملكية؛ مطبخ 20م ودريسنج 8م وغرفة أطفال كاملة مصنعة.",
      "tier.lux_gift": "هدية: مطبخ 20م + دريسنج 8م + غرفة أطفال كاملة",
      "tier.lux_f1": "مطبخ هدية تفصيل عملاق (20 متر) بأعلى المواصفات الأوروبية",
      "tier.lux_f2": "دريسنج روم ماستر كامل هدية تفصيل (8 متر) مع مرايا مضيئة",
      "tier.lux_f3": "غرفة أطفال كاملة هدية مصنعة (2 سرير 120 + 1 كومود + دولاب 160)",
      "tier.lux_f4": "رخام إيطالي بوكماتش، أتمتة شاملة، وأعلى معايير الإشراف المعماري",
      "est.addons_label": "البنود الإضافية والتحسينات المخصصة",
      "est.add_gypsum": "أسقف معلقة وجبس بورد كامل",
      "est.add_door": "باب مصفح تركي عالي الأمان + نجارة أبواب",
      "est.add_smart": "نظام سمارت هوم وإنارة ذكية",
      "est.add_hvac": "تأسيس تكييفات كونسيلد ومواسير فريون",
      "est.summary_tag": "مقايسة معمارية استرشادية",
      "est.summary_title": "ملخص التكاليف التقديرية",
      "est.total_label": "إجمالي التكلفة التقديرية للتشطيب",
      "est.rate_label": "سعر المتر المربع التقديري:",
      "est.b_materials": "الخامات ومواد البناء (60%)",
      "est.b_labor": "المصنعيات والتنفيذ الحرفي (25%)",
      "est.b_supervision": "الإشراف الهندسي والإدارة (15%)",
      "est.timeline_lbl": "مدة التنفيذ المتوقعة",
      "est.warranty_lbl": "ضمان الأعمال",
      "est.warranty_val": "10 سنوات إنشائي",
      "est.milestones_title": "جدول الدفعات المقترح",
      "est.m1": "مقدم تعاقد وتجهيز",
      "est.m2": "بعد تأسيس MEP",
      "est.m3": "بعد الجبس والتشطيبات",
      "est.m4": "عند التسليم النهائي",
      "est.cta_whatsapp": "إرسال المقايسة للمهندس حسن عبر واتساب",
      "est.cta_print": "طباعة المقايسة (PDF)",

      // Interactive Lab translations
      "nav.lab": "🧬 اختبار الطراز المعماري",
      "lab.tag": "تجربة تفاعلية حصرية",
      "lab.title": "معمل الإبداع المعماري التفاعلي",
      "lab.subtitle": "اختبر الرؤية الهندسية، تفاعل مع الإضاءة والخامات، واكتشف الطراز المعماري الأنسب لبيتك",
      "lab.tab_ba": "قبل وبعد",
      "lab.tab_light": "محاكي الشمس والضوء",
      "lab.tab_360": "جولة 360° بانورامية",
      "lab.tab_mat": "مغير الخامات اللحظي",
      "lab.tab_quiz": "كويز الطراز المناسب",

      "ba.title": "التحول المعماري: من الطوب الأحمر إلى التسليم الفاخر",
      "ba.desc": "اسحب الخط الفاصل يميناً ويساراً لمشاهدة دقة التنفيذ من مرحلة العظم وحتى التشطيب المتكامل",
      "ba.badge": "مشروع هايد بارك - ماونتن فيو",
      "ba.raw_label": "مرحلة العظم والتأسيس",
      "ba.fin_label": "التسليم النهائي الفاخر",
      "ba.hint": "💡 اسحب المقبض بالماوس أو اللمس لرؤية التحول الكامل",

      "light.title": "محاكي حركة الشمس ودراسة الإضاءة المعمارية",
      "light.desc": "اختبر كيف يتغير الإحساس بالفراغ المعماري وكتل الواجهة عبر أوقات اليوم المختلفة",
      "light.morning": "شمس الصباح",
      "light.sunset": "الغروب الذهبي",
      "light.night": "الإضاءة الليلية",

      "tour.title": "معاينة بانورامية 360° للفراغات المعمارية",
      "tour.desc": "استكشف أدق التفاصيل الهندسية والفرش بالدوران الكامل في جميع الاتجاهات",
      "tour.r1": "المطبخ المودرن 360°",
      "tour.r2": "غرفة النوم البانورامية",
      "tour.drag_hint": "اسحب لليمين واليسار للدوران 360°",

      "mat.title": "مغير الخامات والمود بورد المعماري الحي",
      "mat.desc": "جرّب تأثير تبديل خامات الرخام والأخشاب والألوان على طابع وروح الفراغ الداخلي",
      "mat.choose_palette": "اختر باليت الخامات والمزاج العام:",

      "quiz.q1": "ما هو الإحساس الأول الذي ترغب في أن يشعر به زوار منزلك؟",
      "quiz.q2": "ما هي خاماتك المفضلة للأرضيات والحوائط؟",
      "quiz.q3": "كيف تتخيل نظام الإنارة والأسقف في فراغك المثالي؟",
      "quiz.res_tag": "تحليلك المعماري الدقيق",
      "quiz.cta_whatsapp": "استشارة م. حسن لتصميم هذا الطراز في بيتي",
      "quiz.retake": "إعادة الاختبار ↺",

      "exp.tag": "المسيرة المهنية",
      "exp.title": "خبرات عملية مثبتة بالنتائج",
      "exp.subtitle": "تدرج وتنوع مهني في كبرى الشركات والمشاريع الريادية",
      "exp.r1_role": "مصمم ومعماري مشاريع سكنية وفاخرة",
      "exp.r1_comp": "Residential & Commercial Projects",
      "exp.r1_p1": "إدارة وتوجيه مشاريع الفلل والشقق الفاخرة من الفكرة والتصميم وحتى التنفيذ والتسليم في كمبوندات النخبة (Mivida, Mountain View, Orascom, E-Tapa, Al-Futtaim).",
      "exp.r1_p2": "المشاركة في مرحلة التصميم المبدئي لمركز التأهيل وعلاج الإدمان في المملكة العربية السعودية (Saudi Rehab & Detox Center).",
      "exp.r1_p3": "تصميم وتسليم أكثر من 50 مشروعاً معمارياً وداخلياً متضمناً اللوحات التنفيذية، لوحات المزاج (Mood boards)، ومخططات الفرش والإظهار ثلاثي الأبعاد 3D.",
      "exp.r1_p4": "قيادة فريق يضم 4 مهندسين وتحقيق صفر مخالفات هندسية عبر 30 مشروعاً خاضعاً للإشراف.",
      "exp.r2_role": "مهندس معماري",
      "exp.r2_p1": "مراجعة وتطوير المخططات المعمارية ومطابقة ودمج مفاهيم التصميم الداخلي مع الرسومات التنفيذية.",
      "exp.r3_role": "مهندس معماري",
      "exp.r3_p1": "تقييم تطوير المخططات واستراتيجيات الاستجابة للطوارئ طبقاً لاشتراطات ومعايير الدفاع المدني والسلامة الإنشائية.",

      "skills.tag": "الكفاءات والأدوات",
      "skills.title": "البرمجيات الهندسية والتدريب التخصصي",
      "skills.software_title": "البرمجيات والأدوات الهندسية",
      "skills.training_title": "الدورات والشهادات الميدانية",
      "skills.languages_title": "اللغات والكفاءات التواصلية",
      "skills.lang_ar": "العربية",
      "skills.lang_ar_lvl": "اللغة الأم (Native)",
      "skills.lang_en": "الإنجليزية",
      "skills.lang_en_lvl": "ممتاز / احترافي (Professional)",

      "edu.tag": "الخلفية الأكاديمية",
      "edu.title": "المؤهل التعليمي والاعتماد الدولي",
      "edu.degree": "بكالوريوس الهندسة المعمارية (B.Sc. Architecture Engineering)",
      "edu.college": "الكلية الكندية الدولية - الجيزة (Canadian International College - CIC)",
      "edu.partner": "معتمد وموثق رسمياً من جامعة كيب بريتون - نوفا سكوشا، كندا (Cape Breton University, Canada)",
      "edu.dates": "سبتمبر 2019 — يوليو 2024",

      "contact.tag": "تواصل مباشر",
      "contact.title": "لنبدأ في تحويل رؤيتك المعمارية إلى واقع",
      "contact.subtitle": "سواء كنت تخطط لبناء فيلا، تصميم ديكور داخلي فاخر، أو تنفيذ منشأة صناعية، يسعدني مناقشة مشروعك.",
      "contact.email_label": "البريد الإلكتروني",
      "contact.phone_label": "الهاتف المباشر",
      "contact.behance_label": "معرض الأعمال",
      "contact.loc_label": "الموقع الحالي",
      "contact.loc_val": "القاهرة، جمهورية مصر العربية",
      "contact.btn_whatsapp": "تواصل عبر واتساب فوراً",
      "contact.btn_email": "إرسال بريد إلكتروني",

      "footer.name": "حسن أحمد",
      "footer.rights": "جميع الحقوق محفوظة."
    },

    en: {
      "nav.name": "Hassan Ahmed",
      "nav.role": "Architect",
      "nav.about": "About",
      "nav.stats": "Achievements",
      "nav.projects": "Projects",
      "nav.estimator": "Cost Estimator",
      "nav.experience": "Experience",
      "nav.skills": "Skills & Tools",
      "nav.contact": "Contact",

      "hero.portrait_role": "Architecture Engineer & 3D Visualization Specialist",
      "reel.tag": "Cinematic Studio Showreel",
      "reel.title": "Motion Tour Inside Selected Signature Works",
      "reel.subtitle": "High-definition animated architectural sequences showcasing lighting, material depth, and spatial flow",
      "reel.kicker": "3D VISUALIZATION & TURNKEY EXECUTION",
      "hero.badge": "Available for Architecture & Interior Projects",
      "hero.name": "Hassan Ahmed",
      "hero.quiz": "Take the Architectural Style Quiz",
      "hero.subtitle": "Architecture Engineer & 3D Visualization Specialist",
      "hero.desc": "Architectural and interior design across Egypt, from concept development and drawings through site coordination and handover. A detail-led approach backed by 50+ residential, retail, and industrial projects delivered.",
      "hero.zero_violations": "Zero Code Violations across 30+ projects",
      "hero.view_work": "Explore Projects",
      "hero.whatsapp": "WhatsApp Chat",
      "hero.avatar_label": "HASSAN AHMED ARCHITECTURE",
      "hero.floating_projects": "Delivered Projects",
      "hero.floating_satisfaction": "Turnkey Quality",

      "stats.p1_title": "Architecture & Interior Projects",
      "stats.p1_desc": "Residential, retail and industrial successfully delivered",
      "stats.p2_title": "Code Violations",
      "stats.p2_desc": "Zero code violations across 30 supervised builds",
      "stats.p3_title": "Engineers Led",
      "stats.p3_desc": "Supervised & directed cross-functional site & design teams",
      "stats.p4_title": "Top Compounds",
      "stats.p4_desc": "Mivida, Mountain View, Orascom, Al-Futtaim and more",

      "projects.tag": "Selected Portfolio",
      "projects.title": "Selected Work",
      "projects.subtitle": "Selected projects demonstrating clear design intent, detailed coordination, and considered delivery.",
      "projects.filter_all": "All",
      "projects.filter_arch": "Architecture",
      "projects.filter_interior": "Interior Design",
      "projects.filter_retail": "Retail & Commercial",
      "projects.filter_industrial": "Industrial",
      "projects.view_details": "View Details & Renders",
      "projects.behance_cta": "View Full Portfolio on Behance",
      "tiktok.tag": "From the studio",
      "tiktok.title": "Project walkthroughs on TikTok",
      "tiktok.subtitle": "Watch real design details and transformations from Design-Scape.",
      "tiktok.profile": "View all videos on TikTok",

            // Estimator translations & 2027 Quotas (EN)
      "est.tag": "Early Budget Planner",
      "est.title": "2027 Finishing Cost Estimate",
      "est.subtitle": "Build an initial budget from area and finish level. Prices and inclusions may change; confirm them in a current written quotation before making decisions or signing.",
      "est.unit_type_label": "Property Type",
      "est.unit_apt": "Apartment",
      "est.unit_villa": "Villa / Duplex",
      "est.unit_office": "Corporate Office",
      "est.unit_retail": "Retail Store",
      "est.area_label": "Total Floor Area (Square Meters)",
      "est.m2": "m²",
      "est.tier_label": "2027 Finishing Packages & Inclusions",
      "est.quotas_live_tag": "2027 Package Rates · Confirm by Quote",
      "est.gift_box_title": "Included Package Perks & Quota Bonus:",
      "est.gift_note": "Included in 2027 packages and confirmed in the written quotation.",

      // 2027 Quotas Matrix (EN)
      "matrix.badge": "2027 Packages & Pricing",
      "matrix.title": "2027 Finishing Packages & Inclusions",
      "matrix.desc": "Use these values for early planning only. Prices and inclusions can change; confirm them in a current written quote.",

      // 7 Tiers (EN)
      "tier.eco_name": "Economic Package",
      "tier.eco_desc": "Cost-effective, durable fit-out with certified local materials meeting engineering standards.",
      "tier.eco_gift": "Standard Baseline Fit-out (No Appliances)",
      "tier.eco_f1": "GLC putty & 3030 acrylic paints",
      "tier.eco_f2": "First-choice Cleopatra / Royal ceramics",
      "tier.eco_f3": "Lecico / Ideal Standard sanitary wares",
      "tier.eco_f4": "El Sewedy certified copper electrical wiring",

      "tier.med_name": "Medium Package",
      "tier.med_desc": "Balanced modern finishing with practical durability and included core appliances.",
      "tier.med_gift": "Gift: Water Heaters + Midea 1.5 HP AC",
      "tier.med_f1": "Electric water heaters for bathrooms",
      "tier.med_f2": "Midea 1.5 HP air conditioner",
      "tier.med_f3": "Original Jotun Fenomastic silk paint",
      "tier.med_f4": "Laser-cut porcelain tiles & Duravit sanitary wares",

      "tier.vip_name": "VIP Package",
      "tier.vip_desc": "Elevated luxury combining premium materials with cooling and smart entertainment systems.",
      "tier.vip_gift": "Gift: Midea 1.5 HP AC + (2) LG 43-inch Smart TVs",
      "tier.vip_f1": "Midea 1.5 HP air conditioner",
      "tier.vip_f2": "(2) LG 43-inch Smart 4K TVs",
      "tier.vip_f3": "Imported porcelain flooring + German HDF for bedrooms",
      "tier.vip_f4": "Grohe German mixers + Knauf gypsum ceilings",

      "tier.uvip_name": "Ultra VIP Package",
      "tier.uvip_desc": "Hotel-grade luxury with dual air conditioning units and dual 4K smart screens.",
      "tier.uvip_gift": "Gift: (2) 1.5 HP ACs + (2) LG 43-inch Smart TVs",
      "tier.uvip_f1": "(2) 1.5 HP split air conditioners",
      "tier.uvip_f2": "(2) LG 43-inch Smart 4K TVs",
      "tier.uvip_f3": "Large-format porcelain slabs & magnetic profile lights",
      "tier.uvip_f4": "Concealed wall-hung tanks & natural oak veneer doors",

      "tier.suvip_name": "Super Ultra VIP Package",
      "tier.suvip_desc": "Neoclassical & modern masterclass with custom-manufactured kitchen and shoe cabinet.",
      "tier.suvip_gift": "Gift: Custom Kitchen (15m) + Shoe Cabinet",
      "tier.suvip_f1": "Full custom kitchen (15 linear meters) included",
      "tier.suvip_f2": "Custom entrance shoe cabinet included",
      "tier.suvip_f3": "Imported natural marble & acoustic wood claddings",
      "tier.suvip_f4": "Advanced sound insulation & premium Italian fixtures",

      "tier.elite_badge": "Architectural Choice (ELITE)",
      "tier.elite_name": "Elite Package",
      "tier.elite_desc": "Signature architectural perfection; custom kitchen and full master dressing room included.",
      "tier.elite_gift": "Gift: Custom Kitchen (15m) + Dressing Room (5m)",
      "tier.elite_f1": "Custom luxury kitchen (15m) with Poly-lac / Acrylic fronts",
      "tier.elite_f2": "Custom dressing room (5m) with sensor LED illumination",
      "tier.elite_f3": "Imported Calacatta / Sylvia marble with automated mirror polish",
      "tier.elite_f4": "Integrated Smart Home automation & tempered glass partitions",

      "tier.lux_badge": "Royal Luxury (PALACE GRADE)",
      "tier.lux_name": "Luxury Package",
      "tier.lux_desc": "Pinnacle of royal luxury; giant 20m kitchen, 8m dressing room, and full manufactured kids bedroom.",
      "tier.lux_gift": "Gift: Kitchen (20m) + Dressing (8m) + Kids Bedroom Set",
      "tier.lux_f1": "Massive custom kitchen (20 linear meters) to European specs",
      "tier.lux_f2": "Master dressing room (8 linear meters) with backlit mirrors",
      "tier.lux_f3": "Complete kids bedroom set (2 beds 120cm + nightstand + wardrobe 160cm)",
      "tier.lux_f4": "Bookmatched Italian marble, comprehensive automation & bespoke supervision",
      "est.addons_label": "Custom Add-on Packages",
      "est.add_gypsum": "Complete Gypsum Board Ceilings & Coves",
      "est.add_door": "High-Security Turkish Armored Door + Interior Doors",
      "est.add_smart": "Smart Home Automation System",
      "est.add_hvac": "Concealed HVAC Piping & Freon Prep",
      "est.summary_tag": "Architectural Estimate",
      "est.summary_title": "Project Cost Summary",
      "est.total_label": "Total Estimated Fit-out Cost",
      "est.rate_label": "Estimated Cost per m²:",
      "est.b_materials": "Materials & Supplies (60%)",
      "est.b_labor": "Skilled Labor & Craftsmanship (25%)",
      "est.b_supervision": "Engineering Supervision & Management (15%)",
      "est.timeline_lbl": "Estimated Duration",
      "est.warranty_lbl": "Engineering Warranty",
      "est.warranty_val": "10-Year Structural",
      "est.milestones_title": "Proposed Payment Schedule",
      "est.m1": "Down payment & mobilization",
      "est.m2": "Post MEP rough-in",
      "est.m3": "Post gypsum & base finishes",
      "est.m4": "Final inspection & handover",
      "est.cta_whatsapp": "Send Estimate to Eng. Hassan via WhatsApp",
      "est.cta_print": "Print Estimate (PDF)",

      // Interactive Lab translations (EN)
      "nav.lab": "🧬 Architectural Style Quiz",
      "lab.tag": "Exclusive Architectural Experience",
      "lab.title": "Interactive Architectural Lab",
      "lab.subtitle": "Explore spatial concepts, interact with natural daylight and materials, and discover your design DNA",
      "lab.tab_ba": "Before & After",
      "lab.tab_light": "Daylight & Sun Simulator",
      "lab.tab_360": "360° Panoramic Tour",
      "lab.tab_mat": "Live Material Swapper",
      "lab.tab_quiz": "Architectural Style Quiz",

      "ba.title": "Architectural Transformation: Bare Shell to Turnkey Luxury",
      "ba.desc": "Drag the split slider to witness the engineering transition from rough masonry to refined execution",
      "ba.badge": "Hyde Park Project - Mountain View",
      "ba.raw_label": "Bare Shell & Rough-in",
      "ba.fin_label": "Turnkey Luxury Handover",
      "ba.hint": "💡 Drag the slider handle with touch or mouse to reveal transformation",

      "light.title": "Daylight Optimization & Sun Angle Simulator",
      "light.desc": "Observe how natural orientation, shadows, and architectural lighting sculpt exterior massing",
      "light.morning": "Morning Sun",
      "light.sunset": "Golden Hour",
      "light.night": "Night Architectural Scene",

      "tour.title": "360° Panoramic Spatial Inspection",
      "tour.desc": "Explore interior detailing, joinery, and layout ergonomics with full 360-degree interactive rotation",
      "tour.r1": "Modern Kitchen 360°",
      "tour.r2": "Panoramic Master Suite",
      "tour.drag_hint": "Drag left or right to explore in 360°",

      "mat.title": "Live Material & Architectural Mood Board Swapper",
      "mat.desc": "Test the atmospheric impact of contrasting marbles, tactile hardwoods, and acoustic paneling",
      "mat.choose_palette": "Select your architectural material palette:",

      "quiz.q1": "What primary emotion do you want your home to evoke when entering?",
      "quiz.q2": "Which material finishes resonate most with your aesthetic taste?",
      "quiz.q3": "How do you envision the ceiling and lighting systems in your ideal space?",
      "quiz.res_tag": "Your Architectural DNA Analysis",
      "quiz.cta_whatsapp": "Consult Eng. Hassan to Design This Style for My Home",
      "quiz.retake": "Retake Quiz ↺",

      "exp.tag": "Work Experience",
      "exp.title": "Proven Track Record of Excellence",
      "exp.subtitle": "Hands-on engineering across leading architectural practices and top-tier developers",
      "exp.r1_role": "Architectural Designer, Residential Projects",
      "exp.r1_comp": "Residential & Commercial Projects",
      "exp.r1_p1": "Directed villa and apartment projects from concept and design through execution and handover, remotely and on site, in premium compounds including Mivida, Mountain View, Orascom, E-Tapa and Al-Futtaim.",
      "exp.r1_p2": "Contributed to conceptual stage design for a Saudi detox and rehabilitation center.",
      "exp.r1_p3": "Designed and delivered 50+ architectural and interior projects, including working drawings, mood boards, space plans and 3D visualizations.",
      "exp.r1_p4": "Led a team of 4 architects and engineers and achieved zero code violations across 30 projects.",
      "exp.r2_role": "Architecture Engineer",
      "exp.r2_p1": "Reviewed the development of architectural plans and the integration of interior design concepts.",
      "exp.r3_role": "Architecture Engineer",
      "exp.r3_p1": "Evaluated plan development and emergency-response strategies in line with Civil Defense requirements.",

      "skills.tag": "Core Competencies",
      "skills.title": "Software Proficiency & Professional Training",
      "skills.software_title": "Engineering Software & Tools",
      "skills.training_title": "Field Certifications & Site Training",
      "skills.languages_title": "Languages & Communication",
      "skills.lang_ar": "Arabic",
      "skills.lang_ar_lvl": "Native Speaker",
      "skills.lang_en": "English",
      "skills.lang_en_lvl": "Professional Working Proficiency",

      "edu.tag": "Education",
      "edu.title": "Academic Degree & Accreditation",
      "edu.degree": "B.Sc. Architecture Engineering",
      "edu.college": "Canadian International College (CIC), Giza",
      "edu.partner": "Validated & Accredited by Cape Breton University, Nova Scotia, Canada",
      "edu.dates": "Sep 2019 – Jul 2024",

      "contact.tag": "Direct Contact",
      "contact.title": "Let's Bring Your Architectural Vision to Life",
      "contact.subtitle": "Whether planning a private luxury villa, commercial fit-out, or industrial facility, I am here to assist.",
      "contact.email_label": "Email Address",
      "contact.phone_label": "Direct Phone / Mobile",
      "contact.behance_label": "Portfolio on Behance",
      "contact.loc_label": "Current Location",
      "contact.loc_val": "Cairo, Egypt",
      "contact.btn_whatsapp": "Message on WhatsApp",
      "contact.btn_email": "Send Email",

      "footer.name": "Hassan Ahmed",
      "footer.rights": "All rights reserved."
    }
  };

  let currentLang = 'ar';

  function applyLanguage(lang) {
    currentLang = lang;
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update all text nodes with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update Lang button text
    const langBtnText = document.querySelector('#langToggle .lang-text');
    if (langBtnText) {
      langBtnText.textContent = lang === 'ar' ? 'EN' : 'عربي';
    }

    // Re-render projects and update estimator text in the new language
    renderProjects(activeFilter);
    calculateEstimate();
  }

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }


  // ==========================================
  // 2. Mobile Drawer Navigation
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', openDrawer);
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  // ==========================================
  // 3. Projects Data, Dynamic Grid & Lightbox
  // ==========================================
  const projectsData = [
    {
        "id": "store",
        "title_ar": "S.T.O.R.E — متجر مجوهرات وألماس فاخر",
        "title_en": "S.T.O.R.E — Luxury Jewelry & Diamond Showroom",
        "category": "retail",
        "image": "assets/projects/jewelry-store-1.jpg",
        "gallery": [
            "assets/projects/jewelry-store-1.jpg",
            "assets/projects/jewelry-store-2.jpg",
            "assets/projects/jewelry-store-3.jpg",
            "assets/projects/jewelry-store-4.jpg",
            "assets/projects/jewelry-store-5.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/4a33ac187527269.689d265da1ea5.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/d7fb64187527269.689d265da2527.png"
        ],
        "desc_ar": "تصميم وتنفيذ متجر مجوهرات وألماس راقي بواجهات عرض زجاجية مضيئة، كاونترات رخامية فاخرة وتجاليد خشبية دافئة مع إضاءة سبوت متخصصة CRI 95+ لإبراز بريق الذهب والأحجار الكريمة.",
        "desc_en": "High-end luxury jewelry & diamond showroom featuring bespoke illuminated display vitrines, bookmatched marble consultation counters, and calibrated CRI 95+ accent lighting.",
        "client": "Luxury Jewelry Brand",
        "tools": [
            "3ds Max",
            "Lumion",
            "Photoshop",
            "Lighting Design"
        ]
    },
    {
        "id": "facade",
        "title_ar": "F.A.C.A.D.E. — واجهة عمارة سكنية نيوكلاسيك ملكي",
        "title_en": "F.A.C.A.D.E. — Royal Neoclassical Residential Building",
        "category": "architectural",
        "image": "assets/projects/neoclassical-building-detail.jpg",
        "gallery": [
            "assets/projects/neoclassical-building-detail.jpg",
            "assets/projects/neoclassical-building-wide.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9ff924209462291.689d190e5cacf.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6d4112209462291.689d190e5bb93.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1523de209462291.689d190e5c312.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b99700209462291.689d190e5b353.png"
        ],
        "desc_ar": "تصميم معماري لواجهة مبنى سكني فاخر من 6 طوابق بالطراز النيوكلاسيكي الملكي، يتضمن مصعداً بانورامياً زجاجياً مدمجاً، شرفات بأعمدة كلاسيكية وتيجان مذهبة، وتكسيات حجرية متينة.",
        "desc_en": "Architectural facade design for a 6-story royal neoclassical residential building featuring an integrated panoramic glass elevator shaft, classical colonnades, and gold-leaf corbels.",
        "client": "Private Developer",
        "tools": [
            "AutoCAD",
            "3ds Max",
            "Lumion",
            "Working Drawings"
        ]
    },
    {
        "id": "dressing",
        "title_ar": "D.R.E.S.S.I.N.G — غرفة ملابس ودريسنج روم ماستر",
        "title_en": "D.R.E.S.S.I.N.G — Luxury Walk-in Dressing Suite",
        "category": "interior",
        "image": "assets/projects/master-suite-dressing.jpg",
        "gallery": [
            "assets/projects/master-suite-dressing.jpg",
            "assets/projects/dressing-vanity.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/01bbc2187967907.65946e7247ca8.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/830c34187967907.65946e7249b08.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/81e02e187967907.65946e7248e20.jpg"
        ],
        "desc_ar": "تصميم دريسنج روم مفتوح بتوزيع هندسي مدروس، خزائن بيضاء كلاسيكية بإضاءات LED خطية مدمجة، ركن تسريحة بمرآة مضيئة متموجة، ومنطقة جلوس استرخاء مخملية.",
        "desc_en": "Custom walk-in dressing suite with tailored modular joinery, integrated concealed LED channel lighting, organic wavy illuminated vanity mirror, and plush lounge seating.",
        "client": "Private Villa Client",
        "tools": [
            "3ds Max",
            "D5 Render",
            "Photoshop"
        ]
    },
    {
        "id": "master-bedroom-proposal",
        "title_ar": "Master-bedroom design proposal. — جناح النوم الرئيسي الفاخر",
        "title_en": "Master-bedroom design proposal. — Luxury Master Suite",
        "category": "interior",
        "image": "assets/projects/master-bedroom-marble.jpg",
        "gallery": [
            "assets/projects/master-bedroom-marble.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2275a6183964601.6549635aa30f1.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/78191f183964601.6549635aa3c3f.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d7ab92183964601.6549635aa4c82.jpg"
        ],
        "desc_ar": "جناح نوم رئيسي يجمع بين الفخامة والسكينة، جدار خلفي من الرخام الأبيض متصل العروق مع إضاءات دافئة مخفية، ثريا زجاجية كريستالية، وكراسي مخملية زمردية.",
        "desc_en": "Luxury master bedroom suite proposal featuring a bookmatched marble accent wall, warm architectural cove lighting, a statement sculptural chandelier, and emerald velvet lounge chairs.",
        "client": "Golden House Design",
        "tools": [
            "3ds Max",
            "Lumion",
            "Photoshop"
        ]
    },
    {
        "id": "double-height-reception",
        "title_ar": "DOUBLE HIGHT RECEPTION — ريسيبشن مزدوج الارتفاع فخم",
        "title_en": "DOUBLE HIGHT RECEPTION — Palatial Double-Height Space",
        "category": "interior",
        "image": "assets/projects/double-height-reception.jpg",
        "gallery": [
            "assets/projects/double-height-reception.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fe737a231648797.688cd4ec62c63.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/712d22231648797.688cd4ec626d6.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e5ea12231648797.688cd4ec63496.jpg"
        ],
        "desc_ar": "تصميم داخلي فخم بارتفاع مزدوج لفيلا سكنية، تكسيات رخامية متصلة وثريات معمارية عملاقة مع توزيع إضاءة مدروس لإبراز فخامة الفراغ.",
        "desc_en": "Palatial double-height interior space with continuous bookmatched marble, statement chandeliers, and layered illumination.",
        "client": "Compound Villa",
        "tools": [
            "3ds Max",
            "D5 Render",
            "Photoshop"
        ]
    },
    {
        "id": "luxe-villa",
        "title_ar": "L.U.X.E.  V.I.L.L.A. — فيلا لوكس ولاندسكيب متكامل",
        "title_en": "L.U.X.E.  V.I.L.L.A. — Exterior Architecture & Landscape",
        "category": "architectural",
        "image": "assets/projects/luxe-villa.jpg",
        "gallery": [
            "assets/projects/luxe-villa.jpg",
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
        ],
        "desc_ar": "دراسة كتل معمارية ودمج المساحات الخضراء والمسابح مع الكتل السكنية لتحقيق أقصى درجات الخصوصية والجمال الهندسي.",
        "desc_en": "Massing study and seamless integration of landscape and pool areas with residential volumes for ultimate privacy and aesthetic balance.",
        "client": "Private Client",
        "tools": [
            "Revit",
            "Lumion",
            "Photoshop"
        ]
    },
    {
        "id": "villa-entrance",
        "title_ar": "V.I.L.L.A.  E.N.T.R.A.N.C.E. — مدخل فيلا ملكي معاصر",
        "title_en": "V.I.L.L.A.  E.N.T.R.A.N.C.E. — Grand Architectural Foyer Entrance",
        "category": "architectural",
        "image": "assets/projects/villa-entrance.jpg",
        "gallery": [
            "assets/projects/villa-entrance.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dcb271194502831.65fcde6154d2c.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/841e1a194502831.65fcde6154154.jpg"
        ],
        "desc_ar": "تصميم مدخل رئيسي لفيلا خاصة بكتل معمارية متدرجة، مسارات مائية وإضاءات أرضية مخفية توجه حركة الزوار نحو الباب الرئيسي.",
        "desc_en": "Monumental private villa entrance featuring terraced volumes, water features, and recessed ground lighting guiding visitors toward the grand foyer.",
        "client": "Private Compound Villa",
        "tools": [
            "AutoCAD",
            "3ds Max",
            "D5 Render"
        ]
    },
    {
        "id": "boss-desk",
        "title_ar": "B.O.S.S.  D.E.S.K. — مكتب إداري وتنفيذي راقي",
        "title_en": "B.O.S.S.  D.E.S.K. — Executive Corporate Suite",
        "category": "retail",
        "image": "assets/projects/boss-desk.jpg",
        "gallery": [
            "assets/projects/boss-desk.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1ba745187385871.6587402ef2021.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4e3f36187385871.6587402ef2b90.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d9430f187385871.6587402ef1217.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f226c7187385871.6587402ef3777.jpg"
        ],
        "desc_ar": "بيئة عمل تنفيذية راقية بتكسيات خشبية داكنة وجلسة اجتماعات مدمجة تعكس هوية الشركة وقوتها الإدارية.",
        "desc_en": "High-end corporate executive suite featuring rich wood paneling, acoustic integration, and executive meeting zone.",
        "client": "Corporate HQ",
        "tools": [
            "AutoCAD",
            "3ds Max",
            "D5 Render"
        ]
    },
    {
        "id": "modern-kitchen-360",
        "title_ar": "Modern Kitchen 360. — مطبخ مودرن بانورامي تفاعلي",
        "title_en": "Modern Kitchen 360. — Panoramic Kitchen & Island",
        "category": "interior",
        "image": "assets/projects/modern-kitchen-360.jpg",
        "gallery": [
            "assets/projects/modern-kitchen-360.jpg",
            "https://kuula.co/shareimg/6512-fc76-981f-4805/en_3716/01-cover.jpg"
        ],
        "desc_ar": "استغلال هندسي دقيق للمساحات، جزيرة مطبخ رخامية مدمجة مع أحدث أنظمة التخزين والإضاءة الذكية والتهوية المخفية.",
        "desc_en": "Ergonomic kitchen design featuring a monolithic marble island, concealed storage systems, and smart task lighting.",
        "client": "Residential Fit-out",
        "tools": [
            "3ds Max",
            "Lumion"
        ]
    },
    {
        "id": "roof-design",
        "title_ar": "ROOF DESIGN — تصميم روف وتراس خارجي",
        "title_en": "ROOF DESIGN — Rooftop Terrace & Outdoor Living",
        "category": "architectural",
        "image": "assets/projects/roof-design.png",
        "gallery": [
            "assets/projects/roof-design.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/3e7e09243825161.6989ff455c333.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3afba3243825161.6989ff455e065.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3147ce243825161.6989ff455d0ec.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/6e0882243825161.6989ff455d8cd.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/05187b243825161.6989ff455c966.jpg"
        ],
        "desc_ar": "تنسيق موقع خارجي وبرجولات خشبية ومناطق شواء مع مراعاة العزل المائي والحراري للأسطح وتصريف مياه الأمطار.",
        "desc_en": "Rooftop terrace featuring wooden pergolas, fire pit, and BBQ zone with strict waterproofing & thermal insulation engineering.",
        "client": "Private Villa",
        "tools": [
            "Lumion",
            "AutoCAD"
        ]
    },
    {
        "id": "majles",
        "title_ar": "M.A.J.L.E.S — مجلس ضيوف فاخر معاصر",
        "title_en": "M.A.J.L.E.S — Contemporary Luxury Majles",
        "category": "interior",
        "image": "assets/projects/majles-luxury.jpg",
        "gallery": [
            "assets/projects/majles-luxury.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/fdc30d185126543.655e2db971a72.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/106121185126543.655e2db972538.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ff286a185126543.655e2db972f9d.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/830014185126543.655e2db970f85.jpg"
        ],
        "desc_ar": "تصميم مجلس عربي بطابع مودرن راقي يجمع بين الأصالة وفخامة الخامات والخطوط المعمارية الهادئة مع لمسات ذهبية أنيقة.",
        "desc_en": "Sophisticated contemporary majles blending cultural hospitality with refined materials and minimalist architectural lines.",
        "client": "Private Client",
        "tools": [
            "3ds Max",
            "Photoshop"
        ]
    },
    {
        "id": "neoclassical-apartment",
        "title_ar": "Neoclassical Apartment. — شقة نيوكلاسيك هايد بارك ماونتن فيو",
        "title_en": "Neoclassical Apartment. — Turnkey Handover Mountain View",
        "category": "interior",
        "image": "assets/projects/neoclassical-apartment.jpg",
        "gallery": [
            "assets/projects/neoclassical-apartment.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/9cbafe179155205.64f4f765a826a.jpg"
        ],
        "desc_ar": "تشطيب كامل من الطوب الأحمر وحتى المفتاح، إشراف موقعي دقيق وتنسيق كافة البنود المعمارية والكهربائية بصفر مخالفات.",
        "desc_en": "Turnkey fit-out from bare shell to final handover with on-site engineering supervision and refined neoclassical detailing.",
        "client": "Mountain View (Hyde Park)",
        "tools": [
            "AutoCAD",
            "MEP Coordination",
            "Site Execution"
        ]
    },
    {
        "id": "panoramic-bedroom",
        "title_ar": "Panoramic guest's bedroom design. — غرفة نوم ضيوف بانورامية",
        "title_en": "Panoramic guest's bedroom design. — Panoramic Master Bedroom",
        "category": "interior",
        "image": "assets/projects/panoramic-bedroom.jpg",
        "gallery": [
            "assets/projects/panoramic-bedroom.jpg",
            "https://kuula.co/shareimg/6534-1bbd-0449-1163/en_6767/01-cover.jpg"
        ],
        "desc_ar": "إطلالة بانورامية كاملة مع دراسة وافية للإضاءة الطبيعية والستائر الكهربائية وتوزيع الأثاث بما يحقق أقصى راحة للضيوف.",
        "desc_en": "Panoramic guest bedroom with sweeping glazed views, motorized solar shading integration, and acoustic comfort zoning.",
        "client": "Residential Project",
        "tools": [
            "3ds Max",
            "Lumion"
        ]
    },
    {
        "id": "reception-american",
        "title_ar": "Reception with American kitchen. — ريسبشن مع مطبخ أمريكي",
        "title_en": "Reception with American kitchen. — Open Concept Living",
        "category": "interior",
        "image": "assets/projects/reception-american.jpg",
        "gallery": [
            "assets/projects/reception-american.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c1c802179852147.6500c484b4270.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/6c52e6179852147.6500c484b372d.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/434966179852147.6500c484b2b72.jpg"
        ],
        "desc_ar": "مفهوم المساحات المفتوحة (Open Concept) يدمج منطقة الاستقبال مع مطبخ أمريكي عصري بركن إفطار رخامي متناسق.",
        "desc_en": "Open-concept living space seamlessly bridging the formal reception with a contemporary American open kitchen and breakfast bar.",
        "client": "Modern Apartment",
        "tools": [
            "AutoCAD",
            "3ds Max",
            "Lumion"
        ]
    },
    {
        "id": "bathroom",
        "title_ar": "B.A.T.H.R.O.O.M — حمام ماستر فاخر",
        "title_en": "B.A.T.H.R.O.O.M — Luxury Master Bathroom",
        "category": "interior",
        "image": "assets/projects/luxury-bathroom.jpg",
        "gallery": [
            "assets/projects/luxury-bathroom.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/1063a8186382467.65746c2ee9fb5.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/030e8f186382467.65746c2ee9101.jpg"
        ],
        "desc_ar": "حمام ماستر بتكسيات رخامية متصلة، كابينة شاور زجاج سيكوريت مع أطقم وخلاطات دفن جروهي الألمانية وحوض رخامي معلق.",
        "desc_en": "Luxury master bathroom with floor-to-ceiling porcelain slabs, frameless glass shower enclosure, Grohe concealed brassware, and floating vanity.",
        "client": "Villa Master Suite",
        "tools": [
            "3ds Max",
            "D5 Render"
        ]
    },
    {
        "id": "kitchen-design",
        "title_ar": "KITCHEN DESIGN — مطبخ عصري مدمج",
        "title_en": "KITCHEN DESIGN — Contemporary Fitted Kitchen",
        "category": "interior",
        "image": "assets/projects/kitchen-design.png",
        "gallery": [
            "assets/projects/kitchen-design.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/375904243825531.698a121ba5cfe.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/08723d243825531.698a121ba7dfa.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/73e500243825531.698a121ba63b9.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/31e5eb243825531.698a121ba70af.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ea700f243825531.698a121ba6a55.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c58aeb243825531.698a121ba7759.jpg"
        ],
        "desc_ar": "مطبخ مودرن مدمج بتشطيبات مات وأجهزة بيلت-إن وتوزيع ميكانيكي وكهربائي دقيق لتسهيل الحركة والعمل.",
        "desc_en": "Modern integrated kitchen featuring matte cabinetry, flush built-in appliances, and precision ergonomic work triangle.",
        "client": "Residential Fit-out",
        "tools": [
            "AutoCAD",
            "3ds Max"
        ]
    }
];

  let activeFilter = 'all';
  let currentProjectIndex = 0;
  let filteredProjects = [...projectsData];

  const projectsGrid = document.getElementById('projectsGrid');

  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    activeFilter = filter;
    filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === filter);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((proj, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', proj.category);

      const title = currentLang === 'ar' ? proj.title_ar : proj.title_en;
      const desc = currentLang === 'ar' ? proj.desc_ar : proj.desc_en;
      const viewDetailsText = currentLang === 'ar' ? 'عرض التفاصيل والصور' : 'View Details & Renders';

      const galleryBadge = (proj.gallery && proj.gallery.length > 1) 
        ? `<span class="gallery-count-badge">📷 ${proj.gallery.length} ${currentLang === 'ar' ? 'لقطات' : 'Views'}</span>` 
        : '';

      card.innerHTML = `
        <div class="project-image-box" data-idx="${idx}">
          <img src="${proj.image}" alt="${title}" class="project-img-real" loading="lazy">
          ${galleryBadge}
          <div class="project-overlay">
            <span class="view-details">${viewDetailsText}</span>
          </div>
        </div>
        <div class="project-info">
          <div class="project-meta">
            <span class="project-category">${proj.category.toUpperCase()}</span>
            <span class="project-client">${proj.client}</span>
          </div>
          <h3 class="project-name">${title}</h3>
          <p class="project-summary">${desc}</p>
          <div class="project-tags">
            ${proj.tools.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
      `;

      // Click card to open lightbox
      card.querySelector('.project-image-box').addEventListener('click', () => {
        openLightbox(idx);
      });

      projectsGrid.appendChild(card);
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Lightbox Implementation
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClient = document.getElementById('lightboxClient');
  const lightboxTools = document.getElementById('lightboxTools');

  function openLightbox(index, galleryImgIndex = 0) {
    if (!filteredProjects[index]) return;
    currentProjectIndex = index;
    const p = filteredProjects[index];

    const currentGallery = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image];
    const activeImgSrc = currentGallery[galleryImgIndex] || p.image;

    lightboxImg.src = activeImgSrc;
    lightboxImg.alt = currentLang === 'ar' ? p.title_ar : p.title_en;
    lightboxCat.textContent = p.category.toUpperCase();
    lightboxTitle.textContent = currentLang === 'ar' ? p.title_ar : p.title_en;
    lightboxDesc.textContent = currentLang === 'ar' ? p.desc_ar : p.desc_en;
    lightboxClient.textContent = `${currentLang === 'ar' ? 'العميل / المشروع:' : 'Client / Project:'} ${p.client}`;
    lightboxTools.innerHTML = p.tools.map(t => `<span>${t}</span>`).join('');

    // Gallery Thumbnails Container
    let thumbsContainer = document.getElementById('lightboxThumbs');
    if (!thumbsContainer) {
      thumbsContainer = document.createElement('div');
      thumbsContainer.id = 'lightboxThumbs';
      thumbsContainer.className = 'lightbox-thumbs-row';
      const imgWrap = document.querySelector('.lightbox-img-wrap');
      if (imgWrap) imgWrap.appendChild(thumbsContainer);
    }

    if (currentGallery.length > 1) {
      thumbsContainer.style.display = 'flex';
      thumbsContainer.innerHTML = currentGallery.map((img, gIdx) => `
        <button type="button" class="thumb-btn ${gIdx === galleryImgIndex ? 'active' : ''}" data-gidx="${gIdx}">
          <img src="${img}" alt="Angle ${gIdx + 1}" loading="lazy">
        </button>
      `).join('');

      thumbsContainer.querySelectorAll('.thumb-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetGIdx = parseInt(btn.getAttribute('data-gidx'), 10);
          openLightbox(currentProjectIndex, targetGIdx);
        });
      });
    } else {
      thumbsContainer.style.display = 'none';
      thumbsContainer.innerHTML = '';
    }

    lightbox.classList.add('active');
    lightboxBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
      openLightbox(currentProjectIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
      openLightbox(currentProjectIndex);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      currentLang === 'ar' ? lightboxPrev.click() : lightboxNext.click();
    }
    if (e.key === 'ArrowLeft') {
      currentLang === 'ar' ? lightboxNext.click() : lightboxPrev.click();
    }
  });

  // Initial render of projects
  renderProjects('all');


    // ==========================================
  // 4. Indicative BOQ & finishing cost estimator (All 7 Quota Tiers)
  // ==========================================
  const areaSlider = document.getElementById('areaSlider');
  const areaValue = document.getElementById('areaValue');
  const unitBtns = document.querySelectorAll('.unit-btn');
  const tierCards = document.querySelectorAll('.tier-card');
  const quotaPillCards = document.querySelectorAll('.quota-pill-card');
  const addonGypsum = document.getElementById('addonGypsum');
  const addonDoor = document.getElementById('addonDoor');
  const addonSmart = document.getElementById('addonSmart');
  const addonHvac = document.getElementById('addonHvac');

  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const ratePerMDisplay = document.getElementById('ratePerMDisplay');
  const costMaterials = document.getElementById('costMaterials');
  const costLabor = document.getElementById('costLabor');
  const costSupervision = document.getElementById('costSupervision');
  const timelineWeeks = document.getElementById('timelineWeeks');
  const selectedUnitBadge = document.getElementById('selectedUnitBadge');
  const whatsappEstimateBtn = document.getElementById('whatsappEstimateBtn');
  const printEstimateBtn = document.getElementById('printEstimateBtn');

  const giftMainText = document.getElementById('giftMainText');
  const giftSubText = document.getElementById('giftSubText');

  // Indicative pricing and package inclusions
  const QUOTA_PACKAGES = {
    economic: {
      rate: 5500,
      nameAr: 'الباقة الإقتصادية (ECONOMIC)',
      nameEn: 'Economic Package',
      giftAr: 'التشطيب القياسي الأساسي المعتمد (بدون أجهزة أو هدايا عينية)',
      giftEn: 'Standard baseline certified fit-out (No appliances)',
      noteAr: 'تشطيب عملي بمواد معتمدة تلبي معايير الجودة الأساسية بأفضل ميزانية.',
      noteEn: 'Practical certified fit-out for standard budgets.'
    },
    medium: {
      rate: 7000,
      nameAr: 'الباقة المتوسطة (MEDIUM)',
      nameEn: 'Medium Package',
      giftAr: 'سخانات كهرباء عادية للحمامات + تكييف 1.5 حصان ميديا (Midea)',
      giftEn: 'Electric water heaters for bathrooms + 1.5 HP Midea AC',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    },
    vip: {
      rate: 9300,
      nameAr: 'باقة في آي بي (VIP PACKAGE)',
      nameEn: 'VIP Package',
      giftAr: 'تكييف 1.5 حصان ميديا + (2) شاشة LG 43 بوصة سمارت',
      giftEn: '1.5 HP Midea AC + (2) LG 43-inch Smart 4K TVs',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    },
    ultravip: {
      rate: 11000,
      nameAr: 'باقة ألترا في آي بي (ULTRA VIP)',
      nameEn: 'Ultra VIP Package',
      giftAr: '(2) تكييف 1.5 حصان + (2) شاشة LG 43 بوصة بدقة 4K',
      giftEn: '(2) 1.5 HP ACs + (2) LG 43-inch Smart 4K TVs',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    },
    superultravip: {
      rate: 13000,
      nameAr: 'باقة سوبر ألترا في آي بي (S.U.VIP)',
      nameEn: 'Super Ultra VIP Package',
      giftAr: 'مطبخ كامل تفصيل هدية (15 متر) + جزامة مدخل تفصيل هدية',
      giftEn: 'Custom full kitchen (15m) + Custom entrance shoe cabinet',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    },
    elite: {
      rate: 20000,
      nameAr: 'باقة إيليت (ELITE PACKAGE)',
      nameEn: 'Elite Package (Architectural Choice)',
      giftAr: 'مطبخ كامل تفصيل هدية (15 متر) + دريسنج روم كامل تفصيل هدية (5 متر)',
      giftEn: 'Custom luxury kitchen (15m) + Custom dressing room (5m)',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    },
    luxury: {
      rate: 24000,
      nameAr: 'باقة لاكشري الملكية (LUXURY PACKAGE)',
      nameEn: 'Luxury Royal Package',
      giftAr: 'مطبخ فاخر هدية (20 متر) + دريسنج روم ماستر هدية (8 متر) + غرفة أطفال كاملة مصنعة هدية (2 سرير 120 + 1 كومود + دولاب 160)',
      giftEn: 'Luxury kitchen (20m) + Master dressing room (8m) + Full custom kids bedroom set (2 beds 120 + nightstand + wardrobe 160)',
      noteAr: 'مشمولة ضمن باقات 2027 وتُؤكد في عرض السعر المكتوب.',
      noteEn: 'Included in 2027 packages and confirmed in the written quotation.'
    }
  };

  // State defaults (Initial: Elite package 20,000 EGP/m2 per client specification)
  let currentTierKey = 'elite';
  let currentBaseRate = 20000;
  let currentUnitMult = 1.0;
  let currentUnitNameAr = 'شقة سكنية';
  let currentUnitNameEn = 'Apartment';

  function formatEGP(num) {
    return Math.round(num).toLocaleString('en-US');
  }

  function updateGiftDisplay() {
    const pkg = QUOTA_PACKAGES[currentTierKey] || QUOTA_PACKAGES.elite;
    if (giftMainText) {
      giftMainText.textContent = currentLang === 'ar' ? pkg.giftAr : pkg.giftEn;
    }
    if (giftSubText) {
      giftSubText.textContent = currentLang === 'ar' ? pkg.noteAr : pkg.noteEn;
    }
  }

  function calculateEstimate() {
    if (!areaSlider) return;

    const area = parseInt(areaSlider.value, 10);
    if (areaValue) areaValue.textContent = area;

    const pkg = QUOTA_PACKAGES[currentTierKey] || QUOTA_PACKAGES.elite;
    const tierName = currentLang === 'ar' ? pkg.nameAr : pkg.nameEn;
    const tierGift = currentLang === 'ar' ? pkg.giftAr : pkg.giftEn;

    // Base finishing rate per m2 adjusted by unit type multiplier
    let effectiveRate = currentBaseRate * currentUnitMult;

    // Addons per m2
    let addOnsPerM2 = 0;
    if (addonGypsum && addonGypsum.checked) addOnsPerM2 += parseFloat(addonGypsum.getAttribute('data-cost') || 0);
    if (addonSmart && addonSmart.checked) addOnsPerM2 += parseFloat(addonSmart.getAttribute('data-cost') || 0);
    if (addonHvac && addonHvac.checked) addOnsPerM2 += parseFloat(addonHvac.getAttribute('data-cost') || 0);

    let variableCost = (effectiveRate + addOnsPerM2) * area;

    // Flat addons (e.g., Turkish armored door package)
    let flatAddons = 0;
    if (addonDoor && addonDoor.checked) {
      flatAddons += parseFloat(addonDoor.getAttribute('data-flat') || 0);
    }

    const totalEstimate = variableCost + flatAddons;
    const finalRatePerM = Math.round(totalEstimate / area);

    // Distribution: Materials 60%, Labor 25%, Engineering Supervision 15%
    const materialsVal = totalEstimate * 0.60;
    const laborVal = totalEstimate * 0.25;
    const supervisionVal = totalEstimate * 0.15;

    // Duration calculation based on area and tier
    let baseWeeks = Math.ceil(area / 18);
    if (currentBaseRate >= 13000) baseWeeks += 3; // Custom woodcraft & dressings
    if (currentBaseRate >= 20000) baseWeeks += 3; // Marble & smart automation
    const minWeeks = Math.max(8, baseWeeks);
    const maxWeeks = minWeeks + 3;

    // Update UI elements
    if (totalPriceDisplay) totalPriceDisplay.textContent = formatEGP(totalEstimate);
    if (ratePerMDisplay) ratePerMDisplay.textContent = `${formatEGP(finalRatePerM)} EGP/m²`;
    if (costMaterials) costMaterials.textContent = `${formatEGP(materialsVal)} EGP`;
    if (costLabor) costLabor.textContent = `${formatEGP(laborVal)} EGP`;
    if (costSupervision) costSupervision.textContent = `${formatEGP(supervisionVal)} EGP`;

    if (timelineWeeks) {
      timelineWeeks.textContent = currentLang === 'ar' 
        ? `${minWeeks} - ${maxWeeks} أسبوعاً`
        : `${minWeeks} - ${maxWeeks} Weeks`;
    }

    if (selectedUnitBadge) {
      const uName = currentLang === 'ar' ? currentUnitNameAr : currentUnitNameEn;
      selectedUnitBadge.textContent = `${uName} · ${tierName}`;
    }

    // Update Gift Box
    updateGiftDisplay();

    // Dynamic WhatsApp Link Generation
    if (whatsappEstimateBtn) {
      const uName = currentLang === 'ar' ? currentUnitNameAr : currentUnitNameEn;
      
      const selectedAddonsList = [];
      if (addonGypsum && addonGypsum.checked) selectedAddonsList.push(currentLang === 'ar' ? 'أسقف معلقة كناوف' : 'Gypsum Board Ceilings');
      if (addonDoor && addonDoor.checked) selectedAddonsList.push(currentLang === 'ar' ? 'باب مصفح تركي ونجارة' : 'Armored & Interior Doors');
      if (addonSmart && addonSmart.checked) selectedAddonsList.push(currentLang === 'ar' ? 'أنظمة سمارت هوم' : 'Smart Home Automation');
      if (addonHvac && addonHvac.checked) selectedAddonsList.push(currentLang === 'ar' ? 'تجهيزات تكييف كونسيلد' : 'Concealed HVAC Prep');

      const addonsStr = selectedAddonsList.length > 0 ? selectedAddonsList.join('، ') : (currentLang === 'ar' ? 'بدون إضافات' : 'Standard');

      let message = '';
      if (currentLang === 'ar') {
        message = `مرحباً م. حسن أحمد،
استخدمت الحاسبة للحصول على تقدير أولي للميزانية. أرجو إرسال عرض سعر محدث ومكتوب للتأكيد:

` +
          `• نوع الوحدة: ${uName}
` +
          `• المساحة: ${area} م²
` +
          `• باقة التشطيب لعام 2027 (سعر استرشادي): ${tierName} (~${formatEGP(currentBaseRate)} ج.م/م²)
` +
          `• 🎁 الهدايا المشمولة مجاناً: ${tierGift}
` +
          `• البنود الإضافية: ${addonsStr}
` +
          `• التكلفة الإجمالية التقديرية: ${formatEGP(totalEstimate)} جنيه مصري (~${formatEGP(finalRatePerM)} ج.م/م²)
` +
          `• مدة التنفيذ المقترحة: ${minWeeks}-${maxWeeks} أسبوع

` +
          `برجاء إفادتي بإمكانية تحديد موعد لمعاينة الموقع ومناقشة تفاصيل التعاقد واستلام الهدايا المشمولة. شكراً لك!`;
      } else {
        message = `Hello Eng. Hassan Ahmed,
I used the estimator for an initial budget reference. Please send a current written quotation to confirm:

` +
          `• Property Type: ${uName}
` +
          `• Total Area: ${area} m²
` +
          `• 2027 Selected package (indicative rate): ${tierName} (~${formatEGP(currentBaseRate)} EGP/m²)
` +
          `• 🎁 Included Complimentary Perks: ${tierGift}
` +
          `• Selected Add-ons: ${addonsStr}
` +
          `• Estimated Total: ${formatEGP(totalEstimate)} EGP (~${formatEGP(finalRatePerM)} EGP/m²)
` +
          `• Estimated Timeline: ${minWeeks}-${maxWeeks} weeks

` +
          `Looking forward to scheduling a site inspection and discussing contract execution and perks. Thank you!`;
      }

      const encodedMsg = encodeURIComponent(message);
      whatsappEstimateBtn.href = `https://wa.me/201096978258?text=${encodedMsg}`;
    }
  }

  // Select a tier across both the grid cards and the carousel pills
  function selectTier(key) {
    if (!QUOTA_PACKAGES[key]) return;
    currentTierKey = key;
    currentBaseRate = QUOTA_PACKAGES[key].rate;

    // Update active class on Step 3 tier cards
    tierCards.forEach(c => {
      if (c.getAttribute('data-tier') === key) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Update active class on Quotas Matrix pills
    quotaPillCards.forEach(p => {
      if (p.getAttribute('data-tier') === key) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    calculateEstimate();
  }

  // Unit Type Selection
  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnitMult = parseFloat(btn.getAttribute('data-mult') || 1.0);
      
      const unitType = btn.getAttribute('data-unit');
      if (unitType === 'apartment') {
        currentUnitNameAr = 'شقة سكنية';
        currentUnitNameEn = 'Apartment';
      } else if (unitType === 'villa') {
        currentUnitNameAr = 'فيلا / دوبلكس';
        currentUnitNameEn = 'Villa / Duplex';
      } else if (unitType === 'office') {
        currentUnitNameAr = 'مكتب إداري';
        currentUnitNameEn = 'Corporate Office';
      } else if (unitType === 'retail') {
        currentUnitNameAr = 'محل تجاري / ريتيل';
        currentUnitNameEn = 'Retail Store';
      }
      calculateEstimate();
    });
  });

  // Slider Listener
  if (areaSlider) {
    areaSlider.addEventListener('input', calculateEstimate);
  }

  // Tier Card Selection Listeners
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-tier');
      selectTier(key);
    });
  });

  // Quota Carousel Pills Click Listeners
  quotaPillCards.forEach(pill => {
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-tier');
      selectTier(key);
      // Smooth scroll to step 3 so the client sees the selection
      const step3 = document.querySelector('.tier-cards-grid');
      if (step3) {
        step3.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Addon Checkboxes
  [addonGypsum, addonDoor, addonSmart, addonHvac].forEach(chk => {
    if (chk) chk.addEventListener('change', calculateEstimate);
  });

  // Print button
  if (printEstimateBtn) {
    printEstimateBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Initial Calculation with Elite tier (20,000 EGP/m2)
  selectTier('elite');


  // ==========================================
  // 5. Smooth Scroll & Active Nav Spy
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link:not(.btn-nav-cta)');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  // ==========================================================================
  // 6. VIRAL ARCHITECTURAL LAB ENGINES (5 INTERACTIVE MODULES)
  // ==========================================================================

  // --- Module A: Tab Switcher ---
  const labTabBtns = document.querySelectorAll('.lab-tab-btn');
  const labTabContents = document.querySelectorAll('.lab-tab-content');

  labTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labTabBtns.forEach(b => b.classList.remove('active'));
      labTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  document.querySelectorAll('[data-open-quiz]').forEach(link => {
    link.addEventListener('click', () => {
      const quizButton = document.querySelector('.lab-tab-btn[data-tab="tab-quiz"]');
      const quizContent = document.getElementById('tab-quiz');
      if (!quizButton || !quizContent) return;
      labTabBtns.forEach(button => button.classList.remove('active'));
      labTabContents.forEach(content => content.classList.remove('active'));
      quizButton.classList.add('active');
      quizContent.classList.add('active');
    });
  });

  // Pause every other TikTok embed when one begins playback.
  window.addEventListener('message', event => {
    if (event.origin !== 'https://www.tiktok.com' || !event.data) return;
    let message = event.data;
    if (typeof message === 'string') {
      try { message = JSON.parse(message); } catch { return; }
    }
    if (message['x-tiktok-player'] !== true || message.type !== 'onStateChange' || Number(message.value) !== 1) return;
    const players = Array.from(document.querySelectorAll('.tiktok-player'));
    const activePlayer = players.find(player => player.contentWindow === event.source);
    if (!activePlayer) return;
    players.forEach(player => {
      if (player !== activePlayer && player.contentWindow) {
        player.contentWindow.postMessage({ type: 'pause', value: null, 'x-tiktok-player': true }, 'https://www.tiktok.com');
      }
    });
  });


// --- Module B: Removed per request ---


  // --- Module C: Lighting & Sun Simulator ---
  const lightingImg = document.getElementById('lightingImg');
  const lightingOverlay = document.getElementById('lightingOverlay');
  const lightTimeBadge = document.getElementById('lightTimeBadge');
  const hudTemp = document.getElementById('hudTemp');
  const hudAngle = document.getElementById('hudAngle');
  const hudShadow = document.getElementById('hudShadow');
  const lightingModeBtns = document.querySelectorAll('.lighting-mode-btn');

  lightingModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lightingModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      const temp = btn.getAttribute('data-temp');
      const angle = btn.getAttribute('data-angle');
      const shadow = btn.getAttribute('data-shadow');
      const timeStr = btn.getAttribute('data-time');

      if (lightingImg) {
        lightingImg.className = `lighting-img ${mode}`;
      }
      if (lightingOverlay) {
        lightingOverlay.className = `lighting-overlay ${mode}`;
      }
      if (lightTimeBadge) lightTimeBadge.textContent = timeStr;
      if (hudTemp) hudTemp.textContent = temp;
      if (hudAngle) hudAngle.textContent = angle;
      if (hudShadow) hudShadow.textContent = shadow;
    });
  });


  // --- Module D: 360° Panoramic Room Tour ---
  const panoViewport = document.getElementById('panoViewport');
  const panoTrack = document.getElementById('panoTrack');
  const panoAutoBtn = document.getElementById('panoAutoBtn');
  const panoResetBtn = document.getElementById('panoResetBtn');
  const tourRoomBtns = document.querySelectorAll('.tour-room-btn');
  const panoImg = document.getElementById('panoImg');
  const panoImgMirror = document.querySelector('.pano-img-mirror');

  let panoOffset = 0;
  let isDraggingPano = false;
  let startPanoX = 0;
  let isAutoPano = true;
  let autoPanoId = null;

  function runAutoPano() {
    if (!isAutoPano || !panoTrack) return;
    panoOffset -= 0.6;
    if (panoOffset <= -1200) panoOffset = 0;
    panoTrack.style.transform = `translateX(${panoOffset}px)`;
    autoPanoId = requestAnimationFrame(runAutoPano);
  }

  if (panoViewport && panoTrack) {
    panoViewport.addEventListener('mousedown', (e) => {
      isDraggingPano = true;
      startPanoX = e.clientX;
      isAutoPano = false;
      if (panoAutoBtn) panoAutoBtn.textContent = '▶ Auto';
      cancelAnimationFrame(autoPanoId);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingPano || !panoTrack) return;
      const delta = e.clientX - startPanoX;
      startPanoX = e.clientX;
      panoOffset += delta;
      if (panoOffset > 0) panoOffset = -1200;
      if (panoOffset < -1200) panoOffset = 0;
      panoTrack.style.transform = `translateX(${panoOffset}px)`;
    });

    window.addEventListener('mouseup', () => {
      isDraggingPano = false;
    });

    // Touch support for 360 Tour
    panoViewport.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      isDraggingPano = true;
      startPanoX = e.touches[0].clientX;
      isAutoPano = false;
      if (panoAutoBtn) panoAutoBtn.textContent = '▶ Auto';
      cancelAnimationFrame(autoPanoId);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingPano || !e.touches[0] || !panoTrack) return;
      const delta = e.touches[0].clientX - startPanoX;
      startPanoX = e.touches[0].clientX;
      panoOffset += delta;
      if (panoOffset > 0) panoOffset = -1200;
      if (panoOffset < -1200) panoOffset = 0;
      panoTrack.style.transform = `translateX(${panoOffset}px)`;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDraggingPano = false;
    });

    // Auto toggle
    if (panoAutoBtn) {
      panoAutoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isAutoPano = !isAutoPano;
        panoAutoBtn.textContent = isAutoPano ? '❚❚ Pause' : '▶ Auto';
        if (isAutoPano) runAutoPano();
      });
    }

    if (panoResetBtn) {
      panoResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        panoOffset = 0;
        panoTrack.style.transform = 'translateX(0px)';
      });
    }

    // Room Switcher
    tourRoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tourRoomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newSrc = btn.getAttribute('data-img');
        if (panoImg) panoImg.src = newSrc;
        if (panoImgMirror) panoImgMirror.src = newSrc;
      });
    });

    // Start auto panorama by default
    runAutoPano();
  }


  // --- Module E: Live Material Swapper ---
  const matSceneImg = document.getElementById('matSceneImg');
  const matSpecsOverlay = document.getElementById('matSpecsOverlay');
  const matSelectedBadge = document.getElementById('matSelectedBadge');
  const matPresetCards = document.querySelectorAll('.mat-preset-card');

  matPresetCards.forEach(card => {
    card.addEventListener('click', () => {
      matPresetCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const imgSrc = card.getAttribute('data-img');
      const nameAr = card.getAttribute('data-name-ar');
      const nameEn = card.getAttribute('data-name-en');
      const specs = card.getAttribute('data-specs');

      if (matSceneImg) {
        matSceneImg.style.opacity = '0.3';
        matSceneImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          matSceneImg.src = imgSrc;
          matSceneImg.style.opacity = '1';
          matSceneImg.style.transform = 'scale(1)';
        }, 200);
      }

      if (matSelectedBadge) {
        matSelectedBadge.textContent = currentLang === 'ar' ? `الطراز: ${nameAr}` : `Style: ${nameEn}`;
      }

      if (matSpecsOverlay && specs) {
        const specArr = specs.split('|').map(s => s.trim());
        matSpecsOverlay.innerHTML = specArr.map(s => `<span class="spec-tag">${s}</span>`).join('');
      }
    });
  });


  // --- Module F: Architectural Style Quiz ---
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizStepBadge = document.getElementById('quizStepBadge');
  const quizScreen = document.getElementById('quizScreen');
  const quizResult = document.getElementById('quizResult');
  const quizRetakeBtn = document.getElementById('quizRetakeBtn');
  const quizWhatsappBtn = document.getElementById('quizWhatsappBtn');
  const resultStyleName = document.getElementById('resultStyleName');
  const resultStyleDesc = document.getElementById('resultStyleDesc');
  const resultMaterials = document.getElementById('resultMaterials');
  const resultSwatches = document.getElementById('resultSwatches');

  let currentQuestion = 1;
  const userAnswers = [];

  const quizOptionBtns = document.querySelectorAll('.quiz-opt-btn');
  quizOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      userAnswers.push(val);

      if (currentQuestion < 3) {
        document.querySelector(`.quiz-question-box[data-q="${currentQuestion}"]`).classList.remove('active');
        currentQuestion++;
        document.querySelector(`.quiz-question-box[data-q="${currentQuestion}"]`).classList.add('active');

        if (quizStepBadge) {
          quizStepBadge.textContent = currentLang === 'ar' 
            ? `السؤال ${currentQuestion} من 3` 
            : `Question ${currentQuestion} of 3`;
        }
        if (quizProgressFill) {
          quizProgressFill.style.width = `${(currentQuestion / 3) * 100}%`;
        }
      } else {
        // Complete Quiz and calculate result
        showQuizResults();
      }
    });
  });

  function showQuizResults() {
    if (quizScreen) quizScreen.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';

    // Count occurrences
    const counts = { luxury: 0, minimal: 0, modern: 0 };
    userAnswers.forEach(ans => {
      if (counts[ans] !== undefined) counts[ans]++;
    });

    let topStyle = 'luxury';
    if (counts.minimal >= counts.luxury && counts.minimal >= counts.modern) {
      topStyle = 'minimal';
    } else if (counts.modern >= counts.luxury && counts.modern >= counts.minimal) {
      topStyle = 'modern';
    }

    let styleTitle = '';
    let styleDesc = '';
    let styleMats = '';
    let swatchesColors = [];

    if (topStyle === 'luxury') {
      styleTitle = currentLang === 'ar' ? 'نيوكلاسيك ملكي معاصر (Royal Neoclassical)' : 'Royal Contemporary Neoclassical';
      styleDesc = currentLang === 'ar' 
        ? 'أنت تعشق الفخامة الخالدة، التناظر المعماري، وأثر المساحات المفتوحة مع الرخام المتصل والإضاءات الدافئة التي تمنح إحساساً ملكياً لا ينضب.'
        : 'You appreciate timeless grandeur, architectural symmetry, and palatial openness with continuous marble and refined statement lighting.';
      styleMats = currentLang === 'ar' ? 'رخام كلكتا إيطالي + كرانيش معمارية + إكسسوارات نحاسية' : 'Italian Calacatta Marble + Moldings + Brass';
      swatchesColors = ['#f5eee6', '#c5a880', '#2a2d34'];
    } else if (topStyle === 'minimal') {
      styleTitle = currentLang === 'ar' ? 'مودرن جاباندي دافئ (Warm Minimalist / Japandi)' : 'Warm Minimalist / Japandi';
      styleDesc = currentLang === 'ar'
        ? 'هدوؤك ينعكس في بيتك: تبحث عن خطوط هندسية نقية، خامات طبيعية كالأخشاب والحجر البيج، مع أقصى استفادة من ضوء النهار والشمس.'
        : 'Calm and grounded: you seek uncluttered geometry, organic woods, travertine stone, and generous natural daylight.';
      styleMats = currentLang === 'ar' ? 'خشب جوز أمريكي + حجر ترافنتينو + دهانات جوتن مات' : 'American Walnut + Travertine + Jotun Matt';
      swatchesColors = ['#e0d6cc', '#795548', '#3e2723'];
    } else {
      styleTitle = currentLang === 'ar' ? 'معماري عصري ذكي (Smart Contemporary Tech)' : 'Smart High-Tech Contemporary';
      styleDesc = currentLang === 'ar'
        ? 'رؤيتك للمستقبل واضحة: تعشق تكامل التكنولوجيا، أنظمة السمارت هوم، مجريات الإضاءة الماجنتيك، والبورسلين الليزر مع أسطح داكنة مميزة.'
        : 'Visionary and ergonomic: you love smart home automation, magnetic track lights, laser-cut porcelain, and sleek dark accents.';
      styleMats = currentLang === 'ar' ? 'بورسلين ليزر كبير + ماجنتيك تراك + أنظمة سمارت' : 'Large Porcelain + Magnetic Tracks + Smart Automation';
      swatchesColors = ['#cfd8dc', '#37474f', '#00e5ff'];
    }

    if (resultStyleName) resultStyleName.textContent = styleTitle;
    if (resultStyleDesc) resultStyleDesc.textContent = styleDesc;
    if (resultMaterials) resultMaterials.textContent = styleMats;

    if (resultSwatches) {
      resultSwatches.innerHTML = swatchesColors.map(c => `<span style="background:${c};"></span>`).join('');
    }

    // Dynamic WhatsApp Link with Quiz Results
    if (quizWhatsappBtn) {
      let msg = '';
      if (currentLang === 'ar') {
        msg = `مرحباً م. حسن أحمد،
قمت للتو بإجراء كويز الطراز المعماري على موقعك وكانت نتيجتي:

` +
          `• الطراز المقترح: ${styleTitle}
` +
          `• الخامات المفضلة: ${styleMats}

` +
          `أرغب في استشارة معمارية لتطبيق هذا الطراز في شقتي / فيلتي. شكراً جزيلاً!`;
      } else {
        msg = `Hello Eng. Hassan Ahmed,
I just completed your architectural style quiz and my result was:

` +
          `• Recommended Style: ${styleTitle}
` +
          `• Preferred Materials: ${styleMats}

` +
          `I would love to consult with you about designing my apartment / villa in this aesthetic. Thank you!`;
      }
      quizWhatsappBtn.href = `https://wa.me/201096978258?text=${encodeURIComponent(msg)}`;
    }
  }

  if (quizRetakeBtn) {
    quizRetakeBtn.addEventListener('click', () => {
      currentQuestion = 1;
      userAnswers.length = 0;
      if (quizProgressFill) quizProgressFill.style.width = '33.3%';
      if (quizStepBadge) {
        quizStepBadge.textContent = currentLang === 'ar' ? 'السؤال 1 من 3' : 'Question 1 of 3';
      }
      document.querySelectorAll('.quiz-question-box').forEach(q => q.classList.remove('active'));
      const q1 = document.querySelector('.quiz-question-box[data-q="1"]');
      if (q1) q1.classList.add('active');
      if (quizResult) quizResult.style.display = 'none';
      if (quizScreen) quizScreen.style.display = 'block';
    });
  }


  // ==========================================
  // 8. Cinematic Showreel & $10K Motion Engine
  // ==========================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // Showreel video controls & chapter sync
  const reelVideo = document.getElementById('studioShowreelVideo');
  const reelPlayPauseBtn = document.getElementById('reelPlayPauseBtn');
  const reelPlayIcon = document.getElementById('reelPlayIcon');
  const reelFullscreenBtn = document.getElementById('reelFullscreenBtn');
  const reelActiveCaption = document.getElementById('reelActiveCaption');
  const reelChapterBtns = document.querySelectorAll('.reel-chapter-btn');

  if (reelVideo) {
    // Ensure autoplay starts smoothly on browsers allowing muted playback
    reelVideo.play().catch(() => {});

    if (reelPlayPauseBtn) {
      reelPlayPauseBtn.addEventListener('click', () => {
        if (reelVideo.paused) {
          reelVideo.play();
          if (reelPlayIcon) reelPlayIcon.textContent = '⏸';
        } else {
          reelVideo.pause();
          if (reelPlayIcon) reelPlayIcon.textContent = '▶';
        }
      });
    }

    if (reelFullscreenBtn) {
      reelFullscreenBtn.addEventListener('click', () => {
        if (reelVideo.requestFullscreen) {
          reelVideo.requestFullscreen();
        } else if (reelVideo.webkitRequestFullscreen) {
          reelVideo.webkitRequestFullscreen();
        }
      });
    }

    reelChapterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = parseFloat(btn.getAttribute('data-time') || '0');
        const cap = btn.getAttribute('data-caption') || '';
        reelVideo.currentTime = t;
        reelVideo.play().catch(() => {});
        if (reelPlayIcon) reelPlayIcon.textContent = '⏸';
        if (reelActiveCaption && cap) reelActiveCaption.textContent = cap;
        reelChapterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    reelVideo.addEventListener('timeupdate', () => {
      const ct = reelVideo.currentTime;
      let activeBtn = reelChapterBtns[0];
      reelChapterBtns.forEach(btn => {
        const bt = parseFloat(btn.getAttribute('data-time') || '0');
        if (ct >= bt) activeBtn = btn;
      });
      if (activeBtn && !activeBtn.classList.contains('active')) {
        reelChapterBtns.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
        const cap = activeBtn.getAttribute('data-caption');
        if (reelActiveCaption && cap) reelActiveCaption.textContent = cap;
      }
    });
  }

  // Luxury staggered scroll-reveal animations
  const revealTargets = document.querySelectorAll(
    '.stat-card, .lab-card, .quotas-matrix-banner, .estimator-card, .timeline-item, .skill-category, .edu-card, .contact-box, .reveal-on-scroll'
  );
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el, idx) => {
      el.classList.add('reveal-item');
      el.style.transitionDelay = `${Math.min((idx % 4) * 70, 210)}ms`;
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(el => el.classList.add('is-revealed'));
  }

});
