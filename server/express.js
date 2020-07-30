import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import Template from "../template";
// import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
// app.use(cors());

export default app;
