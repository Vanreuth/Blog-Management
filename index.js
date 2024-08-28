import { config } from 'dotenv';
import express from 'express';
import pool from "./src/db/dbConnect.js"
import authRouter from "./src/routes/authRoutes.js"
config();
const app = express();
const port = process.env.PORT || 3500;
pool.getConnection((error,connection) => {
    if(error) return console.log(`Failed Connect Database`);
    console.log(`Success Connect Database`);
    connection.release();
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('public',express.static('uploads'));

app.use('/api/auth/',authRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
