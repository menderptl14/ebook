import {Response,NextFunction,Request} from 'express'
import createHttpError from "http-errors"
import userModel from './userModel'
import bcrypt from "bcrypt"
import {sign} from "jsonwebtoken"
import { User } from './userTypes'
import { config } from "../config/config";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
   
       const { name, email, password } = req.body;
  
        // validation
        if (!name || !email || !password) {
            const error = createHttpError(400,"Fields are required")
            return next(error)
        }

        const user = await userModel.findOne({email})

        // database call
       try {
         if (user) {
             const error = createHttpError(
                 400,
                 "User already exists with this email."
               );
               return next(error);
         }
       } catch (error) {
         return next(createHttpError(500, "Error while getting user"));     
       }

    //    password hash
    const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user."));
  }

  try {
    // Token generation JWT
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    // Response
    res.status(201).json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};

const loginPage = async(req: Request, res: Response, next: NextFunction) => {
    
  const {email,password} = req.body

  if (!email || !password) {
    const error = createHttpError(400,"Fields are required")
    return next(error)
  }

  const user = await userModel.findOne({email})
  if (!user) {
    return next(createHttpError(400,"User not exits"))
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if (!isMatch) {
    return next(createHttpError(400,"User not exits"))
  }

  // todo: handle errors
  // Create accesstoken
  const token = sign({ sub: user._id }, config.jwtSecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });

  res.json({ accessToken: token });
};


export {createUser,loginPage}


