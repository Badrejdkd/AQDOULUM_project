import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, isLang } from "./lib/i18n";

/**
 * Redirige les adresses sans langue vers la version anglaise (par défaut) :
 * /            → /en
 * /contact     → /en/contact
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLang(first)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|brand|projets|accueil|icon|apple-icon|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)"],
};
