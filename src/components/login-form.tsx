"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth"
import { useState } from "react";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Formato de e-mail inválido"),

    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const { login, loading, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginSchema) => {
        login(data);
    }

    const router = useRouter();

    return (
        <div className="space-y-8 w-[90%] sm:w-[80%] text-online-secundary">

            <div className="flex justify-center items-center">
                <Image src={"/logo-onlineStore (2).svg"} width={64} height={64} alt="logo" className="w-50 text-center" />
            </div>

            <div>
                <h1 className="text-xl font-semibold text-center">Welcome back</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" method="POST">
                <div className="space-y-2">
                    <label htmlFor="" className="font-medium">E-mail</label>
                    <Input type="email" {...register("email")} className="px-2" />
                    {errors.email?.message && <span className="text-sm text-red-400">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="" className="font-medium">Password</label>
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

                <Button className="bg-online-primary text-white w-full" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Login"}</Button>
            </form>

            <div className="flex items-center justify-center">
                <Link href={"/register"} className="text-sm text-center">Don't have an account? <span className="text-online-primary">Sign up</span></Link>
            </div>
        </div>
    );
}
