import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../types/authTypes";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw { type: "unauthorized", message: "required token" }
    }

    const token = authorization.replace("Bearer ", "");

    const jwtSecret = process.env.JWT_SECRET || "secret";

    const { id } = jwt.verify(token, jwtSecret) as IJwtPayload;

    if (!id) {
        throw { type: "unauthorized", message: "invalid token" }
    }

    res.locals.userId = id;

    next();
}