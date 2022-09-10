import { secureNotes } from "@prisma/client";

export type ISecureNotesType = Omit<secureNotes, "id" | "userId">;
export type ISecureNotesCreateType = Omit<secureNotes, "id">;