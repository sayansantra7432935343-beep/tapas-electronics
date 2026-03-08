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
    icon: string;
    name: string;
    description: string;
}
export interface BusinessInfo {
    tagline: string;
    name: string;
    contactNumbers: Array<string>;
}
export interface backendInterface {
    addProduct(name: string, description: string, icon: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getBusinessInfo(): Promise<BusinessInfo>;
    removeProduct(name: string): Promise<void>;
}
