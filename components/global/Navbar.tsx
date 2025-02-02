import { Cog, CogIcon, MenuIcon } from 'lucide-react'
import { Span } from 'next/dist/trace/trace'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = async (props: Props) => {
  return (
    <header className='fixed top-0 left-0 right-0 bg-white
     dark:bg-black/40 border-neutral-900 backdrop-blur-lg z-[100] 
     flex items-center justify-between'>
        <aside className='flex items-center gap-[2px]  mt-2 ml-2'>
            
            <p className=' text-3xl font-bold'>Aut</p>
            <CogIcon className="h-[1em] w-[1em] text-3xl md:text-3xl text-white animate-spin-slow" />
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
        <aside className='flex items-center gap-4 '>
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full 
          p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 
          focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer 
          items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            
            {/* TODO: Add user */}
            {true ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        {/* TODO: Add user */}
        <MenuIcon className='md:hidden'/>
        </aside>
     </header>
        
  )
}

export default Navbar