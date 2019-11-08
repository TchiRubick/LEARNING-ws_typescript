/**
 * @Controller Description
 * All loogical action for description
 * testConnexion, setDescription, getDescription
 * delDescription, upDescription
 */
import { Request, Response } from "express";
import { Core } from "../../controllers/core";
import { IRetour } from "../../interface/IfRetour";
import Descriptionmodel from "./description.Model";
import Descriptionvalidator from "./description.validator";
import { IDescription } from "./IfDescription.interface";

class Description extends Core {

    public request: Request;
    public response: Response;
    public descriptionUser: IDescription;
    private retour: IRetour;

    constructor(req: Request, res: Response) {
        super();
        this.request = req;
        this.response = res;
    }

    /**
     * Test connexion to database and vérify descriptionentity structure
     * @return Api list for description
     */
    public index(): Response {
        const objDescription = new Descriptionmodel();
        objDescription.testConnexion();

        const result = {
            connexion: "ok",
            listeApi: {
                "GET /description/get?user=[user] HTTP/1.1": {
                    "Content-Type": "",
                    "body": [""],
                    "param": [""],
                    "query": ["user: string"],
                },
                "POST /description/set HTTP/1.1": {
                    "Content-Type": "Content-Type: application/x-www-form-urlencoded",
                    "body": [
                        "description: string",
                        "linkfb: string",
                        "linkgithub: string",
                        "linklinkedin: string",
                        "number: string",
                        "pic: string",
                        "poste: string",
                        "pseudo: string",
                        "user: string",
                        "utilisateur: string"
                    ],
                    "param": [""],
                    "query": [""],
                },
            }
        };

        return this.sendSuccess(result, "index");
    }

    /**
     * Create new description
     */
    public async setDescription(): Promise<Response> {
        const isValid = await this.verifyArgument(); // Verify all argument

        if (isValid.error !== 0) {
            return this.sendError("createDescription", isValid.error, 200, isValid.zdetails.message, isValid.zdetails);
        }

        const objDescription = new Descriptionmodel();
        objDescription.createNewDescription(this.descriptionUser);

        return this.sendSuccess(this.descriptionUser, "createDescription");
    }

    /**
     * Get description by user
     */
    public async getDescription(): Promise<Response> {

        const user = this.request.query.user;

        const validate = new Descriptionvalidator();

        if (!validate.inputStringNotNull(user)) {
            return this.sendError("getDescription", 2, 200, "Empty value user");
        }

        const objDescription = new Descriptionmodel();
        const result = await objDescription.getDescriptionByUser(user);

        if (!result) {
            return this.sendError("getDescription", 3, 200, "Error query");
        }

        return this.sendSuccess(result, "getDescription");
    }

    /**
     * Verify all input by post
     */
    private async verifyArgument(): Promise<any> {
        this.descriptionUser = {
            description : this.request.body.description,
            linkfb : this.request.body.linkfb,
            linkgithub : this.request.body.linkgithub,
            linklinkedin : this.request.body.linklinkedin,
            number : this.request.body.number,
            pic : this.request.body.pic,
            poste : this.request.body.poste,
            pseudo : this.request.body.pseudo,
            user : this.request.body.user,
            utilisateur : this.request.body.utilisateur,
        };

        const validate = new Descriptionvalidator();

        for (const [key, value] of Object.entries(this.descriptionUser)) {
            if (!validate.inputStringNotNull(value)) {
                return {
                    error: 2,
                    zdetails: {
                        message: "Empty value => " + key
                    }
                };
            }
        }

        return {
            error: 0,
        };
    }

    /**
     *
     * @param methode string
     * @param code number
     * @param status number
     * @param message string
     * @param result object
     * Send error to client
     */
    private sendError(methode: string, code: number, status: number, message: string, result: object = {}): Response {
        this.retour = {
            code,
            error: true,
            message,
            status,
            success: false,
            zdetails: result
        };

        super.endProcess("DescriptionController !async => " + methode + "() : error");
        return this.response.json(this.retour);
    }

    /**
     *
     * @param result object
     * @param methode string
     * Send success to client
     */
    private sendSuccess(result: object, methode: string): Response {
        this.retour = {
            code: 0,
            error: false,
            message: "",
            status: 200,
            success: true,
            zdetails: { result }
        };

        super.endProcess("DescriptionController !async => " + methode + "() : success");
        return this.response.json(this.retour);
    }
}

export default Description;
