"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Home,
    Search,
    ShoppingCart,
    User,
    Layers,
    Heart
} from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { useProductStore } from "@/hooks/use-product-store";
import { usePathname } from "next/navigation";


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const search = useProductStore((s) => s.search);
    const setSearch = useProductStore((s) => s.setSearch);
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
                <div className="flex flex-col min-h-[100dvh]">
                    <main className="flex-1 pb-16">
                        {
                            path === "/" ? (
                                <header className="p-2 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <Image src={"/logo-onlineStore (2).svg"} width={64} height={64} alt="logo" className="w-40" />

                                        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                                    </div>
                                    <div>
                                        <SearchForm search={search} setSearch={setSearch} />
                                    </div>
                                </header>
                            ): null
                       }
                        {children}
                    </main>
                    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md">
                        <ul className="flex justify-around items-center py-2 text-sm">
                            <NavItem href="/" label="Home" icon={<Home size={20} />} />
                            <NavItem href="/favorites" label="Favorites" icon={<Heart size={20} />} />
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
