import { Router } from "express";
import authenticateToken from "../utils/auth_token.js";
import { addNewBlogController,getAllBlogsController,getBlogByIdController,updateBlogController,deleteBlogController } from "../controller/blogController.js";
import upload from "../utils/image_handler.js";
const blogRouter = Router();

blogRouter.use(authenticateToken);
blogRouter.get('/getAllBlog' , getAllBlogsController);
blogRouter.get('/getBlogById/:id' , getBlogByIdController);
blogRouter.post('/addBlog', upload.single('banner_img') , addNewBlogController);
blogRouter.put('/updateBlog/:id', upload.single('banner_img') , updateBlogController);
blogRouter.delete('/delete/:id' , deleteBlogController);

export default blogRouter;