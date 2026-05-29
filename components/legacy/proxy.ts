import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sierra AI proxy hook.
 *
 * Bilingual support is handled client-side via I18nProvider, so routing stays
 * untouched here. This remains a lightweight extension point for future auth
 * guards, CSP headers, and request shaping.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Only run on page routes, skip static files and internal paths.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
