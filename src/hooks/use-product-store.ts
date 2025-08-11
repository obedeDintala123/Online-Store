import { create } from "zustand"; 
import { apiRequest } from "@/lib/api";
import { Product } from "@/app/products/page"; 

type State = {
  allProducts: Product[];
  products: Product[];
  search: string;
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  setSearch: (value: string) => void;
  setProducts: (p: Product[]) => void;
};

export const useProductStore = create<State>((set, get) => ({
  allProducts: [],
  products: [],
  search: "",
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiRequest("products", "GET");
      set({ allProducts: data, products: data });
    } catch (err: any) {
      set({ error: err?.message ?? "Erro ao buscar produtos" });
    } finally {
      set({ isLoading: false });
    }
  },
  setSearch: (value: string) => {
    const term = value.trim().toLowerCase();
    const { allProducts } = get();
    if (!term) {
      set({ search: value, products: allProducts });
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(term) || p.slug.toLocaleLowerCase().includes(term)
    );
    set({ search: value, products: filtered });
  },
  setProducts: (p: Product[]) => set({ products: p }),
}));
