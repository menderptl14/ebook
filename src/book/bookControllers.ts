import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary"
import path from "node:path";

const createBook = async (req: Request, res: Response, next: NextFunction) => {

    const { title, genre, description } = req.body;
    const files = req.files as {[fieldname:string] : Express.Multer.File[]}

    const coverImageMineType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
        __dirname,
         '../../public/data/upload',
         fileName
        )

   
          const uploadResult = await cloudinary.uploader.upload(filePath,{
              filename_override:fileName,
              folder:"book-covers",
              format:coverImageMineType,
          })
          

        const bookFileName = files.file[0].filename
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/upload",
            bookFileName
        )

        try {
            const bookFileUpload = await cloudinary.uploader.upload(
                bookFilePath,
                {
                resource_type:'raw',
                filename_override: bookFileName,
                folder:"book-pdf",
                format:"pdf",
                }
            )
    
            console.log("Bookfileuploadresult", uploadResult);
            console.log("bookFileUpload",bookFileUpload);
            
        }
         catch (error) {
            return res.status(404).json({
                success:false,
                error:console.log(error)
            })
            
        }
   
    // console.log(req.files);
    // res.json({})

    }

export {createBook}
