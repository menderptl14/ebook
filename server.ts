import { config } from "./src/config/config";
import connectDB from "./src/config/db";
import app from "./src/app"

const startServer = async () => {

    await connectDB()

    const PORT = config.port || 3000

    app.listen(PORT , ()=> {
        console.log(`Server is running at port number ${PORT}`);
    } )
}

startServer()

console.log('server is start');

