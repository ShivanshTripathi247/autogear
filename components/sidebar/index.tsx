"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuOptions } from "@/lib/constants";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from "../ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const MenuOptions = () => {
  const pathname = usePathname();

  const menuItems = menuOptions.map((item, index) => ({
    id: index,
    name: item.name,
    designation: "",
    href: item.href,
    Component: item.Component,
    selected: pathname === item.href,
  }));

  return (
    <nav className="dark:bg-black h-screen overflow-scroll justify-between items-center flex flex-col gap-10 py-6 px-2">
      <div className="flex flex-col items-center justify-center gap-5 mr-1">
        <Link className="flex font-bold flex-row " href="/">
          AutoGear.
        </Link>

        <TooltipProvider>
          {menuItems.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-8 w-8 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer',
                        {
                          'dark:bg-[#2F006B] bg-[#EEE0FF] ':
                            menuItem.selected,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={menuItem.selected}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p className="text-white">{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator/>
        <div className="flex flex-col items-center gap-9
        dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56
        overflow-scroll border-[1px]">
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full 
            dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                <LucideMousePointerClick
                className="dark:text-white"
                size={18}
                />
                <div className="border-l-2 border-muted-foreground/50
                h-6 absolute left-1/2 transform translate-x-[-50%]
                -bottom-[30px]"/>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full 
            dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                <GitBranch
                className="text-muted-foreground"
                size={18}
                />
                <div className="border-l-2 border-muted-foreground/50
                h-6 absolute left-1/2 transform translate-x-[-50%]
                -bottom-[30px]"/>
            </div> 
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full 
            dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                <Database
                className="text-muted-foreground"
                size={18}
                />
                <div className="border-l-2 border-muted-foreground/50
                h-6 absolute left-1/2 transform translate-x-[-50%]
                -bottom-[30px]"/>
            </div> 
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full 
            dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
                <GitBranch
                className="text-muted-foreground"
                size={18}
                />
                
            </div> 
        </div>
        <div className=" bottom-4">
    <ModeToggle />
</div>
      </div>


    </nav>
  );
};

export default MenuOptions;
