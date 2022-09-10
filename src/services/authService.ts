import * as authRepository from "../repositories/authRepository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signUp(email: string, password: string) {
    const existingUser = await authRepository.getUserByEmail(email);

    if (existingUser) {
        throw { type: "conflict", message: "email already registered" }
    }

    await authRepository.insert(email, password);
}

export async function signIn(email: string, password: string) {
    const existingUser = await authRepository.getUserByEmail(email);

    if (!existingUser) {
        throw { type: "unauthorized", message: "incorrect email or password" }
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.password);

    if (!correctPassword) {
        throw { type: "unauthorized", message: "incorrect email or password" }
    }

    const jwtSecret = process.env.JWT_SECRET || "secret";

    const token = jwt.sign({ id: existingUser.id }, jwtSecret);

    return token;
}