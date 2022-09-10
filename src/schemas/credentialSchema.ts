import joi from "joi";
import { ICredentialType } from "../types/credentialType";

const credentialSchema = joi.object<ICredentialType>({
    username: joi.string().required(),
    title: joi.string().required(),
    url: joi.string().required(),
    password: joi.string().required()
});

export default credentialSchema;