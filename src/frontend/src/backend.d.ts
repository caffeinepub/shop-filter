import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    rating: number;
    price: number;
}
export interface backendInterface {
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Array<Product>>;
    getProductsByRating(minRating: number): Promise<Array<Product>>;
}
