import prisma from "../databases/database";

import { ISecureNotesCreateType } from "../types/secureNoteType";

export async function insert(secureNoteData: ISecureNotesCreateType) {
    await prisma.secureNotes.create({ data: secureNoteData });
}

export async function getSecureNotes(userId: number) {
    const secureNotes = await prisma.secureNotes.findMany({ where: { userId } });
    return secureNotes;
}

export async function getSecureNoteById(secureNoteId: number) {
    const secureNote = await prisma.secureNotes.findUnique({ where: { id: secureNoteId } });
    return secureNote;
}

export async function getSecureNotesByTitle(title: string) {
    const secureNotes = await prisma.secureNotes.findMany({ where: { title } });
    return secureNotes;
}

export async function deleteSecureNote(secureNoteId: number) {
    await prisma.secureNotes.delete({ where: { id: secureNoteId } });
}