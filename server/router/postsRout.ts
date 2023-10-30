const router = require("express").Router();
import { getAllPosts, newPost, updatePostUsers, deletePost } from "../controllers/postController";
import { authorizationAdmin, authorizationUser } from "../middleWare/authorization";
import { upload } from "../middleWare/multerStorage";

router
  .post("/newPost", authorizationAdmin, upload.single("image"), newPost)
  .get("/getAllPosts",  getAllPosts)
  // .get("/getPost", authorizationAdmin, getPost)
  .put("/updateUsersEvent", authorizationUser, updatePostUsers)
  .put("/deletePost", authorizationUser, deletePost);

module.exports = router;
