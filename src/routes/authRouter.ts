import { Router } from "express";
import signSchema from "../schemas/signSchema";
import { validateSchema } from "../middlewares/schemaValidator";
import { signUp, signIn } from "../controllers/authControler";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signSchema), signUp);
authRouter.post("/", validateSchema(signSchema), signIn);

export default authRouter;