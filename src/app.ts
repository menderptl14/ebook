import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app =express()

app.get('/', (req,res,next) => {
    res.json({
        'message':'Hello Angel'
    })
})

// globalErrorHandler
app.use(globalErrorHandler)

export default app;


