import type { Metadata } from 'next'

import HarryList from '@/components/HarryList'
import { getDictionary } from '@/lib/dictionary'

export const metadata: Metadata = {
    title: 'Listado de personajes - HarryPotterApp',
    description:
    'Explora el universo mágico de Harry Potter: un listado completo de personajes, incluido voldemort, con su casa, especie y datos principales.',
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: 'en' | 'es' }>
}) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <section className="bg-[#e0e0e0]">
            <div className="mx-auto max-w-5xl px-6 py-8">
                <h1 className="text-center text-lg font-semibold text-[#FDB608]">
                    {dict.characters.title}
                </h1>
                <p className="mt-2 text-center text-xs text-neutral-700">
                    {dict.characters.subtitle}
                </p>
                <div className="mt-6">
                    <HarryList lang={lang} dict={dict} />
                </div>
            </div>
        </section>
    )
}