import { Request, Response } from "express";
import * as wifiService from "../services/wifiService";

export async function createWifi(req: Request, res: Response) {
    const { title, name, password } = req.body;
    const { userId } = res.locals;

    await wifiService.createWifi(userId, title, name, password);

    res.status(201).send("wifi successfully created!");
}

export async function getWifis(req: Request, res: Response) {
    const { userId } = res.locals;

    const wifis = await wifiService.getWifis(userId);

    res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { wifiId } = req.params;

    const wifi = await wifiService.getWifiById(userId, Number(wifiId));

    res.status(200).send(wifi);
}

export async function deleteWifiById(req: Request, res: Response) {
    const { userId } = res.locals;
    const { wifiId } = req.params;

    await wifiService.deleteWifiById(userId, Number(wifiId));

    res.status(200).send("wifi successfully deleted!");
}