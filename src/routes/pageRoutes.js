import express from "express";
import URL from "../models/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    const allUrls = await URL.find({ createdBy: req.user._id }).sort("-createdAt");
    return res.render("home", {
        urls: allUrls,
        baseUrl: req.app.locals.baseUrl
    });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.redirect("/login");
});

export default router;
