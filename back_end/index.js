import "dotenv/config";
import express from "express";
import UserRoutes from "./domains/users/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use("/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
