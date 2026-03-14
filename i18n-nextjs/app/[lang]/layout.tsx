import type { Metadata } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getDictionary } from '@/lib/dictionary'

export const metadata: Metadata = {
    // Default metadata; pages override with their own metadata.
    title: 'HarryPotterApp',
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const dict = await getDictionary(lang as 'en' | 'es')

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} />
            <main className="flex-1 bg-[#e0e0e0]">{children}</main>
            <Footer legal={dict.footer.legal} developedFor={dict.footer.developedFor} />
        </div>
    )
}