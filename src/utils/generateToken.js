import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured. Add it to your .env file.");
  }

  return jwt.sign(
    { id: user._id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
};

export default generateToken;
