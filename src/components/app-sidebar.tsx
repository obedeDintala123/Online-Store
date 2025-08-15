"use client"
import * as React from "react"
import {
    Home,
    Package,
    ShoppingCart,
    Heart,
    Upload,
    Boxes,
    PackageCheck
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavSellers } from "@/components/nav-sellers"
import { NavUser } from "@/components/nav-user"
import Image from "next/image"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import Link from "next/link"
import { User } from "@/hooks/use-auth"
// This is sample data.
const data = {

    navMain: [
        {
            title: "Home",
            url: "/",
            icon: Home,
            isActive: true,
            items: [],
        },
        {
            title: "Category",
            url: "#",
            icon: Package,
            items: [
                {
                    title: "Electronics",
                    url: "/products/category/electronics",
                },
                {
                    title: "Fashion",
                    url: "/products/category/fashion",
                },
                {
                    title: "Home & Kitchen",
                    url: "/products/category/home-kitchen",
                },
                {
                    title: "Beauty & Health",
                    url: "/products/category/beauty-health",
                },
                {
                    title: "Sports",
                    url: "/products/category/sports",
                },
                {
                    title: "Books",
                    url: "/products/category/books",
                },

            ],
        },

        {
            title: "Cart",
            url: "#",
            icon: ShoppingCart,
        },
        {
            title: "Favorites",
            url: "#",
            icon: Heart,
        },
    ],

    sellers: [
        {
            name: "Sell Product",
            url: "/sell",
            icon: Upload,
        },
        {
            name: "My Products",
            url: "/seller/products",
            icon: Boxes,
        },
        {
            name: "Orders Received",
            url: "/seller/orders",
            icon: PackageCheck,
        },
    ]

}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")
        if (token && storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    if (!user) return null // ou algum fallback/loading
    return (
        <Sidebar
            className="top-[calc(var(--header-height)*1.5)] h-[calc(100svh-var(--header-height)*1.5)]!"
            {...props}
        >
            <SidebarHeader>
                <Link href="/" className="p-4">
                    <Image
                        src="/logo-onlineStore.svg"
                        alt="favicon"
                        width={180}
                        height={50}
                        sizes="100vw"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSellers sellers={data.sellers} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}