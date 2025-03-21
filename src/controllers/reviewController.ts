import { Request, Response } from "express";
import { fetchAllReviews, fetchReviewById, fetchRandomReviews, addReview, updateReviewStatus } from "../services/reviewService";

interface ReviewParams {
    id: string;
}

interface UpdateReviewBody {
    action: string;
}

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await fetchAllReviews();
        res.status(200).json(reviews);
    } 
    catch (error) {
        res.status(500).json({ error: "Error fetching reviews" });
    }
};

export const getReview = async ( req: Request<ReviewParams>, res: Response ): Promise<void> => {
    try {
        const { id } = req.params;
        const reviewId = Number(id);
        const review = await fetchReviewById(reviewId);
        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.status(200).json(review);
    } 
    catch (error) {
        res.status(500).json({ error: "Error fetching review" });
    }
};

export const getRandomReviews = async (req: Request, res: Response) => {
    try {
        const randomReviews = await fetchRandomReviews();
        res.status(200).json(randomReviews);
    } 
    catch (error) {
        res.status(500).json({ error: "Error fetching reviews" });
    }
};

export const createReview = async (req: Request, res: Response) => {
    try {
        const newReview = req.body;
        const createdReview = await addReview(newReview);
        res.status(201).json(createdReview);
    } 
    catch (error) {
        res.status(400).json({ error: "Error creating review" });
    }
};

export const updateReviewAction = async ( req: Request<ReviewParams, any, UpdateReviewBody>, res: Response ): Promise<void> => {
    try {
        const { id } = req.params;
        const reviewId = Number(id);
        const { action } = req.body;
        const updatedReview = await updateReviewStatus(reviewId, action);
        if (!updatedReview) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.status(200).json(updatedReview);
    } 
    catch (error) {
        res.status(400).json({ error: "Error updating review" });
    }
}