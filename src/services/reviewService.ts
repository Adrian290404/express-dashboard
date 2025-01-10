import { Review } from "../interfaces/review";
import { reviews as reviewsData } from "../data/reviews";

let reviews: Review[] = reviewsData;

export const fetchAllReviews = () => {
    return reviews;
}

export const fetchReviewById = (id: number) => {
    return reviews.find((review) => review.order_id === id);
}

export const addReview = (newReview: Review) => {
    const { order_id, date, customer, rating, review, action } = newReview;
    if (!order_id || !date || !customer || !rating || !review || !action) {
        throw new Error('All fields are required');
    }
    if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
    }
    if (!['pending', 'approved', 'rejected'].includes(action)) {
        throw new Error('Action must be one of "pending", "approved", or "rejected"');
    }
    reviews.push(newReview);
    return reviews;
};


export const editReview = (id: number, updatedReview: Review) => {
    reviews = reviews.map((review) =>
        review.order_id === id ? { ...review, ...updatedReview } : review
    );
    return reviews;
};

export const removeReview = (id: number) => {
    reviews = reviews.filter((review) => review.order_id !== id);
    return reviews;
}