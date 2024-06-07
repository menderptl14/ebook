import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter"

const app =express()
app.use(express.json());


app.get('/', (req,res,next) => {
    res.json({
        'message':'Hello Angel'
    })
})

app.use("/api/users" ,userRouter)
app.use("/api/book" ,bookRouter)


// globalErrorHandler
app.use(globalErrorHandler)

export default app;



