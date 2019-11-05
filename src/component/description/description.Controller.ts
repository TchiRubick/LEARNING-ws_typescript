import { Request, Response } from "express";
import { Core } from "../../controllers/core";
import { IRetour } from "../../interface/IfRetour";
import DescriptionService from "./description.service";
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

    public async index(): Promise<Response> {
        super.log("Description => index() > " + this.request.params.user);

        /**
         * -------------------------------------
         * Partie de traitement via microservice
         * -------------------------------------
         */
        const service = new DescriptionService();

        // service.startNode();

        // const t = await service.getList();

        // service.stopNode();
        // -------------------------------------

        this.retour = {
            code: 0,
            error: false,
            message: "",
            status: 200,
            success: true,
            zdetails: {ok: "ok"}
        };

        return this.response.json(this.retour);
    }
}

export default Description;
