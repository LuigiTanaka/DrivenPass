import prisma from "../databases/database";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
}

export async function insert(email: string, password: string) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);

    await prisma.users.create({
        data: {
            email,
            password: passwordHash,
        },
    });
}