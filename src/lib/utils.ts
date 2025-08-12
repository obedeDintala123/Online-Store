import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categoryMap: Record<string, string> = {
  "electronics": "Electronics",
  "fashion": "Fashion",
  "home-kitchen": "Home & Kitchen",
  "beauty-health": "Beauty & Health",
  "sports": "Sports",
  "books": "Books"
};
