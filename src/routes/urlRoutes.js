import express from "express";
import { generateShortUrl, getUrlAnalytics } from "../controllers/urlController.js";

const router = express.Router();

router.post("/", generateShortUrl);
router.get("/analytics/:shortId", getUrlAnalytics);

export default router;
