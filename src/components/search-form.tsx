import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";

interface SearchFormProps extends React.ComponentPropsWithoutRef<"form"> {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
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
                className="px-8 py-6 pr-16 rounded-full bg-online-terciary w-full"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-online-terciary w-12 h-12 rounded-full border border-[#d9d9d9] cursor-pointer perspective-1000"
            >
                <Search ref={iconRef} size={24} color="#757575" style={{ transformStyle: "preserve-3d" }} />
            </Button>
        </form>
    );
};
