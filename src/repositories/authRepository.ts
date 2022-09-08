import prisma from "../databases/database";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
}

export async function createUser(email, password, username, pictureUrl) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);

    return connection.query(`
        INSERT INTO users 
        (username, email, password, "pictureUrl", "createdAt") 
        VALUES 
        ($1, $2, $3, $4, $5)
    `, [username, email, passwordHash, pictureUrl, now]);
}