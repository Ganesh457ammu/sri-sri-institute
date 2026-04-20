import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enquiry {
    id: bigint;
    city: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    course: string;
}
export interface backendInterface {
    getEnquiries(): Promise<Array<Enquiry>>;
    getEnquiryCount(): Promise<bigint>;
    submitEnquiry(name: string, phone: string, email: string, course: string, city: string, message: string): Promise<bigint>;
}
