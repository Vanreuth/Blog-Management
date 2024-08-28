import pool from '../db/dbConnect.js';
import generateToken from '../utils/generate_token.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

export const userRegisterController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const saltRounds = parseInt(process.env.ROUND_NUMBER) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        if (username && email && hashedPassword) {
            const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
            const insertValue = [username, email, hashedPassword];

            await pool.query(sql, insertValue);

            const token = generateToken({ username });

            res.status(200).json({
                message: 'Register Success',
                token: token
            });
        } else {
            res.status(403).json({
                message: 'All Fields Must Not Be Empty'
            });
        }
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        pool.query(sql, [email], async (error, rows) => {
            if (error) return res.status(500).json({ message: 'Something went wrong' });

            if (rows.length > 0) {
                const user = rows[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (isPasswordValid) {
                    const username = user.username;
                    const token = generateToken({ username });

                    res.status(200).json({
                        message: 'Login Success',
                        token: token
                    });
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
            } else {
                res.status(401).json({ message: 'User Not Found' });
            }
        });
    } else {
        res.status(401).json({ message: 'All Fields Must Not Be Empty' });
    }
};
