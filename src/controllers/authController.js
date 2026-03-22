const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/sessionStore");
const bcrypt = require("bcryptjs");

async function handleUserSignup(req, res) {
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
            password: hashedPassword,
        });

        const sessionID = uuidv4();
        setUser(sessionID, newUser);
        res.cookie("uid", sessionID);

        return res.redirect("/");
    } catch (error) {
        console.error("Signup error:", error);
        return res.render("signup", { error: "An error occurred during signup" });
    }
}

async function handleUserLogin(req, res) {
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

        const sessionID = uuidv4();
        setUser(sessionID, user);
        res.cookie("uid", sessionID);
        return res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        return res.render("login", { error: "An error occurred during login" });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
