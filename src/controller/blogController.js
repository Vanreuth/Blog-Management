import pool from "../db/dbConnect.js";

export const addNewBlogController = (req, res) => {
    const { title, category, type, description } = req.body;
    const bannerImage = req.file ? req.file.filename : null;
    const username = req.user.username;

    if (!title || !category || !type || !description) {
        return res.status(400).json({ message: "All fields must be provided" });
    }

    // Query to get user id from username
    pool.query(`SELECT id FROM users WHERE username = ?`, [username], (error, rows) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Failed to fetch user id" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = rows[0].id;

        const sql = `
            INSERT INTO blogs 
            (title, category, type, description, banner_image, created_at, user_id)
            VALUES (?, ?, ?, ?, ?, NOW(), ?)
        `;
        const values = [title, category, type, description, bannerImage, userId];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ message: "Failed to add blog" });
            }
            res.status(201).json({ message: "Blog added successfully", blogId: result.insertId });
        });
    });
};

export const getAllBlogsController = (req, res) => {
    const sql = "SELECT id, title, category, type, description, banner_image, created_at, user_id FROM blogs";

    pool.query(sql, (error, results) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Failed to retrieve blogs" });
        }
        res.status(200).json({ message: "Blogs retrieved successfully", data: results });
    });
};
export const getBlogByIdController = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT id, title, category, type, description, banner_image, created_at, user_id FROM blogs WHERE id = ?";
    
    pool.query(sql, [id], (error, results) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Failed to retrieve blog" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog retrieved successfully", data: results[0] });
    });
};
export const updateBlogController = (req, res) => {
    const { id } = req.params;
    const { title, category, type, description } = req.body;
    const bannerImage = req.file ? req.file.filename : null;

    const sql = `
        UPDATE blogs 
        SET title = ?, category = ?, type = ?, description = ?, banner_image = ? 
        WHERE id = ?
    `;
    const values = [title, category, type, description, bannerImage, id];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Failed to update blog" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully" });
    });
};
export const deleteBlogController = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM blogs WHERE id = ?";

    pool.query(sql, [id], (error, result) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ message: "Failed to delete blog" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    });
};

