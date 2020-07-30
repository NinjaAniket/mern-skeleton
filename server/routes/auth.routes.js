import express from "express";

import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/auth/sigin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);
