import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function signUp(req: Request, res: Response) {
    const { email, password, username, pictureUrl } = req.body;

    try {
        const existingUser = await getUserByEmail(email);

        if(existingUser.rowCount > 0) {
            return res.status(409).send("email já cadastrado"); //conflit
        }

        await createUser(email, password, username, pictureUrl);

        res.status(201).send("usuário cadastrado com sucesso!"); //created
    } catch (error) {
        res.status(500).send(error.message); //server error
    }
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const { rows: dbUserArray } = await getUserByEmail(email);

        if(dbUserArray.length === 0) {
            return res.status(401).send("email ou senha incorretos"); //unauthorized
        }

        const dbUser = dbUserArray[0];

        const correctPassword = bcrypt.compareSync(password, dbUser.password);

        if(!correctPassword) {
            return res.status(401).send("email ou senha incorretos"); //unauthorized
        }

        const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET);

        delete dbUser.password;

        res.status(200).send({ userData: { ...dbUser }, token }); 
    } catch (error) {
        res.status(500).send(error.message); //server error
    }
}