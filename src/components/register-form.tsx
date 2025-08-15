"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirmation password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const { register: registerUser, loading, error } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: RegisterSchema) => {
        registerUser(data);
    }

    return (
        <div className="space-y-8 w-[90%] sm:w-[80%] text-online-secundary">

            <div className="flex justify-center items-center">
                <Image src={"/logo-onlineStore (2).svg"} width={64} height={64} alt="logo" className="w-50 text-center" />
            </div>

            <div>
                <h1 className="text-xl font-semibold text-center">Create your account</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" method="POST">
                <div className="space-y-2">
                    <label className="font-medium">Name</label>
                    <Input type="text" {...register("name")} className="px-2" />
                    {errors.name?.message && <span className="text-sm text-red-400">{errors.name.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="font-medium">E-mail</label>
                    <Input type="email" {...register("email")} className="px-2" />
                    {errors.email?.message && <span className="text-sm text-red-400">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="font-medium">Password</label>
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} {...register("password")} className="px-2" />
                        {
                            showPassword ? (
                                <Eye size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)} />
                            ) : (
                                <EyeOff size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)} />
                            )
                        }
                    </div>
                    {errors.password?.message && <span className="text-sm text-red-400">{errors.password.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="font-medium">Confirm Password</label>
                    <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} className="px-2" />
                        {
                            showConfirmPassword ? (
                                <Eye size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            ) : (
                                <EyeOff size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            )
                        }
                    </div>
                    {errors.confirmPassword?.message && <span className="text-sm text-red-400">{errors.confirmPassword.message}</span>}
                </div>

                <Button className="bg-online-primary text-white w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : "Register"}
                </Button>
            </form>

            <div className="flex items-center justify-center">
                <Link href={"/login"} className="text-sm text-center">
                    Already have an account? <span className="text-online-primary">Sign in</span>
                </Link>
            </div>
        </div>
    );
}