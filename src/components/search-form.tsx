import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";

interface SearchFormProps extends React.ComponentPropsWithoutRef<"form"> {
    search: string;
    setSearch: (value: string) => void;
}

export const SearchForm = ({ search, setSearch, className, ...props }: SearchFormProps) => {
    const iconRef = useRef<SVGSVGElement>(null);

    const handleClick = () => {
        if (iconRef.current) {
            gsap.fromTo(
                iconRef.current,
                { rotateY: 0 },
                {
                    rotateY: 180,
                    duration: 0.5,
                    ease: "power2.inOut",
                    yoyo: true,
                    repeat: 1,
                    transformOrigin: "center center",
                }
            );
        }
    };

    return (
        <form
            className={cn("relative flex items-center w-full", className)} {...props}
            onSubmit={(e) => e.preventDefault()}
        >
            <Input
                placeholder="Search in OnlineStore"
                className="px-4 md:px-8 md:py-6 md:pr-16 rounded-full bg-online-terciary w-full placeholder:text-sm md:placeholder:text-base"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                id="search"
                onClick={handleClick}
            />

            <Button
                type="button"
                aria-label="Search"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-online-terciary 
                w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d9d9d9] cursor-pointer perspective-1000"
            >
                <Search ref={iconRef} size={24} color="#757575" style={{ transformStyle: "preserve-3d" }} />
            </Button>
        </form>
    );
};
