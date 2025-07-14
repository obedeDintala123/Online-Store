"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Heart, ShoppingCart, Ellipsis } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

interface CardProps {
    name: string
    src: string
    alt: string
    slug?: string;
    price?: string
    className?: string
    productId: number;
}

export const Card = ({
    productId,
    slug,
    name,
    src,
    alt,
    price,
    className
}: CardProps) => {

    const isMobile = useIsMobile();
    const router = useRouter();


    const openProductView = (id: number) => {
        console.log("Your id is: ", id);
        router.push(`/products/${slug}-${id}`);
    }

    return (
        <div className={cn(
            "relative group m-0 p-0 break-inside-avoid overflow-hidden md:shadow",
            className
        )}>

            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-md"
                priority
                onClick={() => openProductView(productId)}
              
            />

            <div className="flex justify-between p-1 md:hidden">

                <div className="flex gap-1 items-center">
                    <button type="button" className="p-2 hover:bg-black/40 rounded-md cursor-pointer">
                        <Heart size={isMobile ? 16 : 24} />

                    </button>
                    <button type="button" className="p-2 hover:bg-black/40 rounded-md cursor-pointer">
                        <ShoppingCart size={isMobile ? 16 : 24} />
                    </button>
                </div>

                <button type="button">
                    <Ellipsis size={16} />
                </button>
            </div>

            {/* Overlay */}
            <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 text-white p-3 md:p-6 flex-col justify-between cursor-pointer" onClick={() => openProductView(productId)}>

                {/* Top */}
                <div className="flex items-center justify-between">
                    {/* Preço no canto superior esquerdo */}
                    {price && (
                        <span className="text-base md:text-xl font-bold rounded">{price}$</span>
                    )}

                    {/* Ícones no canto superior direito */}
                    <div className="flex gap-2 sm:gap-4 md:gap-6">
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 hover:bg-black/40 rounded-md cursor-pointer"
                        >
                            <Heart size={isMobile ? 16 : 24} />

                        </button>
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 hover:bg-black/40 rounded-md cursor-pointer"
                        >
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
