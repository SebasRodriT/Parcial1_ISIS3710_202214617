'use client'
import { useMemo, useEffect, useState} from 'react'
import Image from 'next/image'

interface Character {
    id: string
    image: string
    name: string
}

export default function HarryList() {
    const [personajes, setPersonajes] = useState<Character[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError("")
                const res = await fetch("https://hp-api.onrender.com/api/characters")
                const data = await res.json()
                setPersonajes(data)
            } catch (e) {
                setError("Error cargando los personajes..")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const top12 = useMemo(() => personajes.slice(0,12), [personajes])
    console.log(top12)

    return (
        <section>
            <div className='flex justify-center'>
            <p>Personajes de Harry Potter</p>
            <br></br>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {top12.map((personaje) => (
                    <div key={personaje.id} >
                    <section>
                        
                        <div >
                            <div >
                                <Image
                                src={personaje.image}
                                alt={personaje.name}
                                width={100}
                                height={100}
                                />
                            
                            <p>{personaje.name}</p>
                            </div>
                        </div>
                    </section>
                    </div>
                ))}
                        
                
            </div>
        </section>
    )

    
}