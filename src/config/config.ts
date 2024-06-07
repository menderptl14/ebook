import {config as conf } from "dotenv"
conf()

const _config = {
    port : process.env.PORT ,
    databaseUrl: process.env.MONGO_URL,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_SECRET,
    api_secret:process.env.CLOUDINARY_API_SECRET,
}

export const config = Object.freeze(_config);
