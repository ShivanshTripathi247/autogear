"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuOptions } from "@/lib/constants";
import clsx from "clsx";
import { AnimatedTooltip } from "@/components/global/animated-tooltip";
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
      <div className="flex flex-col items-center justify-center gap-8 mr-1">
        <Link className="flex font-bold flex-row " href="/">
          AutoGear.
        </Link>

        <div className="flex flex-col gap-6">
          <AnimatedTooltip
            items={menuItems}
            orientation="vertical"
            Component={({ item }) => (
              <Link
                href={item.href}
                className={clsx(
                  "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                  {
                    "dark:bg-[#2F006B] bg-[#EEE0FF]": item.selected,
                  }
                )}
              >
                <item.Component selected={item.selected} />
              </Link>
            )}
            
          />
          
        </div>
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
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
            <ModeToggle />
      </div>
    </nav>
  );
};

export default MenuOptions;
