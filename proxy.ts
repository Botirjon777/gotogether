import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/i18n/config";

const PREFERRED_LOCALE_COOKIE = "NEXT_LOCALE";

function resolveLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const accept = request.headers.get("accept-language");
  if (accept) {
    for (const part of accept.split(",")) {
      const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
      if (tag && (locales as readonly string[]).includes(tag)) {
        return tag;
      }
    }
  }

  return defaultLocale;
}

// Next.js 16: Middleware is now "Proxy" — file is `proxy.ts`, export is `proxy`.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and anything with a file extension (assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
