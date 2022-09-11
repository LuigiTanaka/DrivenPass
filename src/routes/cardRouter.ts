import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import cardSchema from "../schemas/cardSchema";
import { createCard, getCards, getCardById, deleteCardById } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/cards", validateSchema(cardSchema), createCard);
cardRouter.get("/cards", getCards);
cardRouter.get("/cards/:cardId", getCardById);
cardRouter.delete("/cards/:cardId", deleteCardById);

export default cardRouter;