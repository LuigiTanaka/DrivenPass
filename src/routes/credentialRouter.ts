import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import credentialSchema from "../schemas/credentialSchema";
import { createCredential, getCredentials, getCredentialById, deleteCredentialById } from "../controllers/credentialController";
import { validateToken } from "../middlewares/validateToken";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), createCredential);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credentials/:credentialId", validateToken, getCredentialById);
credentialRouter.delete("/credentials/:credentialId", validateToken, deleteCredentialById);

export default credentialRouter;