import { Router } from "express";
import authenticateToken from "../utils/auth_token.js";
import { editProfileController, getAuthenticatedUserController } from "../controller/userController.js";
import upload from "../utils/image_handler.js";
const userRouter = Router();

userRouter.use(authenticateToken);
userRouter.get('/getprofile' , getAuthenticatedUserController);
userRouter.put('/updateprofile', upload.single('profile_img') , editProfileController);



export default userRouter;