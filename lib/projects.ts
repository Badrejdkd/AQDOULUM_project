/**
 * Portfolio des réalisations (bilingue EN / FR).
 * Projets réels AQDOULUM. Pour en ajouter un, copiez un bloc { ... } et adaptez-le.
 *
 * Pour afficher une vraie photo, déposez-la dans /public/projets/
 * puis renseignez `image: "/projets/nom-du-fichier.jpg"`.
 * Sans photo, une illustration architecturale est générée automatiquement.
 */
import type { Lang, Tx } from "./i18n";

export const projectTypes = ["residential", "commercial", "public", "industrial", "civil", "fitout"] as const;
export type ProjectType = (typeof projectTypes)[number];

export const typeLabels: Record<ProjectType, Tx> = {
  residential: { en: "Residential", fr: "Résidentiel" },
  commercial: { en: "Commercial", fr: "Tertiaire" },
  public: { en: "Public building", fr: "Équipement public" },
  industrial: { en: "Industrial & logistics", fr: "Industriel & logistique" },
  civil: { en: "Civil engineering", fr: "Génie civil & infrastructures" },
  fitout: { en: "Fit-out & finishing", fr: "Aménagement & second œuvre" },
};

export const countryLabels: Record<string, Tx> = {
  MA: { en: "Morocco", fr: "Maroc" },
  CI: { en: "Ivory Coast", fr: "Côte d'Ivoire" },
  SN: { en: "Senegal", fr: "Sénégal" },
  MR: { en: "Mauritania", fr: "Mauritanie" },
  GA: { en: "Gabon", fr: "Gabon" },
  FR: { en: "France", fr: "France" },
};

export const statusLabels = {
  done: { en: "Completed", fr: "Terminé" },
  delivered: { en: "Delivered", fr: "Livré" },
  ongoing: { en: "In progress", fr: "En cours" },
} satisfies Record<string, Tx>;
export type Status = keyof typeof statusLabels;

export type Project = {
  slug: string;
  title: Tx;
  type: ProjectType;
  country: string;
  city?: Tx | string;
  /** Plusieurs villes d'intervention (affichées à la place de `city`) */
  cities?: string[];
  /** Année de fin (sert au tri) */
  year?: number;
  /** Période affichée, ex. « 2016 – 2017 » */
  period?: string;
  status?: Status;
  client?: Tx;
  surface?: Tx;
  amount?: Tx;
  duration?: Tx;
  summary: Tx;
  scope: Tx[];
  highlights: Tx[];
  /** Photo principale (carte + en-tête de la page projet) */
  image?: string;
  /** Photos supplémentaires affichées en galerie sur la page projet */
  gallery?: { src: string; alt: Tx }[];
  featured?: boolean;
};

const MOROCCO_CITIES = ["El Jadida", "Rabat", "Khénifra", "Casablanca", "Meknès", "Marrakech", "Fès"];
const t = (en: string, fr: string): Tx => ({ en, fr });

