import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./router";

config();
const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server running ${PORT}`));
