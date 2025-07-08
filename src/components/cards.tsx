"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface CardProps {
    name: string
    src: string
    alt: string
    price?: string
    className?: string
}

export const Card = ({
    name,
    src,
    alt,
    price,
    className
}: CardProps) => {

    const isMobile = useIsMobile();

    return (
        <div className="relative group overflow-hidden rounded-lg shadow-md">
            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                className={cn("block mx-auto object-cover w-full h-auto transition duration-300", className)}
            />

            {/* Overlay */}
            <div className="flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 text-white p-3 md:p-6 flex-col justify-between cursor-pointer">

                {/* Top */}
                <div className="flex items-center justify-between">
                    {/* Preço no canto superior esquerdo */}
                    {price && (
                        <span className="text-base md:text-xl font-bold rounded">{price}$</span>
                    )}

                    {/* Ícones no canto superior direito */}
                    <div className="flex gap-2 sm:gap-4 md:gap-6">
                        <button className="p-2 hover:bg-black/40 rounded-md">
                            <Heart size={isMobile ? 16 : 24} />

                        </button>
                        <button className="p-2 hover:bg-black/40 rounded-md">
                            <ShoppingCart size={isMobile ? 16 : 24} />
                        </button>
                    </div>
                </div>

                {/* Bottom - Nome do produto no canto inferior esquerdo */}
                <div>
                    <span className="text-sm md:text-base font-semibold ">{name}</span>
                </div>
            </div>
        </div>
    )
}
