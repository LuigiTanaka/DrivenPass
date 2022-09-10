import joi from "joi";
import { ISecureNotesType } from "../types/secureNoteType";

const secureNoteSchema = joi.object<ISecureNotesType>({
    title: joi.string().max(50).required(),
    note: joi.string().max(1000).required()
});

export default secureNoteSchema;