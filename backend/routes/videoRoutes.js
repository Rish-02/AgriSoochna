import { Router } from "express";
import { allVideos, createVideo, recommended } from "../controllers/videoController.js";

const router = Router();

router.get("/addVideo", createVideo);
router.get("/allVideos", allVideos);
router.get("/recommended", recommended);

export default router;
