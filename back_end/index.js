import "dotenv/config";
import { app } from "./server.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
