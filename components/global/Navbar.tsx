import { Cog } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = async (props: Props) => {
  return (
    <header className='fixed top-0 left-0 right-0 bg-white
     dark:bg-black/40 border-neutral-900 backdrop-blur-lg z-[100] flex-items-center justify-between'>
        <aside className='flex items-center gap-[2px]  mt-2 ml-2'>
            
            <p className=' text-3xl font-bold'>Aut</p>
            <Cog className='w-10 h-10' />
            <p className='text-3xl font-bold '>Gear</p>
        </aside>
        <nav className='absolute left-[50%] top-[50%] transform translate-x-[-50%]
        translate-y-[-50%] hidden md:block'>
            <ul className='flex items-center gap-4 list-none'>
                <li>
                    <Link href='/'>Products</Link>
                </li>
                <li>
                    <Link href='/'>Pricing</Link>
                </li>
                <li>
                    <Link href='/'>Clients</Link>
                </li>
                <li>
                    <Link href='/'>Resources</Link>
                </li>
                <li>
                    <Link href='/'>Documentation</Link>
                </li>
                <li>
                    <Link href='/'>Enterprise</Link>
                </li>
            </ul>
        </nav>
     </header>
        
  )
}

export default Navbar