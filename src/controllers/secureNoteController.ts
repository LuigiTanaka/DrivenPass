import { Request, Response } from 'express';
import * as secureNoteService from "../services/secureNoteService";

export async function createSecureNote(req: Request, res: Response) {
    const { title, note } = req.body;
    const { userId } = res.locals;

    await secureNoteService.createSecureNote(userId, title, note);

    res.status(201).send("secure note successfully created!");
}

export async function getSecureNotes(req: Request, res: Response) {
    const { userId } = res.locals;

    const secureNotes = await secureNoteService.getSecureNotes(userId);

    res.status(200).send(secureNotes);
}

export async function getSecureNoteById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { secureNoteId } = req.params;

    const secureNote = await secureNoteService.getSecureNoteById(userId, Number(secureNoteId));

    res.status(200).send(secureNote);
}

export async function deleteSecureNoteById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { secureNoteId } = req.params;

    await secureNoteService.deleteSecureNoteById(userId, Number(secureNoteId));

    res.status(200).send("secure note successfully deleted!");
}