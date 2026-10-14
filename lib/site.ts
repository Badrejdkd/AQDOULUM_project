/**
 * Informations générales de l'entreprise (non traduites).
 * Les textes traduits (FR / EN) se trouvent dans lib/dict.ts.
 */

export const site = {
  name: "AQDOULUM",
  legalName: "Sté AQDOULUM",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aqdoulum.com",
  email: "steaqdoulum@gmail.com",
  phone: "+212 6 72 66 71 05",
  phoneHref: "+212672667105",
  whatsapp: "https://wa.me/212672667105",
  address: {
    line1: "Lot Enassim, N° 22 et 22 bis, Achbarou",
    city: "Khénifra",
  },
  manager: "Ayoub Qdoumi",
  /* Réseaux sociaux : renseignez les URL pour rendre les liens cliquables. */
  social: {
    instagram: { label: "Sté AQDOULUM", url: "" },
    facebook: { label: "Sté AQDOULUM", url: "" },
  },
};

/** Pages du site (les libellés sont dans lib/dict.ts → nav) */
export const routes = ["/", "/a-propos", "/realisations", "/capacites-techniques", "/qualite-securite-conformite", "/contact"] as const;

/** Villes où l'entreprise est déjà intervenue. */
export const cities = ["Khénifra", "Rabat", "Casablanca", "El Jadida", "Meknès", "Fès", "Marrakech"];

/** Clés des produits et services (icônes) — textes dans lib/dict.ts */
export const serviceKeys = ["aluminium", "verre-trempe", "verre", "accessoires", "quincaillerie", "stores", "parquet", "btp"] as const;
