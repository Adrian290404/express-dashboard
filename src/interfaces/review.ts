export interface Review {
    order_id: number;
    date: string;
    customer_id: number;
    rating: number;
    review: string;
    action: "pending" | "approved" | "rejected";
}