import joi from "joi";
import { IWifiType } from "../types/wifiType";

const wifiSchema = joi.object<IWifiType>({
    title: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required()
});

export default wifiSchema;