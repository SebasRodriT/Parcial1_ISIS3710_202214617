import Image from 'next/image'

import type { Character } from '@/lib/hpApi'

const BorderColorHouses = {
    Gryffindor: 'border-[#740001]',
    Slytherin: 'border-[#1A472A]',
    Ravenclaw: 'border-[#0E1A40]',
    Hufflepuff: 'border-[#FFD800]',
    NoHouse: 'border-[#D1D5DB]',
} as const

type HouseKey = keyof typeof BorderColorHouses

function getHouseKey(house: string | null | undefined): HouseKey {
    const normalized = (house ?? '').trim() as HouseKey
    return normalized in BorderColorHouses ? normalized : 'NoHouse'
}

function formatValue(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '—'
    const str = String(value).trim()
    return str.length > 0 ? str : '—'
}

export default function CharacterDetail({
    character,
    labels,
}: {
    character: Character
    labels: {
        house: string
        gender: string
        wandTitle: string
        wandWood: string
        wandCore: string
        wandLength: string
    }
}) {
    const borderClass = BorderColorHouses[getHouseKey(character.house)]
    const wandLengthValue = formatValue(character.wand?.length)

    return (
        <section className="bg-[#e0e0e0]">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-center text-lg font-semibold text-[#FDB608]">
                    {character.name}
                </h1>

                <div className="mt-6 flex justify-center">
                    <article
                        className={`flex w-full max-w-3xl flex-col overflow-hidden rounded-md border-4 ${borderClass} sm:flex-row`}
                    >
                        <div className="flex-1 bg-neutral-200 p-6 text-xs text-neutral-900">
                            <dl className="space-y-2">
                                <div className="grid grid-cols-[110px_1fr] gap-2">
                                    <dt className="font-semibold">{labels.house}:</dt>
                                    <dd>{formatValue(character.house)}</dd>
                                </div>
                                <div className="grid grid-cols-[110px_1fr] gap-2">
                                    <dt className="font-semibold">{labels.gender}:</dt>
                                    <dd>{formatValue(character.gender)}</dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <p className="font-semibold">{labels.wandTitle}:</p>
                                <dl className="mt-2 space-y-2">
                                    <div className="grid grid-cols-[110px_1fr] gap-2">
                                        <dt className="font-semibold">{labels.wandWood}:</dt>
                                        <dd>{formatValue(character.wand?.wood)}</dd>
                                    </div>
                                    <div className="grid grid-cols-[110px_1fr] gap-2">
                                        <dt className="font-semibold">{labels.wandCore}:</dt>
                                        <dd>{formatValue(character.wand?.core)}</dd>
                                    </div>
                                    <div className="grid grid-cols-[110px_1fr] gap-2">
                                        <dt className="font-semibold">{labels.wandLength}:</dt>
                                        <dd>
                                            {wandLengthValue === '—'
                                                ? '—'
                                                : `${wandLengthValue} cm`}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="relative aspect-[3/4] w-full bg-neutral-200 sm:w-[320px] sm:shrink-0">
                            <Image
                                src={character.image}
                                alt={character.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 420px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}
