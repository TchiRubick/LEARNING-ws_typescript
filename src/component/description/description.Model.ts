import "reflect-metadata";
import { getConnection, getConnectionManager } from "typeorm";
import { Model } from "../../model/core.Model";
import { Descriptionentity } from "./description.Entity";

class Descriptionmodel extends Model {

    private conn: any;
    private debut: number;
    private fin: number;
    private duree: number;
    private dbname: string;

    constructor() {
        super();
        this.dbname = "Descriptionentity";
    }

    // Test connexion availability
    public async testConnexion(): Promise<void> {
        await this.connection();
        this.deconnection("testConnexion");
    }

    public async createNewDescription(values: object) {
        await this.connection();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(this.dbname)
            .values([values])
            .execute()
            .catch((err: any) => console.log(err));

        this.deconnection("createNewDescription");
    }

    public async getDescriptionByUser(user: string) {
        await this.connection();

        const result = await this.conn
            .getRepository(Descriptionentity)
            .createQueryBuilder("description")
            .where("description.user = :user", { user })
            .getOne()
            .catch((err: any) => {
                console.log(err);
                return false;
            });

        this.deconnection("getDescriptionByUser");

        return result;
    }

    // Connect to the database with entity
    private async connection(): Promise<void> {
        await super.connect(Descriptionentity);
        this.getConnection();
        this.debut = new Date().getTime();
    }

    // Disconnect to database, with the default connexion
    private deconnection(methode: string): void {
        this.conn.close();
        this.fin = new Date().getTime();
        this.duree = this.fin - this.debut;
        console.log("Descriptionmodel => " + methode + " FIN " + " | Time " + this.duree + "ms");
    }

    // Get the default connexion
    private getConnection(): void {
        this.conn = getConnectionManager().get("default");
    }

}

export default Descriptionmodel;
