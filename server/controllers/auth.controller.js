import User from "../models/user.model";
import expressjwt from "express-";
import errorHandler from "../helpers/dbErrorHandler";
import jwt from "express-jwt";
import config from "../../config/config";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status("401").json({
        error: "User not found",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({
        error: "Email and password don't match",
      });
    }
    const token = jwt.sign({ _id: _user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({
      error: "Could not sign in!",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out!",
  });
};

export default { signin, signout };
