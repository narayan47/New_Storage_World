import express from "express";
const router = express.Router();
import User from "../model/User.js";

router.get("/now", async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // verify token (should return decoded data)
        const decoded = await User.verifyRefreshToken(token);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // remove refresh token from DB
        await User.updateOne(
            { _id: decoded._id },
            { $pull: { refreshToken: { token: token } } }
        );

        // clear cookies
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.set("Cache-Control", "no-store");

        res.status(200).json({ message: "Logged out successfully" });

    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

export default router;