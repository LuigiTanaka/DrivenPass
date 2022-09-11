import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";

import authRouter from "./authRouter"; 
import credentialRouter from "./credentialRouter";
import secureNoteRouter from "./secureNoteRouter";
import cardRouter from "./cardRouter";

const router = Router();

router.use(authRouter);
router.use(validateToken);
router.use(credentialRouter);
router.use(secureNoteRouter);
router.use(cardRouter);

export default router;