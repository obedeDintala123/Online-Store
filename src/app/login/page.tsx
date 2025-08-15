"use client"

import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LoginPage() {

    return (
        <div className="min-h-screen grid md:grid-cols-3">
            {/* Coluna da imagem */}
            <div className="relative hidden md:block md:col-span-2 h-screen">
                <Image
                    src={"/online-image4.jpg"}
                    alt="login-image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Coluna do formulário */}
            <div className="flex items-center justify-center p-2 md:p-6 w-full">
                <LoginForm />
            </div>
        </div>
    );
}
