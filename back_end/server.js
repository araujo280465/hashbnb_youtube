import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import path, { dirname } from "node:path";

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
app.use(express.static(path.join(__dirname, "../front_end/dist")));
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front_end/dist/index.html"));
});
