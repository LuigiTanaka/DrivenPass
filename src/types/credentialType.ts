import { credentials } from "@prisma/client"

export type ICredentialType = Omit<credentials, "id" | "userId">;
export type ICredentialCreateType = Omit<credentials, "id">;