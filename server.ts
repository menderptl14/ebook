import app from "./src/app"

import { log } from "console";

const startServer = () => {
    const PORT = process.env.PORT || 3000

    app.listen(PORT , ()=> {
        console.log(`Server is running at port number ${PORT}`);
    } )
}

startServer()


console.log('server is start');
