import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator";
import wifiSchema from "../schemas/wifiSchema";
import { createWifi, getWifis, getWifiById, deleteWifiById } from "../controllers/wifiController";

const wifiRouter = Router();

wifiRouter.post("/wifis", validateSchema(wifiSchema), createWifi);
wifiRouter.get("/wifis", getWifis);
wifiRouter.get("/wifis/:wifiId", getWifiById);
wifiRouter.delete("/wifis/:wifiId", deleteWifiById);

export default wifiRouter;