"use client"

import { useEffect } from "react";
import { useProductStore } from "@/hooks/use-product-store";
import { useParams } from "next/navigation";
import { Card } from "@/components/cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
    const { category } = useParams();
    const { products, filterByCategory, isLoading, error } = useProductStore();

    useEffect(() => {
        if (category) {
            filterByCategory(category as string);
        }
    }, [category, filterByCategory]);

    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col gap-4 p-2 md:p-4">
                <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
                    {Array.from({ length: 8 }).map((_, index) => {
                        const heights = ['h-56', 'h-64', 'h-80'];
                        return <Skeleton
                            key={index}
                            className={`w-full ${heights[index % 3]} animate-pulse`}
                        />
                    })}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-2 md:p-4">
            {
                products.length > 0 ? (
                    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {products.map((item) => (
                            <Card
                                key={item.id}
                                src={item.imageUrl}
                                alt={item.name}
                                name={item.name}
                                price={item.price}
                                productId={item.id}
                                slug={item.slug}
                                className="mb-4"
                            />
                        ))}
                    </div>
                ) : (
                    <span className="text-center">Nenhum produto encontrado</span>
                )
            }
        </div>
    )

}
