import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME || "1h",  // Defaults to 1 hour if not set
    });
};

export default generateToken;
