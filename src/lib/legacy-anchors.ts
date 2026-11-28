/** Sections of the original single-page site and the route that now holds them.
 *  `hash` is kept for sections that share the About page. */
export const legacyAnchors: Record<string, { path: string; hash?: string }> = {
  showreel: { path: "tour" },
  tour: { path: "tour" },
  projects: { path: "projects" },
  lab: { path: "lab" },
  estimator: { path: "estimator" },
  experience: { path: "about", hash: "experience" },
  skills: { path: "about", hash: "skills" },
  education: { path: "about", hash: "education" },
  contact: { path: "about", hash: "contact" },
};
