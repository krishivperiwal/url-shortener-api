const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    const allurls = await URL.find({ createdBy: req.user._id }).sort("-createdAt");
    return res.render("home", {
        urls: allurls,
        baseUrl: req.app.locals.baseUrl,
    });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.post("/logout", (req, res) => {
    res.clearCookie("uid");
    return res.redirect("/login");
});

module.exports = router;
