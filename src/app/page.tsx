"use client"

import { Card } from "@/components/cards"
import { Loader } from "@/components/loader";
import { SidebarInset } from "@/components/ui/sidebar"
import { apiRequest } from "@/lib/api";
import { useEffect, useState } from "react";

interface ProductsProps {
  name: string;
  description?: string;
  imageUrl: string;
  category: string;
  price: string;   // ou number, dependendo do tratamento no backend
  quantity: number;
}

export default function Home() {

  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = () => {
      apiRequest("/products", "GET")
        .then((data) => setProducts(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }

    fetchProducts();

    const interval = setInterval(fetchProducts, 3000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center w-full">
            <Loader />
          </div>
        ) : (
          <div className="w-full">
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-2 md:p-4">
                <div className="columns-2 sm:columns-2 md:columns-3 gap-2 space-x-0 space-y-2 md:space-x-2 md:space-y-4">
                  {
                    products.length > 0 ? (
                      products.map((item, index) => (
                        <div key={index} className="flex justify-center items-start">
                          <Card
                            src={item.imageUrl}
                            alt={item.description ?? item.name}
                            name={item.name}
                            price={item.price}
                          />
                        </div>
                      ))
                    ) : (
                      <span>No products found</span>
                    )
                  }
                </div>
              </div >
            </SidebarInset >
          </div >
        )
      }

    </>
  )
}
