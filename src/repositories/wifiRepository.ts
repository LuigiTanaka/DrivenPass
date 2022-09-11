import prisma from "../databases/database";

import { IWifiCreateType } from "../types/wifiType";

export async function insert(wifiData: IWifiCreateType) {
    await prisma.wifis.create({ data: wifiData });
}

export async function getWifis(userId: number) {
    const wifis = await prisma.wifis.findMany({ where: { userId } });
    return wifis;
}

export async function getWifiById(wifiId: number) {
    const wifi = await prisma.wifis.findUnique({ where: { id: wifiId } });
    return wifi;
}

export async function deleteWifi(wifiId: number) {
    await prisma.wifis.delete({ where: { id: wifiId } });
}