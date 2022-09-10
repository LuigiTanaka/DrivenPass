import * as secureNotesRepository from "../repositories/secureNoteRepository";
import { ISecureNotesCreateType } from "../types/secureNoteType";

export async function createSecureNote(userId: number, title: string, note: string) {
    //verifica se o usuário já não possui nota segura com o mesmo titulo
    const secureNotes = await secureNotesRepository.getSecureNotesByTitle(title);
    secureNotes.forEach(secureNote => {
        if (secureNote.userId === userId) {
            throw { type: "conflict", message: "the user already has a note with this title" }
        }
    });

    const secureNoteData: ISecureNotesCreateType = { userId, title, note};

    await secureNotesRepository.insert(secureNoteData);
}

export async function getSecureNotes(userId: number) {
    const secureNotes = await secureNotesRepository.getSecureNotes(userId);
    return secureNotes;
}

export async function getSecureNoteById(userId: number, secureNoteId: number) {
    const secureNote = await secureNotesRepository.getSecureNoteById(secureNoteId);

    //verifica se nota segura existe
    if (!secureNote) {
        throw { type: "not_found", message: "note not found" }
    }

    //verifica se nota segura pertence ao usuário
    if (secureNote.userId !== userId) {
        throw { type: "unauthorized", message: "this note doesn't belong to the user" }
    }

    return secureNote;
}

export async function deleteSecureNoteById(userId: number, secureNoteId: number) {
    const secureNote = await secureNotesRepository.getSecureNoteById(secureNoteId);

    //verifica se nota segura existe
    if (!secureNote) {
        throw { type: "not_found", message: "note not found" }
    }

    //verifica se nota segura pertence ao usuário
    if (secureNote.userId !== userId) {
        throw { type: "unauthorized", message: "this note doesn't belong to the user" }
    }

    await secureNotesRepository.deleteSecureNote(secureNoteId);
}