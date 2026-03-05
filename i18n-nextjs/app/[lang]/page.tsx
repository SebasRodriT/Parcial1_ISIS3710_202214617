import LanguageSwitcher from "@/components/LanguageSwitcher"
import { getDictionary } from "@/lib/dictionary"

export default async function Page({
    params
}: {
    params: { lang: 'en' | 'es'}
}) {
    const dict = await getDictionary(params.lang)

    return ( 
        <main> 
            <LanguageSwitcher/>
            <h1>{dict.welcome}</h1>
            <p>{dict.home}</p>
            <p>{dict.profile}</p>
        </main>
    )
}