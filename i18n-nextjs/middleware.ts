import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es']
const defaultLocale = 'es'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const pathnamehasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnamehasLocale) return

    const locale = request.headers.get('accept-language')?.includes('es')
        ? 'es'
        : 'en'
    
    request.nextUrl.pathname = `/${locale}${pathname}`

    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: ['/((?!_next).*)'],
}