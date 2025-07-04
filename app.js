import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import path from "path"

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

import './db/sequelize.js'

import { rootDir } from "./utils/dirname.js";


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(rootDir, "public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Contacts API. Use /api/contacts");
});


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
