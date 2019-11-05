import { Application, NextFunction, Request, Response } from "express";
import Description from "./component/description/description.Controller";
import { IRetour } from "./interface/IfRetour";

export const register = (app: Application) => {
    app.get("/description/:user", (req: Request, res: Response) => {
        new Description(req, res).index();
    });

    app.use((req: Request, res: Response, next: NextFunction) => {
        const error: IRetour = {
            code: 1,
            error: true,
            message: "Bad request",
            status: 404,
            success: false,
            zdetails: {}
        };

        res.status(404).json(error);
    });
};
