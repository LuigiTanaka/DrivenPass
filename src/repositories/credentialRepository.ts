import prisma from "../databases/database";

import { ICredentialCreateType } from "../types/credentialType";

export async function insert(credentialData: ICredentialCreateType) {
    await prisma.credentials.create({ data: credentialData });
}

export async function getCredentials(userId: number) {
    const credentials = await prisma.credentials.findMany({ where: { userId } });
    return credentials;
}

export async function getCredentialById(credentialId: number) {
    const credential = await prisma.credentials.findUnique({ where: { id: credentialId } });
    return credential;
}

export async function getCredentialsByTitle(title: string) {
    const credentials = await prisma.credentials.findMany({ where: { title } });
    return credentials;
}

export async function deleteCredential(credentialId: number) {
    await prisma.credentials.delete({ where: { id: credentialId } });
}