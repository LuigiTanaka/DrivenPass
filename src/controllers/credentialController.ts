import { Request, Response } from 'express';
import * as credentialService from "../services/credentialService";

export async function createCredential(req: Request, res: Response) {
    const { username, title, url, password } = req.body;
    const { userId } = res.locals;

    await credentialService.createCredential(userId, username, title, url, password);

    res.status(201).send("credential successfully created!");
}

export async function getCredentials(req: Request, res: Response) {
    const { userId } = res.locals;

    const credentials = await credentialService.getCredentials(userId);

    res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { credentialId } = req.params;

    const credential = await credentialService.getCredentialById(userId, Number(credentialId));

    res.status(200).send(credential);
}

export async function deleteCredentialById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { credentialId } = req.params;

    await credentialService.deleteCredentialById(userId, Number(credentialId));

    res.status(200).send("credential successfully deleted!");
}