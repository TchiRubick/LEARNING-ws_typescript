import bodyParser from "body-parser";
import express from "express";
import config from "./config/constants";
import * as routes from "./routes";

export default () => {
    const app = express();
    const port = process.env.PORT || config.server.port;

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(bodyParser.json());

    routes.register(app);

    app.listen(port, () => {
        console.log(`server started at http://localhost:${ port }`);
    });
};
