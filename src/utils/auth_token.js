import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.user = user;
        next();
    });
};

export default authenticateToken;
