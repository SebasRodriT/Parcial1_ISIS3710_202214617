import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import './globals.css'

export const metadata: Metadata = {
    title: 'HarryPotterApp',
}

async function getLangFromCookie(): Promise<'en' | 'es'> {
    const store = await cookies()
    const lang = store.get('lang')?.value
    return lang === 'en' || lang === 'es' ? lang : 'es'
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const lang = await getLangFromCookie()

    return (
        <html lang={lang}>
            <body className="min-h-screen bg-[#e0e0e0]">{children}</body>
        </html>
    )
}
