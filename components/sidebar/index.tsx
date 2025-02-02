"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { menuOptions } from '@/lib/constants'

  

type Props = {}

const MenuOptions= (props: Props) => {
    const pathname = usePathname()
  return (
    <nav className=' dark:bg-black h-screen overflow-scroll
    justify-between items-center flex flex-col gap-10 py-6 px-2'>
        <div className='flex flex-col items-center justify-center gap-8'>
            <Link 
            className="flex font-bold flow-row"
            href="/">
                AutoGear.
            </Link>
            <TooltipProvider>
                {menuOptions.map(() => (
                    <div>

                    </div>
                ))}
            </TooltipProvider>
        </div>
    </nav>
  )
}

export default MenuOptions