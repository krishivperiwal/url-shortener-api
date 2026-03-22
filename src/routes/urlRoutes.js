const express = require("express");
const { handlegenerateNewShortURL, handlegetanalytics } = require("../controllers/urlController");

const router = express.Router();

router.post("/", handlegenerateNewShortURL);
router.get("/analytics/:shortId", handlegetanalytics);

module.exports = router;
