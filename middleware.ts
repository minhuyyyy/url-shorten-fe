import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { languages } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
    matcher: ['/', '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export function middleware(req: NextRequest): NextResponse {
    console.log('Middleware triggered for:', req.nextUrl.pathname);

    // ✅ Check if the request is already in a supported language path
    const isLanguagePrefixed = languages.some((lng) => req.nextUrl.pathname.startsWith(`/${lng}`));

    if (!isLanguagePrefixed) {
        console.log('Redirecting to:', `/en${req.nextUrl.pathname}`);
        return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url));
    }

    return NextResponse.next();
}
