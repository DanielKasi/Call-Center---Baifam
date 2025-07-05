"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { usePathname } from "next/navigation"
import { HrLink } from "@/components/HrLink";
import { useHrRouter } from "@/lib/useHrRouter";

type NavItem = {
    name: string,
    href: string,
    icon: string
}

const navigation: NavItem[] = [
    {
        name: "Dashboard",
        href: "dashboard",
        icon: "hugeicons:dashboard-browsing",
    },
    {
        name: "Contacts",
        href: "contacts",
        icon: "hugeicons:contact-01",
    },
    {
        name: "Agents",
        href: "agents",
        icon: "hugeicons:headset",
    },
    {
        name: "Calls",
        href: "calls",
        icon: "hugeicons:call-outgoing-03",
    },
    {
        name: "Communications",
        href: "communications",
        icon: "hugeicons:message-01",
    },
]



export function DashboardSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathName = usePathname();
    const router = useHrRouter();

    return (
        <div className={cn("bg-white border-r border-gray-200 transition-all duration-300 relative", collapsed ? "!w-20 !min-w-20 !max-w-20" : "!w-60 !min-w-60 !max-w-60")}>
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2 !h-8 !aspect-square rounded-full !bg-black  !text-white  !absolute top-10 -right-4">
                <Icon icon={collapsed ? "hugeicons:arrow-right-01" : "hugeicons:arrow-left-01"} className="w-5 h-5" />
            </Button>
            <div className="flex flex-col h-full">
                {/* Logo and Toggle */}
                <div className="flex items-center justify-between p-4 max-h-16 min-h-16 border-b border-gray-200">
                    {!collapsed && <h1 className="text-lg font-semibold text-gray-900 inline-block">Stonehill Group</h1>}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        // For active state, compare with pathName
                        // buildHrPath is now handled by HrLink
                        const isActive = pathName.includes(item.href);
                        return (
                            <HrLink
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                                    isActive
                                        ? "bg-primary-700 text-gray-100"
                                        : "text-gray-600 hover:bg-primary-100 hover:text-gray-900",
                                )}
                            >
                                <Icon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
                                {!collapsed && <span className="ml-3">{item.name}</span>}
                            </HrLink>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
