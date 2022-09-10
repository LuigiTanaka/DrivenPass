import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import credentialSchema from "../schemas/credentialSchema";
import { createCredential, getCredentials, getCredentialById, deleteCredentialById } from "../controllers/credentialController";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateSchema(credentialSchema), createCredential);
credentialRouter.get("/credentials", getCredentials);
credentialRouter.get("/credentials/:credentialId", getCredentialById);
credentialRouter.delete("/credentials/:credentialId", deleteCredentialById);

export default credentialRouter;