import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";

import authRouter from "./authRouter"; 
import credentialRouter from "./credentialRouter";
import secureNoteRouter from "./secureNoteRouter";

const router = Router();

router.use(authRouter);
router.use(validateToken);
router.use(credentialRouter);
router.use(secureNoteRouter);

export default router;