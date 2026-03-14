import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CharacterDetail from '@/components/CharacterDetail'
import { getDictionary } from '@/lib/dictionary'
import { getCharacterById } from '@/lib/hpApi'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: 'en' | 'es'; id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const character = await getCharacterById(id)
    const characterName = character?.name ?? 'Personaje'

    return {
        title: `Detalle de ${characterName} - HarryPotterApp`,
        description:
            'Consulta información detallada de cada personaje del mundo mágico: casa, actor/actriz, varita, especie, ascendencia y otros datos relevantes.',
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: 'en' | 'es'; id: string }>
}) {
    const { lang, id } = await params
    const dict = await getDictionary(lang)
    const character = await getCharacterById(id)

    if (!character) {
        notFound()
    }

    return (
        <CharacterDetail
            character={character}
            labels={{
                house: dict.characterDetail.labels.house,
                gender: dict.characterDetail.labels.gender,
                wandTitle: dict.characterDetail.labels.wandTitle,
                wandWood: dict.characterDetail.labels.wandWood,
                wandCore: dict.characterDetail.labels.wandCore,
                wandLength: dict.characterDetail.labels.wandLength,
            }}
        />
    )
}
