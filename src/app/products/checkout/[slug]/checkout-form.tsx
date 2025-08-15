"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/app/products/page";
import { apiRequest } from "@/lib/api";
import { Loader } from "../../../../components/loader";

const checkoutSchema = z.object({
    productName: z.string(),
    productPrice: z.number(),
    paymentType: z.enum(["credit", "debit", "paypal"]),
    cardNumber: z.string().min(16, "Invalid card number").optional(),
    cardName: z.string().min(3, "Invalid name").optional(),
    cardExpiry: z.string().min(5, "Invalid date").optional(),
    cardCvv: z.string().min(3, "Invalid CVV").optional(),
    address: z.string().min(5, "Invalid address"),
    state: z.string().min(2, "Invalid state"),
    zipCode: z.string().min(5, "Invalid ZIP code"),
});

type checkoutSchema = z.infer<typeof checkoutSchema>;

export const CheckOutForm = ({ productId }: { productId: string }) => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentType: "credit",
        },
    });

    const paymentType = watch("paymentType");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiRequest(`products/${productId}`);
                setProduct(data);
            } catch (err) {
                console.error("Erro ao buscar produto:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);


    const onSubmit = (data: checkoutSchema) => {
        console.log("Order:", data);
        alert("Order placed successfully!");
    };

    if (loading) {
        return (
            <div className="min-h-[100dvh] w-full flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found.</p>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Details */}
            <div className="md:col-span-3 border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={product.name}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Price</label>
                        <input
                            type="text"
                            value={`$${product.price}`}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>


            {/* Payment Method */}
            <div className="md:col-span-3">
                <label className="block font-medium mb-1">Payment Method</label>
                <select
                    {...register("paymentType")}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>

            {/* Card Details */}
            {(paymentType === "credit" || paymentType === "debit") && (
                <>
                    <div>
                        <label className="block font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            {...register("cardNumber")}
                            placeholder="1234 5678 9012 3456"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Name on Card</label>
                        <input
                            type="text"
                            {...register("cardName")}
                            placeholder="John Doe"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.cardName && (
                            <p className="text-red-500 text-sm">{errors.cardName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Expiration Date</label>
                        <input
                            type="text"
                            {...register("cardExpiry")}
                            placeholder="MM/YY"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.cardExpiry && (
                            <p className="text-red-500 text-sm">{errors.cardExpiry.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">CVV</label>
                        <input
                            type="password"
                            {...register("cardCvv")}
                            placeholder="123"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.cardCvv && (
                            <p className="text-red-500 text-sm">{errors.cardCvv.message}</p>
                        )}
                    </div>
                </>
            )}

            {/* Shipping Address */}
            <div className="md:col-span-3">
                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                        <label className="block font-medium mb-1">Street Address</label>
                        <input
                            type="text"
                            {...register("address")}
                            placeholder="123 Main St"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">State</label>
                        <input
                            type="text"
                            {...register("state")}
                            placeholder="CA"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">ZIP Code</label>
                        <input
                            type="text"
                            {...register("zipCode")}
                            placeholder="90210"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
                <button
                    type="submit"
                    className="w-full bg-online-primary text-white py-2 rounded hover:bg-online-primary/90"
                >
                    Place Order
                </button>
            </div>
        </form>

    );
};
