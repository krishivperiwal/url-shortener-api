const URL = require("../models/url");
const shortid = require("shortid");

async function handlegenerateNewShortURL(req, res) {
    const body = req.body;
    const originalUrl = (body.originalUrl || body.url || "").trim();

    if (!originalUrl) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        new globalThis.URL(originalUrl);
    } catch (error) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    const shortId = shortid();
    await URL.create({
        shortId,
        redirectUrl: originalUrl,
        clicks: 0,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.redirect("/?id=" + shortId);
}

async function handlegetanalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    const uniqueDays = new Set(
        result.visitHistory.map((visit) => new Date(visit.timestamp).toLocaleDateString()),
    ).size;

    return res.render("analytics", {
        shortId: result.shortId,
        redirectUrl: result.redirectUrl,
        totalClicks: result.clicks ?? result.visitHistory.length,
        uniqueDays: Math.max(1, uniqueDays),
        analytics: result.visitHistory,
    });
}

module.exports = {
    handlegenerateNewShortURL,
    handlegetanalytics,
};
