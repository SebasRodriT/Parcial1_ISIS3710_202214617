import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es'] as const

type Locale = (typeof locales)[number]

function detectLocale(request: NextRequest): Locale {
    const acceptLanguage = request.headers.get('accept-language') ?? ''
    return acceptLanguage.includes('es') ? 'es' : 'en'
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        const currentLocale = locales.find(
            (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        )

        const response = NextResponse.next()
        if (currentLocale) {
            response.cookies.set('lang', currentLocale)
        }
        return response
    }

    const locale = detectLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`

    const response = NextResponse.redirect(request.nextUrl)
    response.cookies.set('lang', locale)
    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
