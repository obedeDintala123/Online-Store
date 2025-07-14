"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductDetailsProps {
    id: number;
    name: string;
    description?: string;
    imageUrl: string;
    category: string;
    price: string;
    quantity: number;
}

export default function ProductClient({ productId }: { productId: string }) {
    const [product, setProduct] = useState<ProductDetailsProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiRequest(`/products/${productId}`, "GET");
                setProduct(data);
            } catch (err) {
                console.error("Erro ao carregar produto", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Loader />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center mt-10">Produto não encontrado.</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative">
                    {imageLoading && (
                        <Skeleton className="w-full h-[600px] rounded-lg" />
                    )}
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className={`w-full h-auto object-cover rounded-lg shadow-lg transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"
                            }`}
                        onLoad={() => setImageLoading(false)}
                        priority
                    />
                </div>

                <div className="md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.description || "Sem descrição disponível."}</p>
                    <span className="text-3xl font-bold text-online-primary">{product.price}$</span>
                    <div className="flex gap-4 mt-4">
                        <Button size="lg" className="flex-1">
                            <ShoppingCart className="mr-2" /> Adicionar ao Carrinho
                        </Button>
                        <Button size="lg" variant="outline">
                            <Heart />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
