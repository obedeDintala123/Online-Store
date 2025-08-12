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
  filterByCategory: (category: string) => void;
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
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
    set({ search: value, products: filtered });
  },

  setProducts: (p: Product[]) => set({ products: p }),

filterByCategory: async (category: string) => {
  set({ isLoading: true, error: null });
  try {
    if (!category) {
      await get().fetchProducts();
      return;
    }

    const data = await apiRequest(`products/category/${category}`, "GET");
    set({ products: data });
  } catch (err: any) {
    set({ error: err?.message ?? "Erro ao filtrar produtos" });
  } finally {
    set({ isLoading: false });
  }
},


}));
