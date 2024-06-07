import express from "express"
import {createUser,loginPage} from "./userControllers"

const userRouter = express.Router()

userRouter.post("/register" , createUser)
userRouter.post("/login" , loginPage)

export default userRouter;
