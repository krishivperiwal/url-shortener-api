import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../utils/sessionStore.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("signup", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const sessionId = uuidv4();
    setUser(sessionId, newUser);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", { error: "An error occurred during signup" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "An error occurred during login" });
  }
};

export { registerUser, loginUser };
