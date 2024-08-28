import pool from "../db/dbConnect.js";



export const getAuthenticatedUserController = (req, res) => {
    const authenticatedUsername = req.user.username;

    if (!authenticatedUsername) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sql = `SELECT id, username, email, profile_img, created_at FROM users WHERE username = ?`;

    pool.query(sql, [authenticatedUsername], (error, rows) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Something went wrong" });
        }

        if (rows.length > 0) {
            res.status(200).json({
                message: "Get User Success",
                data: rows[0]
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
};

export const editProfileController = (req, res) => {
    const username = req.user.username;
    const fileName = req.file ? req.file.filename : null;

    if (!username) return res.status(401).json({ message: 'Unauthorized' });
    if (!fileName) return res.status(400).json({ message: 'No file uploaded' });

    const sql = `UPDATE users SET profile_img = ? WHERE username = ?`;
    const updatedValue = [fileName, username];

    pool.query(sql, updatedValue, (error, result) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: 'Something went wrong' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Update Success' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};