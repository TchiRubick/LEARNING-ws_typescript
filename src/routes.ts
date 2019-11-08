import { Application, NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import Description from "./component/description/description.Controller";
import { IRetour } from "./interface/IfRetour";

export const register = (app: Application) => {
    app.use("/media", express.static(path.join(__dirname, "assets/pdp")));

    app.get("/description", (req: Request, res: Response) => {
        new Description(req, res).index();
    });

    app.post("/description/set", (req: Request, res: Response) => {
        new Description(req, res).setDescription();
    });

    app.get("/description/get", (req: Request, res: Response) => {
        new Description(req, res).getDescription();
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
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
