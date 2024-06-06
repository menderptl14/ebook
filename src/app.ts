import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";

const app =express()
app.use(express.json());


app.get('/', (req,res,next) => {
    res.json({
        'message':'Hello Angel'
    })
})

app.use("/api/users" ,userRouter)

// globalErrorHandler
app.use(globalErrorHandler)

export default app;



