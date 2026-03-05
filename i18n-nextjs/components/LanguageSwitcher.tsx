'use client'

import { useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
    const router = useRouter()

    const changeLanguage = (lang: string) => {
        document.cookie = `lang=${lang}`
        router.push(`/${lang}`)
    }

    return (
        <div>
            <button onClick={() => changeLanguage('es')}>ES</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
        </div>
    )
}