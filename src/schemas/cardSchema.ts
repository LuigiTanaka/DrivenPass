import joi from "joi";
import { ICardType } from "../types/cardType";

const cardSchema = joi.object<ICardType>({
    number: joi.string().pattern(/^[0-9]{16}$/).required(),
    title: joi.string().required(),
    cardholderName: joi.string().required(),
    securityCode: joi.string().pattern(/^[0-9]{3}$/).required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid("credit", "debit", "both").required()
});

export default cardSchema;