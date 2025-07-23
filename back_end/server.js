import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "node:path";

export const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use("/tmp", express.static(__dirname + "/tmp"));
app.use(routes);
