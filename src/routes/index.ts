import { Router } from "express"

import authRouter from "./authRouter"; 
import credentialRouter from "./credentialRouter";
import secureNoteRouter from "./secureNoteRouter";
import cardRouter from "./cardRouter";
import wifiRouter from "./wifiRouter";

const router = Router();

router.get("/", (req, res) => {
    res.send("Online");
})

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;