export interface Wand {
    wood: string
    core: string
    length: number | null
}

export interface Character {
    id: string
    name: string
    image: string
    gender: string
    house: string
    species: string
    actor: string
    wand: Wand
}

const API_BASE = 'https://hp-api.onrender.com/api'

export async function getCharacters(): Promise<Character[]> {
    const res = await fetch(`${API_BASE}/characters`)
    if (!res.ok) {
        throw new Error('Failed to fetch characters')
    }
    return res.json()
}

export function limitToFirst12(characters: Character[]): Character[] {
    return characters.slice(0, 12)
}

export async function getTop12Characters(): Promise<Character[]> {
    const characters = await getCharacters()
    return limitToFirst12(characters)
}

export async function getCharacterById(id: string): Promise<Character | null> {
    const res = await fetch(`${API_BASE}/character/${encodeURIComponent(id)}`)
    if (!res.ok) {
        throw new Error('Failed to fetch character')
    }

    const data = (await res.json()) as Character[]
    return data[0] ?? null
}
