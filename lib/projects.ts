/**
 * Portfolio des réalisations (bilingue EN / FR).
 * Les 4 premiers projets sont des projets réels AQDOULUM ; les suivants sont des exemples à supprimer ou remplacer.
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

  /* ---------- Projets d'exemple (à supprimer ou remplacer) ---------- */
  {
    slug: "residence-anfa-horizon",
    title: t("Anfa Horizon Residence", "Résidence Anfa Horizon"),
    type: "residential",
    country: "MA",
    city: "Casablanca",
    year: 2025,
    status: "delivered",
    client: t("Private developer", "Promoteur immobilier privé"),
    surface: t("38,000 m²", "38 000 m²"),
    duration: t("30 months", "30 mois"),
    summary: t(
      "High-end residential complex of three 15-storey towers over two basement levels, with landscaped areas and ground-floor shops.",
      "Ensemble résidentiel haut standing de trois tours R+14 sur deux niveaux de sous-sol, avec espaces paysagers et commerces en pied d'immeuble.",
    ),
    scope: [
      t("Earthworks and deep foundations", "Terrassements et fondations profondes"),
      t("Reinforced-concrete structural work", "Gros œuvre en béton armé"),
      t("Finishing trades", "Corps d'état secondaires"),
      t("Outdoor works", "Aménagements extérieurs"),
    ],
    highlights: [
      t("Diaphragm walls in a dense urban area", "Parois moulées en zone urbaine dense"),
      t("Post-tensioned slabs", "Planchers post-contraints"),
      t("Strict site safety management", "Gestion rigoureuse de la sécurité du chantier"),
    ],
  },
  {
    slug: "siege-regional-plateau",
    title: t("Regional headquarters — Le Plateau", "Siège régional — Le Plateau"),
    type: "commercial",
    country: "CI",
    city: "Abidjan",
    year: 2024,
    status: "delivered",
    client: t("Pan-African banking group", "Groupe bancaire panafricain"),
    surface: t("22,500 m²", "22 500 m²"),
    duration: t("26 months", "26 mois"),
    summary: t(
      "19-storey glass-fronted office building designed for high energy performance and efficient operation.",
      "Immeuble de bureaux R+18 à façade vitrée, conçu pour une performance énergétique élevée et une exploitation optimisée.",
    ),
    scope: [
      t("Structural work", "Gros œuvre"),
      t("Curtain walls", "Façades rideaux"),
      t("HVAC and electrical packages", "Lots techniques CVC et courants forts"),
      t("Coordination of all trades", "Coordination tous corps d'état"),
    ],
    highlights: [
      t("Coordinated design model", "Maquette de synthèse"),
      t("Energy-efficient design", "Conception économe en énergie"),
      t("Delivered on schedule", "Livraison dans les délais contractuels"),
    ],
  },
  {
    slug: "centre-hospitalier-regional",
    title: t("Regional hospital", "Centre hospitalier régional"),
    type: "public",
    country: "MR",
    city: "Nouakchott",
    year: 2023,
    status: "delivered",
    client: t("Ministry of Health", "Ministère de la Santé"),
    surface: t("31,000 m²", "31 000 m²"),
    duration: t("34 months", "34 mois"),
    summary: t(
      "250-bed hospital with a technical platform, operating theatres, an emergency department and logistics buildings.",
      "Hôpital de 250 lits comprenant un plateau technique, des blocs opératoires, un service d'urgences et des bâtiments logistiques.",
    ),
    scope: [
      t("Building envelope", "Clos et couvert"),
      t("Medical gases", "Fluides médicaux"),
      t("Clean rooms and operating theatres", "Salles propres et blocs opératoires"),
      t("External networks", "VRD et réseaux extérieurs"),
    ],
    highlights: [
      t("International healthcare standards", "Exigences sanitaires internationales"),
      t("Construction in a desert climate", "Chantier en climat désertique"),
      t("Training of local workers", "Formation de compagnons locaux"),
    ],
  },
  {
    slug: "plateforme-logistique-zenata",
    title: t("Zenata logistics platform", "Plateforme logistique Zenata"),
    type: "industrial",
    country: "MA",
    city: "Mohammedia",
    year: 2024,
    status: "delivered",
    client: t("International logistics operator", "Opérateur logistique international"),
    surface: t("64,000 m²", "64 000 m²"),
    duration: t("14 months", "14 mois"),
    summary: t(
      "Class A warehouse with long-span steel structure, high-flatness industrial flooring and loading docks.",
      "Entrepôt de classe A avec charpente métallique grande portée, dallage industriel haute planéité et quais de chargement.",
    ),
    scope: [
      t("General earthworks", "Terrassements généraux"),
      t("Industrial flooring", "Dallage industriel"),
      t("Steel frame and cladding", "Charpente et bardage"),
      t("Heavy-duty roads", "Voiries lourdes"),
    ],
    highlights: [
      t("Jointless industrial slab", "Dallage sans joint de retrait"),
      t("Fast-track 14-month programme", "Délai record de 14 mois"),
      t("Environmental site management", "Gestion environnementale du chantier"),
    ],
  },
  {
    slug: "pont-sur-oued",
    title: t("River bridge", "Ouvrage d'art sur oued"),
    type: "civil",
    country: "SN",
    city: t("Thiès region", "Région de Thiès"),
    year: 2022,
    status: "delivered",
    client: t("National roads agency", "Agence nationale des routes"),
    amount: t("420 m structure", "Ouvrage de 420 m"),
    duration: t("22 months", "22 mois"),
    summary: t(
      "420-metre prestressed-beam bridge and its road approaches, built while keeping existing traffic open.",
      "Pont à poutres précontraintes de 420 mètres et ses accès routiers, réalisé en maintenant la circulation existante.",
    ),
    scope: [
      t("Pile foundations", "Fondations sur pieux"),
      t("Piers and abutments", "Piles et culées"),
      t("Precast prestressed beams", "Poutres préfabriquées précontraintes"),
      t("Pavements and equipment", "Chaussées et équipements"),
    ],
    highlights: [
      t("On-site precasting", "Préfabrication sur site"),
      t("Seasonal flood management", "Gestion des crues saisonnières"),
      t("Third-party quality control", "Contrôle qualité tierce partie"),
    ],
  },
  {
    slug: "groupe-scolaire-rufisque",
    title: t("School complex", "Groupe scolaire et lycée"),
    type: "public",
    country: "SN",
    city: "Rufisque",
    year: 2025,
    status: "ongoing",
    client: t("Local authority", "Collectivité territoriale"),
    surface: t("12,800 m²", "12 800 m²"),
    duration: t("18 months", "18 mois"),
    summary: t(
      "Educational complex with 48 classrooms, laboratories, a library and covered sports facilities.",
      "Complexe éducatif de 48 salles de classe, laboratoires, bibliothèque et installations sportives couvertes.",
    ),
    scope: [
      t("Structural work", "Gros œuvre"),
      t("Finishing works", "Second œuvre"),
      t("Sports facilities", "Équipements sportifs"),
      t("Landscaping", "Aménagements paysagers"),
    ],
    highlights: [
      t("Natural ventilation and solar shading", "Ventilation naturelle et protections solaires"),
      t("Local materials", "Matériaux locaux"),
      t("Partly occupied site", "Chantier en site partiellement occupé"),
    ],
  },
  {
    slug: "hotel-bord-de-mer-agadir",
    title: t("Five-star seafront hotel", "Hôtel 5 étoiles bord de mer"),
    type: "commercial",
    country: "MA",
    city: "Agadir",
    year: 2023,
    status: "delivered",
    client: t("International hotel group", "Groupe hôtelier international"),
    surface: t("27,000 m²", "27 000 m²"),
    duration: t("28 months", "28 mois"),
    summary: t(
      "220-key hotel resort with a conference centre, spa and pools, built to the brand's standards.",
      "Complexe hôtelier de 220 clés avec centre de conférences, spa et piscines, réalisé selon les standards de la marque.",
    ),
    scope: [
      t("Structural work", "Gros œuvre"),
      t("High-end finishes", "Finitions haut de gamme"),
      t("Building services", "Lots techniques"),
      t("Outdoor works", "Aménagements extérieurs"),
    ],
    highlights: [
      t("Earthquake-resistant construction", "Construction parasismique"),
      t("Mock-up rooms approved by the brand", "Chambres témoins validées par l'enseigne"),
      t("Coordination of many subcontractors", "Coordination de nombreux sous-traitants"),
    ],
  },
  {
    slug: "usine-agroalimentaire-libreville",
    title: t("Food-processing plant", "Unité agroalimentaire"),
    type: "industrial",
    country: "GA",
    city: "Libreville",
    year: 2025,
    status: "ongoing",
    client: t("Food manufacturer", "Industriel agroalimentaire"),
    surface: t("18,000 m²", "18 000 m²"),
    duration: t("16 months", "16 mois"),
    summary: t(
      "Processing plant with controlled-atmosphere areas, cold rooms and office buildings.",
      "Usine de transformation avec zones à atmosphère contrôlée, chambres froides et bâtiments administratifs.",
    ),
    scope: [
      t("Industrial civil works", "Génie civil industriel"),
      t("Machine foundations", "Massifs de machines"),
      t("Insulated panels", "Panneaux isothermes"),
      t("Utility networks", "Réseaux d'utilités"),
    ],
    highlights: [
      t("Food hygiene standards", "Normes d'hygiène alimentaire"),
      t("Phasing with equipment installation", "Phasage avec l'installation des équipements"),
      t("Strict flatness tolerances", "Tolérances de planéité strictes"),
    ],
  },
  {
    slug: "rehabilitation-immeuble-lyon",
    title: t("Office building refurbishment", "Réhabilitation d'un immeuble de bureaux"),
    type: "commercial",
    country: "FR",
    city: "Lyon",
    year: 2024,
    status: "delivered",
    client: t("Private property company", "Foncière privée"),
    surface: t("9,400 m²", "9 400 m²"),
    duration: t("15 months", "15 mois"),
    summary: t(
      "Major refurbishment of a 1970s building: structural strengthening, asbestos removal and energy upgrade.",
      "Restructuration lourde d'un immeuble des années 1970 : renforcement structurel, désamiantage et mise aux normes énergétiques.",
    ),
    scope: [
      t("Strip-out and asbestos removal", "Curage et désamiantage"),
      t("Structural strengthening", "Renforcement de structure"),
      t("External thermal insulation", "Isolation thermique par l'extérieur"),
      t("Interior fit-out", "Aménagements intérieurs"),
    ],
    highlights: [
      t("Eurocode compliance", "Conformité Eurocodes"),
      t("Material reuse", "Réemploi de matériaux"),
      t("City-centre site", "Chantier en centre-ville"),
    ],
  },
  {
    slug: "voirie-et-reseaux-zone-industrielle",
    title: t("Industrial zone roads and utilities", "VRD d'une zone industrielle"),
    type: "civil",
    country: "MA",
    city: "Kénitra",
    year: 2022,
    status: "delivered",
    client: t("Public developer", "Aménageur public"),
    amount: t("120 ha developed", "120 ha aménagés"),
    duration: t("20 months", "20 mois"),
    summary: t(
      "Full servicing of an industrial zone: roads, drainage, water supply, power networks and street lighting.",
      "Viabilisation complète d'une zone industrielle : voiries, assainissement, adduction d'eau, réseaux électriques et éclairage public.",
    ),
    scope: [
      t("Earthworks", "Terrassements"),
      t("Drainage and drinking water", "Assainissement et eau potable"),
      t("Roads and signage", "Voiries et signalisation"),
      t("Dry utilities", "Réseaux secs"),
    ],
    highlights: [
      t("Kilometres of networks laid", "Plusieurs kilomètres de réseaux posés"),
      t("Phased handover by lots", "Phasage par lots livrés progressivement"),
      t("Environmental site management", "Gestion environnementale du chantier"),
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCountries = Array.from(new Set(projects.map((p) => p.country)));

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
