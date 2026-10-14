import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

/* Icônes métiers (style trait, cohérent avec le logo) */

export const IconBuilding = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M8 42V14l16-8v36M24 42V18l16 6v18M4 42h40" />
    <path d="M13 18h5M13 24h5M13 30h5M29 28h6M29 34h6" />
  </svg>
);

export const IconBridge = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M2 26h44M6 26v14M42 26v14M2 40h44" />
    <path d="M6 26c6-12 30-12 36 0M14 26v-6M24 26v-8M34 26v-6" />
  </svg>
);

export const IconRoad = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M16 6L6 42M32 6l10 36M24 8v6M24 20v8M24 34v8" />
  </svg>
);

export const IconFactory = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M4 42V22l10 6v-6l10 6v-6l10 6V8h8v34H4z" />
    <path d="M12 36h4M22 36h4M32 36h4" />
  </svg>
);

export const IconTrowel = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M6 30l18-18 12 12-18 18H6V30zM28 20l10-10 4 4-10 10" />
    <path d="M12 36l8-8" />
  </svg>
);

export const IconRenovate = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M8 42V20L24 8l16 12v22H8z" />
    <path d="M18 42V30h12v12M38 6v8M34 10h8" />
  </svg>
);

export const IconCrane = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M14 42V8M10 42h12M14 8h30M14 14l8-6M30 8v10M27 18h6v5h-6zM4 8h10" />
  </svg>
);

export const IconPeople = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <circle cx="17" cy="16" r="6" />
    <circle cx="33" cy="18" r="5" />
    <path d="M5 40c0-7 5-12 12-12s12 5 12 12M29 30c7-1 14 3 14 10" />
  </svg>
);

export const IconCube = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M24 4l18 10v20L24 44 6 34V14L24 4z" />
    <path d="M6 14l18 10 18-10M24 24v20" />
  </svg>
);

export const IconLab = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M18 6h12M20 6v12L8 40h32L28 18V6" />
    <path d="M14 30h20" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10l16-6z" />
    <path d="M17 24l5 5 10-11" />
  </svg>
);

export const IconLeaf = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M8 40C8 18 22 8 42 8c0 20-10 34-32 32z" />
    <path d="M8 40l18-18" />
  </svg>
);

export const IconScale = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M24 6v36M14 42h20M8 12h32" />
    <path d="M8 12l-5 14h10L8 12zM40 12l-5 14h10l-5-14z" />
  </svg>
);

export const IconCompass = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <circle cx="24" cy="24" r="18" />
    <path d="M30 18l-4 8-8 4 4-8 8-4z" />
  </svg>
);

export const IconTarget = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="2" />
  </svg>
);

export const IconHandshake = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} {...p}>
    <path d="M4 18l8-6 10 4 6-4 8 2 8 6M4 18v12l14 10 6-4M44 20v10L32 40" />
    <path d="M22 16l-6 8 4 3 8-7 10 9" />
  </svg>
);

/* Contact */
export const IconPhone = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </svg>
);
export const IconMail = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
export const IconPin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
  </svg>
);
export const IconInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const IconFacebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" />
  </svg>
);
export const IconWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.3.1.2.1.7-.1 1.2z" />
  </svg>
);

/* Produits & services (plaquette) */
export const IconWindow = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="4" y="3" width="16" height="18" />
    <path d="M12 3v18M4 12h16" />
  </svg>
);
export const IconGlass = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 3h14v18H5z" />
    <path d="M8 13l5-5M8 17l9-9" />
  </svg>
);
export const IconPane = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 4h18v16H3z" />
    <path d="M7 15l4-4M11 16l6-6" />
  </svg>
);
export const IconProfile = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 20V8l4-4h12v4H9v12z" />
    <path d="M12 12h8v8h-8z" />
  </svg>
);
export const IconHandle = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 3v18M7 8h8a2 2 0 012 2v0a2 2 0 01-2 2H7" />
  </svg>
);
export const IconBlinds = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 3h18M5 3v14M19 3v14M5 7h14M5 11h14M5 15h14M12 17v4" />
  </svg>
);
export const IconParquet = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h9M12 3v12M12 15h9M9 9v12M15 3v6h6" />
  </svg>
);
export const IconHelmet = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 17h18M5 17v-3a7 7 0 0114 0v3M10 7V4h4v3" />
  </svg>
);
