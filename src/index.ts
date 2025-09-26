import express from "express";
import secret from "./config/secret";
import connectDB from "./config/db.config";
import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use(appRouter);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(secret.PORT, () => {
      console.log(`Server running on http://localhost:${secret.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to Server:", error);
    process.exit(1);
  }
};

startServer();
