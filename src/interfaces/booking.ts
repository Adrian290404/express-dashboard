export interface Booking {
    id: number;
    user_id: number;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string;
    room_id: number;
    status: string;
}