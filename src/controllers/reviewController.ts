import { Request, Response } from "express";
import { fetchAllReviews, fetchReviewById, editReview, removeReview, addReview } from "../services/reviewService";

export const getAllReviews = (req: Request, res: Response) => {
    const reviews = fetchAllReviews();
    res.status(200).json(reviews);
};

export const getReview = (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const review = fetchReviewById(reviewId);
    if (!review) {
        res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(review);
};

export const createReview = (req: Request, res: Response) => {
    const newReview = req.body;
    const updatedReview = addReview(newReview);
    res.status(201).json(updatedReview);
};

export const updateReview = (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const reviewUpdates = req.body;
    const updatedReviews = editReview(reviewId, reviewUpdates);
    res.status(200).json(updatedReviews);
};

export const deleteReview = (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const updatedReviews = removeReview(reviewId);
    res.status(200).json(updatedReviews);
};