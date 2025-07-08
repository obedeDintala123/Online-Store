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
// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Home",
            url: "#",
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
                    url: "#",
                },
                {
                    title: "Fashion",
                    url: "#",
                },
                {
                    title: "Home & Kitchen",
                    url: "#",
                },
                {
                    title: "Beauty & Health",
                    url: "#",
                },
                {
                    title: "Sports",
                    url: "#",
                },
                {
                    title: "Books",
                    url: "#",
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
    return (
        <Sidebar
            className="top-[calc(var(--header-height)*1.5)] h-[calc(100svh-var(--header-height)*1.5)]!"
            {...props}
        >
            <SidebarHeader>
                <a href="/" className="p-4">
                    <Image
                        src="/logo-onlineStore (2).svg"
                        alt="favicon"
                        width={180}
                        height={50}
                        sizes="100vw"
                    />
                </a>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSellers sellers={data.sellers} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}