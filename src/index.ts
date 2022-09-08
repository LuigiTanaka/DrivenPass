import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));