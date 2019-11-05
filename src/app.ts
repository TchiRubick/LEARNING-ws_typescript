import dotenv from "dotenv";
import express from "express";
import { ServiceBroker } from "moleculer";
import * as routes from "./routes";

dotenv.config();

export default () => {

    const app = express();
    const port = process.env.SERVER_PORT;

    routes.register(app);

    app.listen(port, () => {
        console.log(`server started at http://localhost:${ port }`);
    });

    const broker = new ServiceBroker({
        logLevel: "debug",
        namespace: "app",
        nodeID: "node-app",
        requestTimeout: 5 * 1000,
        transporter: "nats://localhost:4222"
    });

    broker.start();
};
