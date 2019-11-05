import cluster from "cluster";
import os from "os";
import app from "./app";

const core = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${ process.pid } started`);
    for (let i = 0; i < core; i++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log("Worker " + worker.process.pid + " is online");
    });

    cluster.on("exit", (worker, code, signal) => {
        console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);
        console.log("Starting a new worker");
        cluster.fork();
    });

} else {
    app();
}
