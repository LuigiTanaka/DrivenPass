import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import wifiSchema from "../schemas/wifiSchema";
import { createWifi, getWifis, getWifiById, deleteWifiById } from "../controllers/wifiController";
import { validateToken } from "../middlewares/validateToken";

const wifiRouter = Router();

wifiRouter.post("/wifis", validateToken, validateSchema(wifiSchema), createWifi);
wifiRouter.get("/wifis", validateToken, getWifis);
wifiRouter.get("/wifis/:wifiId", validateToken, getWifiById);
wifiRouter.delete("/wifis/:wifiId", validateToken, deleteWifiById);

export default wifiRouter;