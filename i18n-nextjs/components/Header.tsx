import Image from 'next/image'
import Link from 'next/link'

import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ lang }: { lang: string }) {
    return (
        <header className="bg-[#FDB608]">
            <div className="mx-auto max-w-5xl px-6 py-3">
                <div className="flex flex-col items-center gap-2">
                    <Link href={`/${lang}`} aria-label="Ir al inicio">
                        <Image
                            src="https://www.clipartmax.com/png/full/71-713336_harry-potter-logo-harry-potter-logo-png.png"
                            alt="Logo voldemort de Harry Potter"
                            width={160}
                            height={60}
                            priority
                        />
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    )
}