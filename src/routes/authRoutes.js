import { Router } from "express";
import upload from "../utils/image_handler.js";
import { userRegisterController,userLoginController} from "../controller/authController.js";
import authenticateToken from "../utils/auth_token.js";
const authRouter = Router();

authRouter.post('/register' , upload.single('file') , userRegisterController);
authRouter.post('/login', userLoginController);

// authRouter.get('/protected', authenticateToken, (req, res) => {
//     res.json({
//         message: 'This is a protected route',
//         user: req.user
//     });
// });

export default authRouter;