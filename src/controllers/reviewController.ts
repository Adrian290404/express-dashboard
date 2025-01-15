import { Request, Response } from "express";
import { fetchAllReviews, fetchReviewById, editReview, removeReview, addReview } from "../services/reviewService";

export const getAllReviews = async (req: Request, res: Response) => {
    const reviews = await fetchAllReviews();
    res.status(200).json(reviews);
};

export const getReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const review = await fetchReviewById(reviewId);
    if (!review) {
        res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(review);
};

export const createReview = async (req: Request, res: Response) => {
    const newReview = req.body;
    const updatedReview = await addReview(newReview);
    res.status(201).json(updatedReview);
};

export const updateReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const reviewUpdates = req.body;
    const updatedReviews = await editReview(reviewId, reviewUpdates);
    res.status(200).json(updatedReviews);
};

export const deleteReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reviewId = Number(id);
    const updatedReviews = await removeReview(reviewId);
    res.status(200).json(updatedReviews);
};