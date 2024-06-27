import express from "express";
import { createTour,updateTour,getSingleTour,deleteTour,getAllTour,getTourBySearch,getFeaturedTour, getTourCount } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create new tour
router.post('/',verifyAdmin,createTour)
//update tour
router.put('/:id',verifyAdmin,updateTour)
//get single tour
router.get('/:id',getSingleTour)
//get single tour
router.get('/',getAllTour)
//delete tour
router.delete('/:id',verifyAdmin,deleteTour)
//search tour
router.get('/search/getTourBySearch',getTourBySearch)
//featured tour
router.get('/search/getFeaturedTours',getFeaturedTour)
//tour count
router.get('/search/getTourCount',getTourCount)

export default router;