import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = async (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return user;
  } catch (error) {
    return null;
  }
};

const protect = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.redirect("/login");
  }

  const user = await verifyToken(token);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

const attachUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  const user = await verifyToken(token);
  req.user = user;
  next();
};

const protectApi = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = await verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = user;
  next();
};

export { protect, attachUser, protectApi };

