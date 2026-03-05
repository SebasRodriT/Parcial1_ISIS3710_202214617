import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
export default function Header () {
    return (
        <header> 
            <div className='flex justify-center'>
            <Image src="https://www.clipartmax.com/png/full/71-713336_harry-potter-logo-harry-potter-logo-png.png"
                alt=""
                width={300}
                height={300}/>
            </div>
            <LanguageSwitcher/>
        </header>
    )
}