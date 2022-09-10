import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import router from "./routes/index";
import errorHandlerMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));