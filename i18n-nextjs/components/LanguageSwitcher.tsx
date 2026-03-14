'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const changeLanguage = (lang: string) => {
        document.cookie = `lang=${lang}`

        const qs = searchParams?.toString()
        
        const segments = (pathname || '/').split('/')
        const currentLocale = segments[1]
        const hasLocale = currentLocale === 'es' || currentLocale === 'en'

        const nextPath = hasLocale
            ? `/${lang}${segments.slice(2).length ? `/${segments.slice(2).join('/')}` : ''}`
            : `/${lang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`

        router.push(qs ? `${nextPath}?${qs}` : nextPath)
    }

    return (
        <div className="flex items-center gap-2 text-[10px]">
            <button
                type="button"
                onClick={() => changeLanguage('en')}
                className="rounded px-2 py-0.5 font-semibold text-neutral-800 hover:bg-black/10"
            >
                EN
            </button>
            <button
                type="button"
                onClick={() => changeLanguage('es')}
                className="rounded px-2 py-0.5 font-semibold text-neutral-800 hover:bg-black/10"
            >
                ES
            </button>
        </div>
    )
}