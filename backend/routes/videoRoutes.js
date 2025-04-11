import { Router } from "express";
import { allVideos, createVideo, first5Videos } from "../controllers/videoController.js";

const router = Router();

router.get("/addVideo", createVideo);
router.get("/allVideos", allVideos);
router.get("/first5videos", first5Videos);

export default router;
