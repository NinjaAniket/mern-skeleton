import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import Template from "../template";

//comment in production

import devBundle from "./devBundle";
// import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import path from "path";
const CURRENT_WORKING_DIR = process.cwd();

const app = express();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

//comment in production
devBundle.compile(app);

//to handle auth related error thrown by jwt

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  } else if (err) {
    res.status(401).json({ error: err.name + ":" + err.message });
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
// app.use(cors());

app.use("/", userRoutes);
app.use("/", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send(Template());
});

export default app;
