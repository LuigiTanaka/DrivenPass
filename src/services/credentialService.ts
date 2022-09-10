import * as credentialRepository from "../repositories/credentialRepository";
import { ICredentialCreateType } from "../types/credentialType";

import Cryptr from "cryptr";

export async function createCredential(userId: number, username: string, title: string, url: string, password: string) {
    //verifica se o usuário já não possui credencial com o mesmo titulo
    const credentials = await credentialRepository.getCredentialsByTitle(title);
    credentials.forEach(credential => {
        if (credential.userId === userId) {
            throw { type: "conflict", message: "the user already has a credential with this title" }
        }
    });

    //criptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    const encryptedPassword = cryptr.encrypt(password);

    const credentialData: ICredentialCreateType = { userId, username, title, url, password: encryptedPassword };

    await credentialRepository.insert(credentialData);
}

export async function getCredentials(userId: number) {
    const credentials = await credentialRepository.getCredentials(userId);

    //descriptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    credentials.forEach(credential => {
        credential.password = cryptr.decrypt(credential.password)
    });

    return credentials;
}

export async function getCredentialById(userId: number, credentialId: number) {
    const credential = await credentialRepository.getCredentialById(credentialId);

    //verifica se credencial existe
    if (!credential) {
        throw { type: "not_found", message: "credential not found" }
    }

    //verifica se credencial pertence ao usuário
    if (credential.userId !== userId) {
        throw { type: "unauthorized", message: "this credential doesn't belong to the user" }
    }

    //descriptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    credential.password = cryptr.decrypt(credential.password)

    return credential;
}

export async function deleteCredentialById(userId: number, credentialId: number) {
    const credential = await credentialRepository.getCredentialById(credentialId);

    //verifica se credencial existe
    if (!credential) {
        throw { type: "not_found", message: "credential not found" }
    }

    //verifica se credencial pertence ao usuário
    if (credential.userId !== userId) {
        throw { type: "unauthorized", message: "this credential doesn't belong to the user" }
    }

    await credentialRepository.deleteCredential(credentialId);
}