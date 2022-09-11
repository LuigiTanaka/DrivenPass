import { Request, Response } from 'express';
import * as cardService from "../services/cardService";

export async function createCard(req: Request, res: Response) {
    const { title, number, cardholderName, securityCode, expirationDate, password, isVirtual, type } = req.body;
    const { userId } = res.locals;

    await cardService.createCard(userId, title, number, cardholderName, securityCode, expirationDate, password, isVirtual, type);

    res.status(201).send("card successfully created!");
}

export async function getCards(req: Request, res: Response) {
    const { userId } = res.locals;

    const cards = await cardService.getCards(userId);

    res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { cardId } = req.params;

    const card = await cardService.getCardById(userId, Number(cardId));

    res.status(200).send(card);
}

export async function deleteCardById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { cardId } = req.params;

    await cardService.deleteCardById(userId, Number(cardId));

    res.status(200).send("card successfully deleted!");
}