import path from "node:path";
import express from "express"
import{ createBook }from "./bookControllers"
import multer from "multer";

const bookRouter = express.Router()

// file store local
const upload = multer({
    dest:path.resolve(__dirname, "../../public/data/upload"),
    limits:{fileSize:3e7} // 30mb 
})
 
bookRouter.post("/", upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1},
  ])
    ,createBook
   )

export default bookRouter;   