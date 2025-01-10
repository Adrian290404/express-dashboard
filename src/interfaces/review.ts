export interface Review {
    order_id: number;
    date: string;
    customer: string;
    rating: number;
    review: string;
    action: "pending" | "approved" | "rejected";
}