import { Review } from "../interfaces/review";
import ReviewModel from "../models/reviewModel";

export const fetchAllReviews = async () => {
    return await ReviewModel.find();
}

export const fetchReviewById = async (id: number) => {
    return await ReviewModel.findById(id);
}

export const addReview = async (newReview: Review) => {
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
    const newReviewInstance = new ReviewModel(newReview);
    await newReviewInstance.save();

    return newReviewInstance;
};


export const editReview = async (id: number, updatedReview: Review) => {
    return await ReviewModel.findByIdAndUpdate(id, updatedReview, { new: true });
};

export const removeReview = async (id: number) => {
    return await ReviewModel.findByIdAndDelete(id);
}