import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import blogRouter from "./Routers/blogRouter.js";
import cors from "cors";

dotenv.config();

const app = express();

// gelen istekleri filtrelemek için orign kullanabilirsiniz
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/blogs", blogRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log(`Connected DB | URL: http://localhost:${port}`);
    })
    .catch((err) => console.error(err));
});
