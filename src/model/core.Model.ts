import { createConnection} from "typeorm";
import Config from "../config/constants";

export class Model {
    public db: any;

    private host: string;
    private name: string;
    private pass: string;
    private user: string;
    private port: number;

    constructor() {
        this.setConfig();
    }

    public async connect(entity: any) {
        await createConnection({
            database: this.name,
            entities: [
                entity
            ],
            host: this.host,
            password: this.pass,
            port: this.port,
            synchronize: true,
            type: "mysql",
            username: this.user,
        })
        .then((connection) => console.log("Connected => Model"))
        .catch ((error: any) => console.log(error));
    }

    private setConfig() {
        this.host = Config.database.host;
        this.name = Config.database.name;
        this.pass = Config.database.pass;
        this.user = Config.database.user;
        this.port = +Config.database.port;
    }
}
