import dotenv from "dotenv";

dotenv.config();

export default {
    database: {
        host: process.env.HOSTDB,
        name: process.env.NAMEDB,
        pass: process.env.PASSDB,
        port: process.env.PORTDB,
        typs: process.env.TYPEDB,
        user: process.env.USERDB,
    },
    server: {
        environnement: process.env.NODE_ENV,
        port: process.env.SERVER_PORT
    },
};
