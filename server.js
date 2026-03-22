require("dotenv").config();

const app = require("./src/app");
const { connectToMongoDB } = require("./src/config/db");

const PORT = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/short-url";

connectToMongoDB(mongoURL)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log("server started at PORT:", PORT));
    })
    .catch((err) => {
        console.error("Failed to start server:", err);
    });
