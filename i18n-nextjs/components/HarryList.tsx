import CharacterCard from '@/components/CharacterCard'
import type { getDictionary } from '@/lib/dictionary'
import { getTop12Characters } from '@/lib/hpApi'

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default async function HarryList({
    lang,
    dict,
}: {
    lang: string
    dict: Dictionary
}) {
    const top12 = await getTop12Characters()

    return (
        <section aria-label={dict.characters.listAriaLabel}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {top12.map((character) => (
                    <CharacterCard key={character.id} character={character} lang={lang} />
                ))}
            </div>
        </section>
    )
}