import express from "express";
const router = express.Router()
import { updateUser,getAllUser,getSingleUser,deleteUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//update User
router.put('/:id',verifyUser,updateUser)
//get single User
router.get('/:id',verifyUser,getSingleUser)
//get User
router.get('/',verifyAdmin,getAllUser)
//delete User
router.delete('/:id',verifyUser,deleteUser)

export default router