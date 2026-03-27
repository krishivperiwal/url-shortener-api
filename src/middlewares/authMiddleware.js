import { getUser } from "../utils/sessionStore.js";

const protect = async (req, res, next) => {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/login");
    }

    const user = getUser(userUid);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
};

const attachUser = async (req, res, next) => {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
};

export { protect, attachUser };
