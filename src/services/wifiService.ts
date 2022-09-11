import * as wifiRepository from "../repositories/wifiRepository";
import { IWifiCreateType } from "../types/wifiType";

import Cryptr from "cryptr";

export async function createWifi(userId: number, title: string, name: string, password: string) {
    //criptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    const encryptedPassword = cryptr.encrypt(password);

    const wifiData: IWifiCreateType = { userId, title, name, password: encryptedPassword };

    await wifiRepository.insert(wifiData);
}

export async function getWifis(userId: number) {
    const wifis = await wifiRepository.getWifis(userId);

    //descriptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    wifis.forEach(wifi => {
        wifi.password = cryptr.decrypt(wifi.password)
    });

    return wifis;
}

export async function getWifiById(userId: number, wifiId: number) {
    const wifi = await wifiRepository.getWifiById(wifiId);

    //verifica se wifi existe
    if (!wifi) {
        throw { type: "not_found", message: "wifi not found" }
    }

    //verifica se wifi pertence ao usuário
    if (wifi.userId !== userId) {
        throw { type: "unauthorized", message: "this wifi doesn't belong to the user" }
    }

    //descriptografa senha
    const secretKey = process.env.SECRET_KEY || "secret";
    const cryptr = new Cryptr(secretKey);
    wifi.password = cryptr.decrypt(wifi.password)

    return wifi;
}

export async function deleteWifiById(userId: number, wifiId: number) {
    const wifi = await wifiRepository.getWifiById(wifiId);

    //verifica se wifi existe
    if (!wifi) {
        throw { type: "not_found", message: "wifi not found" }
    }

    //verifica se wifi pertence ao usuário
    if (wifi.userId !== userId) {
        throw { type: "unauthorized", message: "this wifi doesn't belong to the user" }
    }

    await wifiRepository.deleteWifi(wifiId);
}