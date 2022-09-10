import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import secureNoteSchema from "../schemas/secureNoteSchema";
import { createSecureNote, getSecureNotes, getSecureNoteById, deleteSecureNoteById } from "../controllers/secureNoteController";

const secureNoteRouter = Router();

secureNoteRouter.post("/secure-notes", validateSchema(secureNoteSchema), createSecureNote);
secureNoteRouter.get("/secure-notes", getSecureNotes);
secureNoteRouter.get("/secure-notes/:secureNoteId", getSecureNoteById);
secureNoteRouter.delete("/secure-notes/:secureNoteId", deleteSecureNoteById);

export default secureNoteRouter;