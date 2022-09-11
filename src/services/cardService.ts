import * as cardRepository from "../repositories/cardRepository";
import { ICardCreateType } from "../types/cardType";
import { cardType } from "@prisma/client";

import Cryptr from "cryptr";

export async function createCard(userId: number, title: string, number: string, cardholderName: string, securityCode: string, expirationDate: string, password: string, isVirtual: string, type: cardType) {
    //verifica se o usuário já não possui cartão com o mesmo titulo
    const cards = await cardRepository.getCardsByTitle(title);
    cards.forEach(card => {
        if (card.userId === userId) {
            throw { type: "conflict", message: "the user already has a card with this title" }
        }
    });

    //criptografa senha e cvc
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    const encryptedPassword = cryptr.encrypt(password);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);

    //transforma string em booleano
    let boolean = false;
    if(isVirtual === "true") {
        boolean = true;
    }

    const cardData: ICardCreateType = { userId, number, title, cardholderName, securityCode: encryptedSecurityCode, expirationDate, password: encryptedPassword, isVirtual: boolean, type };

    await cardRepository.insert(cardData);
}

export async function getCards(userId: number) {
    const cards = await cardRepository.getCards(userId);

    //descriptografa senha e cvc
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    cards.forEach(card => {
        card.password = cryptr.decrypt(card.password);
        card.securityCode = cryptr.decrypt(card.securityCode);
    });

    return cards;
}

export async function getCardById(userId: number, cardId: number) {
    const card = await cardRepository.getCardById(cardId);

    //verifica se cartão existe
    if (!card) {
        throw { type: "not_found", message: "card not found" }
    }

    //verifica se cartão pertence ao usuário
    if (card.userId !== userId) {
        throw { type: "unauthorized", message: "this card doesn't belong to the user" }
    }

    //descriptografa senha e cvc
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    card.password = cryptr.decrypt(card.password);
    card.securityCode = cryptr.decrypt(card.securityCode);

    return card;
}

export async function deleteCardById(userId: number, cardId: number) {
    const card = await cardRepository.getCardById(cardId);

    //verifica se cartão existe
    if (!card) {
        throw { type: "not_found", message: "card not found" }
    }

    //verifica se cartão pertence ao usuário
    if (card.userId !== userId) {
        throw { type: "unauthorized", message: "this card doesn't belong to the user" }
    }

    await cardRepository.deleteCard(cardId);
}