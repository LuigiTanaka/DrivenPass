import { Router } from "express";
import authSchema from "../schemas/authSchema";
import { validateSchema } from "../middlewares/schemaValidator";
import { signUp, signIn } from "../controllers/authControler";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(authSchema), signUp);
authRouter.post("/", validateSchema(authSchema), signIn);

export default authRouter;