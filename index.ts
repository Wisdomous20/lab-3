import express from "express";
import cors from "cors";
import { router } from "./routes/routes";

export const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

function startServer() {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