export const projects: Project[] = [
  // ✅ Projet réel AQDOULUM
  {
    slug: "construction-de-faculte",
    title: t("University faculty construction", "Construction de faculté"),
    type: "public",
    country: "MA",
    city: "El Jadida",
    year: 2017,
    period: "2016 – 2017",
    status: "done",
    client: t("Moroccan State", "État"),
    surface: t("10,000 m²", "10 000 m²"),
    summary: t(
      "Construction of a multi-storey university campus: reinforced-concrete teaching buildings, architectural façades and covered walkways linking the different blocks.",
      "Construction d'un ensemble universitaire sur plusieurs niveaux : bâtiments d'enseignement en béton armé, façades architecturées et galeries couvertes reliant les différents blocs.",
    ),
    scope: [
      t("Reinforced-concrete structural work: foundations, columns, walls and slabs", "Gros œuvre en béton armé : fondations, poteaux, voiles et planchers"),
      t("Rebar and formwork for load-bearing elements", "Ferraillage et coffrage des éléments porteurs"),
      t("Masonry and façade rendering", "Maçonnerie et enduits de façade"),
      t("Covered walkways and canopies", "Galeries couvertes et préaux"),
    ],
    highlights: [
      t("Sculpted concrete façades with projecting window frames", "Façades à modénature en béton, avec encadrements de baies en saillie"),
      t("Two- to three-storey buildings arranged around outdoor spaces", "Ensemble de bâtiments R+2 à R+3 organisé autour d'espaces extérieurs"),
      t("Covered colonnade connecting the blocks", "Galerie couverte sur poteaux assurant les circulations entre les blocs"),
    ],
    image: "/projets/faculte/faculte-vue-ensemble.jpg",
    gallery: [
      { src: "/projets/faculte/faculte-vue-ensemble.jpg", alt: t("Overview of the faculty buildings and covered walkway", "Vue d'ensemble des bâtiments de la faculté et de la galerie couverte") },
      { src: "/projets/faculte/faculte-facade.jpg", alt: t("Rendered concrete façade with projecting window frames", "Façade en béton enduit avec encadrements de baies en saillie") },
      { src: "/projets/faculte/faculte-ferraillage.jpg", alt: t("Reinforcement of a concrete column before pouring", "Ferraillage d'un poteau en béton armé avant coulage") },
    ],
    featured: true,
  },
  // ✅ Projet réel AQDOULUM
  {
    slug: "construction-de-villas",
    title: t("Construction of several villas", "Construction de plusieurs villas"),
    type: "residential",
    country: "MA",
    cities: MOROCCO_CITIES,
    year: 2025,
    period: "2023 – 2025",
    status: "done",
    client: t("State and private clients", "État et particuliers"),
    surface: t("200 to 300 m² per villa", "200 à 300 m² par villa"),
    summary: t(
      "Construction of several contemporary villas, from structural work to finishes: cantilevered volumes, overhanging flat roofs, high-quality façade cladding and outdoor areas with swimming pools.",
      "Réalisation de plusieurs villas contemporaines, du gros œuvre aux finitions : volumes en porte-à-faux, toitures-terrasses débordantes, revêtements de façade soignés et aménagements extérieurs avec piscine.",
    ),
    scope: [
      t("Reinforced-concrete structure and cantilevered slabs", "Gros œuvre en béton armé et dalles en porte-à-faux"),
      t("Façade cladding: natural stone and wood-effect panels", "Revêtements de façade : plaquage pierre et bardage effet bois"),
      t("Aluminium joinery, sliding glass doors and roller shutters", "Menuiseries aluminium, baies vitrées et volets roulants"),
      t("Glass balustrades and sun-shading louvres", "Garde-corps vitrés et brise-soleil"),
      t("Outdoor works: pools, terraces, fences and gates", "Aménagements extérieurs : piscine, terrasses, clôtures et portails"),
    ],
    highlights: [
      t("Contemporary architecture with clean lines", "Architecture contemporaine aux lignes épurées"),
      t("Curved balconies with glass balustrades", "Balcons aux formes courbes et garde-corps en verre"),
      t("High-end finishes delivered turnkey", "Finitions haut de gamme livrées clés en main"),
    ],
    image: "/projets/villas/villa-piscine.jpg",
    gallery: [
      { src: "/projets/villas/villa-piscine.jpg", alt: t("Contemporary villa with stone cladding and pool", "Villa contemporaine avec plaquage pierre et piscine") },
      { src: "/projets/villas/villa-facade-bois.jpg", alt: t("Villa with overhanging roof and wood-effect cladding", "Villa à toiture débordante et bardage effet bois") },
      { src: "/projets/villas/villas-residence.jpg", alt: t("White villas with balconies and gate", "Ensemble de villas blanches avec balcons et portail") },
      { src: "/projets/villas/villas-balcons.jpg", alt: t("Curved balconies with glass balustrades and louvres", "Balcons courbes avec garde-corps vitrés et brise-soleil") },
    ],
    featured: true,
  },
  // ✅ Projet réel AQDOULUM
  {
    slug: "aluminium-en-villa",
    title: t("Aluminium, joinery and villa renovation", "Aluminium, menuiserie et rénovation en villa"),
    type: "residential",
    country: "MA",
    cities: MOROCCO_CITIES,
    year: 2017,
    period: "2016 – 2017",
    status: "done",
    client: t("State and private clients", "État et particuliers"),
    surface: t("Various sizes", "Surfaces variées"),
    summary: t(
      "Joinery, aluminium, double glazing, tiling, painting and interior and exterior renovation works in villas and buildings, for the State and private clients.",
      "Travaux de menuiserie, d'aluminium, de double vitrage, de carrelage, de peinture et de rénovation intérieure et extérieure dans des villas et bâtiments, pour l'État et des particuliers.",
    ),
    scope: [
      t("Aluminium joinery: windows, doors, frames and glass partitions", "Menuiserie aluminium : fenêtres, portes, châssis et cloisons vitrées"),
      t("Double glazing and tempered-glass works (balustrades, skylights)", "Double vitrage et ouvrages en verre trempé (garde-corps, verrières)"),
      t("Joinery", "Menuiserie"),
      t("Tiling", "Carrelage"),
      t("Painting", "Peinture"),
      t("Interior and exterior renovation", "Rénovation intérieure et extérieure"),
    ],
    highlights: [
      t("Made-to-measure work tailored to each space", "Ouvrages sur mesure, adaptés à chaque espace"),
      t("Careful finishes: powder-coated profiles, stainless fittings, tempered glass", "Finitions soignées : profilés laqués, fixations inox, verre trempé"),
      t("More natural light and transparency between spaces", "Apport de lumière naturelle et transparence entre les espaces"),
    ],
    image: "/projets/aluminium/alu-garde-corps-escalier.jpg",
    gallery: [
      { src: "/projets/aluminium/alu-garde-corps-escalier.jpg", alt: t("Glass balustrade on a marble staircase", "Garde-corps en verre sur escalier en marbre") },
      { src: "/projets/aluminium/alu-verriere.jpg", alt: t("Aluminium-framed skylight", "Verrière zénithale à ossature aluminium") },
      { src: "/projets/aluminium/alu-menuiseries-vitrees.jpg", alt: t("Red powder-coated aluminium glazing", "Menuiseries vitrées en aluminium laqué rouge") },
      { src: "/projets/aluminium/alu-cloisons-vitrees.jpg", alt: t("Aluminium glass partitions with integrated blinds", "Cloisons vitrées en aluminium avec stores intégrés") },
    ],
    featured: true,
  },
  // ✅ Projet réel AQDOULUM — complétez la ville, l'année et le client si besoin.
  {
    slug: "amenagement-et-carrelage",
    title: t("Fit-out and tiling", "Aménagement et carrelage"),
    type: "fitout",
    country: "MA",
    summary: t(
      "Interior fit-out and large-format tiling, using a levelling system to achieve perfectly flat floors and even joints.",
      "Travaux d'aménagement intérieur et pose de carrelage grand format, avec un système de nivellement pour obtenir des sols parfaitement plans et des joints réguliers.",
    ),
    scope: [
      t("Substrate preparation and levelling", "Préparation des supports et ragréage"),
      t("Bonded installation of large-format tiles", "Pose collée de carrelage grand format"),
      t("Levelling with spacers and self-levelling wedges", "Nivellement par croisillons et cales auto-nivelantes"),
      t("Grouting, skirting and finishes", "Joints, plinthes et finitions"),
    ],
    highlights: [
      t("Controlled flatness over large areas", "Planéité maîtrisée sur de grandes surfaces"),
      t("Thin, aligned joints", "Joints fins et alignés"),
      t("Careful adhesive application for lasting bond", "Encollage soigné pour une adhérence durable"),
    ],
    image: "/projets/carrelage/carrelage-pose-grand-format.jpg",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCountries = Array.from(new Set(projects.map((p) => p.country)));
/** Types réellement utilisés par les projets (pour les filtres). */
export const usedProjectTypes = projectTypes.filter((t) => projects.some((p) => p.type === t));

/** Texte court de localisation pour les cartes. */
export function placeLabel(p: Project, lang: Lang) {
  const country = countryLabels[p.country]?.[lang] ?? p.country;
  if (p.cities && p.cities.length > 2) return `${p.cities.length} ${lang === "fr" ? "villes" : "cities"} · ${country}`;
  const city = p.cities?.join(", ") ?? (typeof p.city === "string" ? p.city : p.city?.[lang]);
  return city ? `${city}, ${country}` : country;
}

/** Projets réels (avec photo) d'abord, puis les plus récents. */
export function sortProjects(a: Project, b: Project) {
  return (b.image ? 1 : 0) - (a.image ? 1 : 0) || (b.year ?? 9999) - (a.year ?? 9999);
}
