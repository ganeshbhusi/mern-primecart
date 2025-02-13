import { toaster } from "@/components/ui/toaster";
import { CartProduct, Product } from "@/types/products";
import axios from "axios";
import { StoreApi, UseBoundStore, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthStore } from "./auth";

interface UserProductStore {
  products: Product[];
  getProducts: () => void;
  setProducts: (products: Product[]) => void;
  createProduct: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  deleteProduct: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  cartProducts: CartProduct[];
  addToCart: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  isProductInCart: (id: string) => boolean;
  getCartProductsCount: () => number;
  getCartProductsPrice: () => number;
  increaseCartProductQuantity: (id: string) => void;
  decreaseCartProductQuantity: (id: string, fullClean?: boolean) => void;
  clearCart: () => void;
  createOrderPayment: ({ price }: { price: number }) => Promise<{
    success: boolean;
    data: any;
    message?: string;
  }>;
  createOrderSuccess: ({ data }: { data: any }) => Promise<{
    success: boolean;
    message: string;
    data: any;
  }>;
}

export const useProductStore: UseBoundStore<StoreApi<UserProductStore>> =
  create(
    persist(
      (set, get) => ({
        products: [],
        getProducts: async () => {
          toaster.create({
            title: "Loading products...",
            description: "Please wait...",
            type: "loading",
          });
          const res = await axios.post("/api/products/getProducts");
          toaster.dismiss();
          set(() => ({ products: [...res?.data?.data] }));
        },
        setProducts: (products: Product[]) => set({ products }),
        createProduct: async (product: Product) => {
          if (!useAuthStore.getState().isLoggedIn) {
            return { success: false, message: "You are not logged in" };
          }
          if (!product.name || !product.price || !product.quantity) {
            return { success: false, message: "All fields are required!" };
          }
          const res = await axios.post("/api/products", product, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          set((state: UserProductStore) => ({
            products: [...state.products, res?.data?.data],
          }));
          return { success: true, message: "Product added succesfully!" };
        },
        deleteProduct: async (product: Product) => {
          if (!useAuthStore.getState().isLoggedIn) {
            return { success: false, message: "You are not logged in" };
          }
          if (!product._id) {
            return { success: false, message: "ID is missing" };
          }
          const res = await axios.delete(`/api/products/${product._id}`);
          if (!res.data.status) {
            return { success: false, message: "Error deleting product!" };
          }
          set((state: UserProductStore) => ({
            products: state.products.filter((item) => item._id !== product._id),
          }));
          return { success: true, message: "Product deleted succesfully!" };
        },
        updateProduct: async (product: Product) => {
          if (!useAuthStore.getState().isLoggedIn) {
            return { success: false, message: "You are not logged in" };
          }
          const res = await axios.put(
            `/api/products/${product._id}`,
            { price: product.price, quantity: product.quantity },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!res.status) {
            return { success: false, message: "Error updating product!" };
          }
          set((state: UserProductStore) => ({
            products: state.products.map((item) =>
              item._id === product._id ? res.data?.message : item
            ),
          }));
          return {
            success: res.data?.status,
            message: "Product updated succesfully!",
          };
        },
        cartProducts: [],
        addToCart: async (item: Product) => {
          set((state: UserProductStore) => {
            let existingProducts = state.cartProducts;
            let existingProductIdx = existingProducts.findIndex(
              (prd) => prd._id === item._id
            );
            if (existingProductIdx !== -1) {
              existingProducts[existingProductIdx].count += 1;
            } else {
              existingProducts.push({ ...item, count: 1 });
            }
            return { cartProducts: [...existingProducts] };
          });
          return { success: true, message: "Added to cart!" };
        },
        isProductInCart: (id: string) => {
          const cartData = get().cartProducts;
          const idx = cartData.findIndex((item) => item._id === id);
          return idx >= 0;
        },
        getCartProductsCount: () => {
          const cartData = get().cartProducts;
          return cartData.reduce((acc, item) => acc + item.count, 0);
        },
        getCartProductsPrice: () => {
          const cartData = get().cartProducts;
          return cartData.reduce(
            (acc, item) => acc + +item.price * item.count,
            0
          );
        },
        increaseCartProductQuantity: (id: string) => {
          const cartData = get().cartProducts;
          const idx = cartData.findIndex((item) => item._id === id);
          if (idx > -1) {
            cartData[idx].count += 1;
          }
          set({ cartProducts: [...cartData] });
        },
        decreaseCartProductQuantity: (id: string, fullClean?: boolean) => {
          const cartData = get().cartProducts;
          if (fullClean) {
            const newData = cartData.filter((item) => item._id !== id);
            set({ cartProducts: [...newData] });
          } else {
            const idx = cartData.findIndex((item) => item._id === id);
            if (idx > -1 && cartData[idx].count > 1) {
              cartData[idx].count -= 1;
            }
            set({ cartProducts: [...cartData] });
          }
        },
        clearCart: () => {
          set({ cartProducts: [] });
        },
        createOrderPayment: async (product: { price: number }) => {
          if (!product.price) {
            return { success: false, message: "Price is missing", data: {} };
          }
          const res = await axios.post(`/api/products/payment`, {
            price: product.price,
          });
          if (!res.data.success) {
            return { success: false, message: "Error", data: {} };
          }
          return res.data;
        },
        createOrderSuccess: async (data) => {
          const res = await axios.post(`/api/products/payment/success`, {
            data,
          });
          return res.data;
        },
      }),
      {
        name: "mern-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ cartProducts: state.cartProducts }),
      }
    )
  );
