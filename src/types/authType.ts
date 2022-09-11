import { users } from "@prisma/client";

export type IAuthType = Omit<users, "id">;

export interface IJwtPayload {
    id: number
}