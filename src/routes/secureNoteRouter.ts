import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import secureNoteSchema from "../schemas/secureNoteSchema";
import { createSecureNote, getSecureNotes, getSecureNoteById, deleteSecureNoteById } from "../controllers/secureNoteController";
import { validateToken } from "../middlewares/validateToken";

const secureNoteRouter = Router();

secureNoteRouter.post("/secure-notes", validateToken, validateSchema(secureNoteSchema), createSecureNote);
secureNoteRouter.get("/secure-notes", validateToken, getSecureNotes);
secureNoteRouter.get("/secure-notes/:secureNoteId", validateToken, getSecureNoteById);
secureNoteRouter.delete("/secure-notes/:secureNoteId", validateToken, deleteSecureNoteById);

export default secureNoteRouter;