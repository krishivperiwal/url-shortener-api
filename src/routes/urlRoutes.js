import express from "express";
import { generateShortUrl, getUrlAnalytics } from "../controllers/urlController.js";
import { generateShortUrlApi, getUrlAnalyticsApi, getUserUrlsApi } from "../controllers/urlController.js";
import { protect, protectApi } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", generateShortUrl);
router.get("/analytics/:shortId", getUrlAnalytics);

router.get("/api/urls", protectApi, getUserUrlsApi);
router.post("/api/shorten", protectApi, generateShortUrlApi);
router.get("/api/analytics/:shortId", protectApi, getUrlAnalyticsApi);

export default router;