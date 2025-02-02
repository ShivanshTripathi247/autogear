import Sidebar from "@/components/sidebar";
import React from "react";

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return <div className="border-l-[1px] border-t-[-1px] pb-20
    rounded-l-3xl border-muted-foreground overflow-scroll h-screen">
        {children}
    </div>
}

export default Layout
