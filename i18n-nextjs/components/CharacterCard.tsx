import Image from 'next/image'
import Link from 'next/link'

import type { Character } from '@/lib/hpApi'

const BgColorHouses = {
    Gryffindor: 'bg-[#740001]',
    Slytherin: 'bg-[#1A472A]',
    Ravenclaw: 'bg-[#0E1A40]',
    Hufflepuff: 'bg-[#FFD800]',
    NoHouse: 'bg-[#D1D5DB]',
} as const

type HouseKey = keyof typeof BgColorHouses

function getHouseKey(house: string | null | undefined): HouseKey {
    const normalized = (house ?? '').trim() as HouseKey
    return normalized in BgColorHouses ? normalized : 'NoHouse'
}

function getHeaderTextColor(houseKey: HouseKey) {
    return houseKey === 'Hufflepuff' || houseKey === 'NoHouse'
        ? 'text-black'
        : 'text-white'
}

export default function CharacterCard({
    character,
    lang,
}: {
    character: Character
    lang: string
}) {
    const houseKey = getHouseKey(character.house)
    const bgClass = BgColorHouses[houseKey]

    return (
        <Link
            href={`/${lang}/character/${character.id}`}
            className="block focus:outline-none focus:ring-2 focus:ring-black/20 rounded-lg"
        >
            <article className="overflow-hidden rounded-lg border border-black/10">
                <div
                    className={`${bgClass} ${getHeaderTextColor(houseKey)} px-3 py-2 text-center text-[11px] font-semibold`}
                >
                    {character.name}
                </div>
                <div className="bg-neutral-200 p-4">
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-md bg-neutral-300">
                        <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 180px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </article>
        </Link>
    )
}
