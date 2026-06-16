import URL from "../models/url.js";
import shortid from "shortid";

const generateShortUrl = async (req, res) => {
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
        createdBy: req.user._id
    });

    return res.redirect("/?id=" + shortId);
};

const getUrlAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    const uniqueDays = new Set(
        result.visitHistory.map(visit => new Date(visit.timestamp).toLocaleDateString())
    ).size;

    return res.render("analytics", {
        shortId: result.shortId,
        redirectUrl: result.redirectUrl,
        totalClicks: result.clicks ?? result.visitHistory.length,
        uniqueDays: Math.max(1, uniqueDays),
        analytics: result.visitHistory
    });
};
const getUserUrlsApi = async (req, res) => {
  try {
    const urls = await URL.find({ createdBy: req.user._id }).sort("-createdAt");
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch URLs" });
  }
};

const generateShortUrlApi = async (req, res) => {
  const originalUrl = (req.body.originalUrl || "").trim();

  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    new globalThis.URL(originalUrl);
  } catch {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  const shortId = shortid();

  await URL.create({
    shortId,
    redirectUrl: originalUrl,
    clicks: 0,
    visitHistory: [],
    createdBy: req.user._id
  });

  return res.status(201).json({ shortId, shortUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/${shortId}` });
};

const getUrlAnalyticsApi = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId, createdBy: req.user._id });

    if (!result) {
      return res.status(404).json({ message: "URL not found" });
    }

    const uniqueDays = new Set(
      result.visitHistory.map(v => new Date(v.timestamp).toLocaleDateString())
    ).size;

    return res.status(200).json({
      shortId: result.shortId,
      redirectUrl: result.redirectUrl,
      totalClicks: result.clicks ?? result.visitHistory.length,
      uniqueDays: Math.max(1, uniqueDays),
      visitHistory: result.visitHistory
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

export { generateShortUrl, getUrlAnalytics, getUserUrlsApi, generateShortUrlApi, getUrlAnalyticsApi };

