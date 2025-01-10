import { Booking } from "../interfaces/booking";

export const bookings: Booking[] = [
    {
        user_id: 12,
        room_id: 8,
        id: 1,
        order_date: "10/30/2020 09:21",
        check_in: "12/01/2020 15:00",
        check_out: "12/05/2020 11:00",
        special_request: "He doesn't like this",
        status: "Refund"
    },
    {
        user_id: 17,
        room_id: 4,
        id: 2,
        order_date: "10/30/2020 09:21",
        check_in: "12/10/2020 14:00",
        check_out: "12/15/2020 10:00",
        special_request: "",
        status: "Booked"
    },
    {
        user_id: 24,
        room_id: 1,
        id: 3,
        order_date: "10/30/2020 09:21",
        check_in: "12/20/2020 16:00",
        check_out: "12/25/2020 12:00",
        special_request: "has two little daughters",
        status: "Pending"
    },
    {
        user_id: 7,
        room_id: 3,
        id: 4,
        order_date: "10/30/2020 09:21",
        check_in: "12/05/2020 14:30",
        check_out: "12/09/2020 10:30",
        special_request: "",
        status: "Cancelled"
    },
    {
        user_id: 16,
        room_id: 9,
        id: 5,
        order_date: "10/30/2020 09:21",
        check_in: "12/15/2020 13:00",
        check_out: "12/20/2020 11:00",
        special_request: "Has reduced vision",
        status: "Pending"
    },
    {
        user_id: 19,
        room_id: 2,
        id: 6,
        order_date: "10/30/2020 09:21",
        check_in: "12/08/2020 15:30",
        check_out: "12/12/2020 11:30",
        special_request: "",
        status: "Booked"
    },
    {
        user_id: 4,
        room_id: 6,
        id: 7,
        order_date: "10/30/2020 09:21",
        check_in: "12/18/2020 14:00",
        check_out: "12/22/2020 12:00",
        special_request: "",
        status: "Cancelled"
    },
    {
        user_id: 11,
        room_id: 10,
        id: 8,
        order_date: "10/30/2020 09:21",
        check_in: "12/03/2020 14:00",
        check_out: "12/07/2020 11:00",
        special_request: "",
        status: "Refund"
    },
    {
        user_id: 26,
        room_id: 7,
        id: 9,
        order_date: "10/30/2020 09:21",
        check_in: "12/09/2020 15:00",
        check_out: "12/13/2020 11:00",
        special_request: "very demanding client",
        status: "Pending"
    },
    {
        user_id: 3,
        room_id: 5,
        id: 10,
        order_date: "10/30/2020 09:21",
        check_in: "12/16/2020 14:00",
        check_out: "12/20/2020 10:00",
        special_request: "",
        status: "Refund"
    }
];
