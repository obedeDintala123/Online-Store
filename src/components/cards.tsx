"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Heart, ShoppingCart, Ellipsis } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Share2, Download } from "lucide-react"
import { Separator } from "./ui/separator"

interface CardProps {
    name: string
    src: string
    alt: string
    slug?: string
    price?: string
    description?: string
    category?: string
    className?: string
    productId: number
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

    const isMobile = useIsMobile()
    const router = useRouter()
    const [liked, setLiked] = useState(false);
    const [inCart, setInCart] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const openProductView = (id: number) => {
        router.push(`/products/${slug}-${id}`)
    }


    const likeProduct = (id: number) => {
        const currentLikes: number[] = JSON.parse(localStorage.getItem("likedProducts") || "[]");

        let updatedLikes;
        if (currentLikes.includes(id)) {
            // Remove o like
            updatedLikes = currentLikes.filter(pid => pid !== id);
            setLiked(false);
        } else {
            // Adiciona o like
            updatedLikes = [...currentLikes, id];
            setLiked(true);
        }

        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    };

    // Ao montar o componente, verifica se já está curtido
    useEffect(() => {
        const currentLikes: number[] = JSON.parse(localStorage.getItem("likedProducts") || "[]");
        setLiked(currentLikes.includes(productId));
    }, [productId]);

    // ---- NOVO: função de download confiável
    const handleDownload = async () => {
        try {
            // Usa a URL otimizada do Next (same-origin) se existir
            const optimizedSrc =
                imgRef.current?.currentSrc || imgRef.current?.src || src

            const res = await fetch(optimizedSrc)
            if (!res.ok) throw new Error("Falha ao obter a imagem")

            const contentType = res.headers.get("content-type") || "application/octet-stream"
            const buf = await res.arrayBuffer()
            const blob = new Blob([buf], { type: contentType })

            // Extensão a partir do content-type
            const ext =
                contentType.includes("png") ? "png" :
                    contentType.includes("jpeg") ? "jpg" :
                        contentType.includes("jpg") ? "jpg" :
                            contentType.includes("webp") ? "webp" :
                                contentType.includes("avif") ? "avif" : "img"

            const fileName =
                `${name.trim().toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "imagem"}.${ext}`

            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error(err)
            alert("Não foi possível baixar a imagem.")
        }
    }

    return (
        <div className={cn(
            "relative group m-0 p-0 break-inside-avoid overflow-hidden",
            className
        )}>

            <div className="relative">
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover rounded-md select-none"
                    priority
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => openProductView(productId)}
                />

                <Button className="flex items-center justify-center absolute bottom-2 right-2 rounded-full w-9 h-9 bg-black/40 cursor-pointer" onClick={() => likeProduct(productId)}
                >
                    <Heart
                        size={isMobile ? 16 : 24}
                        fill={liked ? "white" : "transparent"}
                    />
                </Button>
            </div>

            <div className="p-0 py-2 md:p-2 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base">
                        {name.length <= 20
                            ? `${name.split(" ")[0]}...`
                            : name.split(" ").slice(0, 2).join(" ")}
                    </span>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Ellipsis className="text-online-secundary" size={isMobile ? 16 : 20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-44 p-2">
                            <div className="flex flex-col gap-2">
                                <button
                                    className="text-sm flex items-center gap-2 p-1 hover:bg-gray-100 rounded"
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: name,
                                                text: `Confira este produto: ${name}`,
                                                url: window.location.href
                                            }).catch(() => { })
                                        } else {
                                            alert("Compartilhamento não suportado neste navegador.")
                                        }
                                    }}
                                >
                                    <Share2 size={16} /> Compartilhar
                                </button>

                                <Separator />

                                <button
                                    className="text-sm flex items-center gap-2 p-1 hover:bg-gray-100 rounded"
                                    onClick={handleDownload}
                                >
                                    <Download size={16} /> Baixar
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    {price && (
                        <span className="text-base md:text-xl font-bold rounded">{price}$</span>
                    )}
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    <Button className="bg-online-primary cursor-pointer text-white col-span-2 md:col-span-5 text-xs md:text-sm" >Buy Now</Button>
                    <Button className="border cursor-pointer border-online-secundary col-span-1">
                        <ShoppingCart className="text-online-secundary" size={isMobile ? 16 : 24} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
