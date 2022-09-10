import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";

import authRouter from "./authRouter"; 
import credentialRouter from "./credentialRouter";

const router = Router();

router.use(authRouter);
router.use(validateToken);
router.use(credentialRouter);

export default router;