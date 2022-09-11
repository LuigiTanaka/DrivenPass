import prisma from "../databases/database";

import { ICardCreateType } from "../types/cardType";

export async function insert(cardData: ICardCreateType) {
    await prisma.cards.create({ data: cardData });
}

export async function getCards(userId: number) {
    const cards = await prisma.cards.findMany({ where: { userId } });
    return cards;
}

export async function getCardById(cardId: number) {
    const card = await prisma.cards.findUnique({ where: { id: cardId } });
    return card;
}

export async function getCardsByTitle(title: string) {
    const cards = await prisma.cards.findMany({ where: { title } });
    return cards;
}

export async function deleteCard(cardId: number) {
    await prisma.cards.delete({ where: { id: cardId } });
}