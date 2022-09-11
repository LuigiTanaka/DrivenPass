import { wifis } from "@prisma/client";

export type IWifiType = Omit<wifis, "id" | "userId">;
export type IWifiCreateType = Omit<wifis, "id">;