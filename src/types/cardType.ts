import { cards } from "@prisma/client";

export type ICardType = Omit<cards, "id" | "userId">;
export type ICardCreateType = Omit<cards, "id">;