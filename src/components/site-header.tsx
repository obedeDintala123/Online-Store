"use client"

import { SidebarIcon } from "lucide-react"

import { SearchForm } from "./search-form"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useProductStore } from "@/hooks/use-product-store"

export function SiteHeader() {
    const { toggleSidebar } = useSidebar();
    const search = useProductStore((s) => s.search);
    const setSearch = useProductStore((s) => s.setSearch);

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-[calc(var(--header-height)*1.5)] w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>

                <Separator orientation="vertical" className="mr-2 h-4" />

                <SearchForm className="w-full sm:ml-auto sm:w-1/2" search={search} setSearch={setSearch} />
            </div>
        </header>
    )
}
