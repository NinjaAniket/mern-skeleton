import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully Signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deleteUser = await user.remove();
    deleteUser.hashed_password = undefined;
    deleteUser.salt = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};
const read = async (req, res) => {
  //remove hashed password and salt before sending the user object to client
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status('400').json({
        error: "User not Found!",
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status('400').json({
      error: "Could not retireve user",
    });
  }
};
export default { create, remove, read, update, userByID, list };
