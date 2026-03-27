import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import URL from "./models/URL.js";
import { protect, attachUser } from "./middlewares/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const APP_PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${APP_PORT}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.locals.baseUrl = BASE_URL;

app.use("/url", protect, urlRoutes);
app.use("/user", authRoutes);
app.use("/", attachUser, pageRoutes);

app.get("/url/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $inc: {
                    clicks: 1
                },
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Redirect route error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $inc: {
                    clicks: 1
                },
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Short route error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default app;
