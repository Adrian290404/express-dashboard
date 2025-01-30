import { Review } from "../interfaces/review";
import ReviewModel from "../models/reviewModel";

export const fetchAllReviews = async () => {
    return await ReviewModel.find();
}

export const fetchReviewById = async (order_id: number) => {
    return await ReviewModel.findOne({ order_id });
}

export const addReview = async (newReview: Review) => {
    const { order_id, date, user_id, rating, review, action } = newReview;
    if (!order_id || !date || !user_id || !rating || !review || !action) {
        throw new Error('All fields are required');
    }
    if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
    }
    if (!['pending', 'approved', 'rejected'].includes(action)) {
        throw new Error('Action must be one of "pending", "approved", or "rejected"');
    }
    const existingReview = await ReviewModel.findOne({ order_id: newReview.order_id });
    if (existingReview) {
        throw new Error(`Review with order_id ${newReview.order_id} already exists`);
    }
    const newReviewInstance = new ReviewModel(newReview);
    await newReviewInstance.save();

    return newReviewInstance;
};


export const editReview = async (order_id: number, updatedReview: Review) => {
    return await ReviewModel.findOneAndUpdate({order_id}, updatedReview, { new: true });
};

export const removeReview = async (order_id: number) => {
    return await ReviewModel.findOneAndDelete({order_id});
}