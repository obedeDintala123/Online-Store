import { RegisterForm } from "@/components/register-form";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid md:grid-cols-3">
            {/* Image column */}
            <div className="relative hidden md:block md:col-span-2 h-screen">
                <Image
                    src="/online-image1.jpeg"
                    alt="register-image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Form column */}
            <div className="flex items-center justify-center p-2 md:p-6 w-full">
                <RegisterForm />
            </div>
        </div>
    );
}