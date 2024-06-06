import { config } from "./config/config";
import app from "./src/app"

const startServer = () => {
    const PORT = config.port || 3000

    app.listen(PORT , ()=> {
        console.log(`Server is running at port number ${PORT}`);
    } )
}

startServer()

console.log('server is start');

