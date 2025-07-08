"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Home,
    Search,
    ShoppingCart,
    User,
    Layers
} from "lucide-react";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();

    // Evita o flash de layout errado antes da detecção
    if (isMobile === undefined) return null;

    return (
        <>
            {!isMobile ? (
                <div className="[--header-height:calc(--spacing(14))]">
                    <SidebarProvider className="flex flex-col">
                        <SiteHeader />
                        <div className="flex flex-1">
                            <AppSidebar />
                            {children}
                        </div>
                    </SidebarProvider>
                </div>
            ) : (
                <div className="flex flex-col min-h-screen">
                    <main className="flex justify-center items-center flex-1 pb-16">
                        {children}
                    </main>
                    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md">
                        <ul className="flex justify-around items-center py-2 text-sm">
                            <NavItem href="/" label="Home" icon={<Home size={20} />} />
                            <NavItem href="/search" label="Search" icon={<Search size={20} />} />
                            <NavItem href="/cart" label="Cart" icon={<ShoppingCart size={20} />} />
                            <NavItem href="/profile" label="Profile" icon={<User size={20} />} />
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}


function NavItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="flex flex-col items-center text-gray-700 hover:text-black">
                {icon}
                <span className="text-xs mt-1">{label}</span>
            </Link>
        </li>
    );
}
