import prisma from "../databases/database";
import { IAuthType } from "../types/authTypes";

export async function getUserByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
}

export async function insert(userData: IAuthType) {
    await prisma.users.create({ data: userData });
}