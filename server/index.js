import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();

const app = express();

// gelen istekleri filtrelemek için orign kullanabilirsiniz
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log(`connected to db`);
      console.log(`PORT: ${port}`);
    })
    .catch((err) => console.error(err));
});