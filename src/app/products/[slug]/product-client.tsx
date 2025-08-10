"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { Heart, MoveLeft, ShoppingCart } from "lucide-react";

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
    const router = useRouter();

    const size = [
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" },
        { label: "M", value: "M" },
        { label: "S", value: "S" }
    ];

    const colour = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-black"];

    useEffect(() => {
        const fetchProduct = async () => {
            console.time("product-fetch");
            try {
                const data = await apiRequest(`products/${productId}`, "GET");
                setProduct(data);
            } catch (err) {
                console.error("Erro ao carregar produto", err);
            } finally {
                console.timeEnd("product-fetch");
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
        <section className="container mx-auto p-4 md:p-8 space-y-4">

            <Button
                type="button"
                className="flex items-center gap-3 text-black cursor-pointer"
                onClick={() => router.push("/")}
            >
                <MoveLeft size={20} />
                <span>Back</span>
            </Button>

            <div className="w-full flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] max-w-4xl w-full rounded-lg bg-white">
                    {/* Lado esquerdo - Imagem */}
                    <div>
                        {imageLoading && (
                            <Skeleton className="w-full h-[500px] rounded-r-md animate-pulse bg-gray-300" />
                        )}
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={400}
                            height={400}
                            className={`w-full h-[500px] transition-opacity rounded-l-md duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                            onLoad={() => setImageLoading(false)}
                            priority
                        />
                    </div>


                    <div className="flex flex-col justify-between p-6 border rounded-r-md">

                        <div className="flex flex-col gap-3">
                            <span className="md:text-3xl font-semibold">{product.name}</span>
                            <p className="text-sm text-gray-400">{product.description}</p>
                        </div>


                        <div className="flex flex-col gap-2 mt-4">
                            <span className="md:text-base font-semibold">Size</span>
                            <div className="space-x-5">
                                {size.map((item, index) => (
                                    <Button
                                        className="text-online-secundary w-12 h-12 border rounded-full border-online-secundary cursor-pointer"
                                        type="button"
                                        key={index}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* cores */}
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="md:text-base font-semibold">Colour</span>
                            <div className="flex items-center space-x-5">
                                {colour.map((color, index) => (
                                    <Button type="button" key={index} className={`${color} w-10 h-10 rounded-full cursor-pointer`}></Button>
                                ))}
                            </div>
                        </div>

                        {/* preço */}
                        <div className="flex items-center justify-between mt-4">
                            <span className="md:text-base font-semibold">Price</span>
                            <span className="md:text-xl">{product.price}$</span>
                        </div>

                        {/* botões */}
                        <div className="w-full flex items-center space-x-2 mt-4">
                            <Button className="w-[90%] bg-online-primary text-white cursor-pointer">
                                Add to cart
                            </Button>
                            <Button size="lg" variant="outline" className="cursor-pointer">
                                <Heart />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 relative">
                    {imageLoading && (
                        <Skeleton className="w-full h-[600px] rounded-lg animate-pulse bg-gray-300" />
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
            </div> */}
        </section>
    );
}
