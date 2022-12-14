import joi from "joi";
import { IAuthType } from "../types/authType";

const signSchema = joi.object<IAuthType>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});

export default signSchema;