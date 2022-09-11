import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import cardSchema from "../schemas/cardSchema";
import { createCard, getCards, getCardById, deleteCardById } from "../controllers/cardController";
import { validateToken } from "../middlewares/validateToken";

const cardRouter = Router();

cardRouter.post("/cards", validateToken, validateSchema(cardSchema), createCard);
cardRouter.get("/cards", validateToken, getCards);
cardRouter.get("/cards/:cardId", validateToken, getCardById);
cardRouter.delete("/cards/:cardId", validateToken, deleteCardById);

export default cardRouter;