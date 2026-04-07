import User from "../model/User.js";

const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (accessToken) {
      const decoded = User.verifyToken(accessToken);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid access token" });
      }

      req.user = decoded;
      return next();
    }

    const refreshDecoded = User.verifyRefreshToken(refreshToken);
    if (!refreshDecoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(refreshDecoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = user.getAccessToken()
    res.cookie("accessToken", newAccessToken,{
         maxAge: 5 * 60 * 1000
    })
    req.user = user;
    next();

  } catch (err) {
    console.error(err.message,"hello");
    return res.status(500).json({ message: "Authentication error" });
  }
};

export default authenticate;
