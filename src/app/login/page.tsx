import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-3">
            {/* Coluna da imagem */}
            <div className="relative hidden sm:block sm:col-span-2 h-screen">
                <Image
                    src="/login-img.jpg"
                    alt="login-image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Coluna do formulário */}
            <div className="flex items-center justify-center p-6">
                <LoginForm />
            </div>
        </div>

    );
}
