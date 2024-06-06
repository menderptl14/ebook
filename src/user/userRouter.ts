import express from "express"
import {createUser} from "./userControllers"

const userRouter = express.Router()

userRouter.post("/register" , createUser
)

export default userRouter;
