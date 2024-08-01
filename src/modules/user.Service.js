const APIError = require("../errors/api-errors");
const User = require("../db/schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUpService = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throw new APIError(
        "Either email, password or both are missing please enter before requesting ",
        400
      );
    }
    const u = await User.findOne({ email: email });
    if (u) {
      throw new APIError(
        `User with ${email} already exist. Please sign in into your account`,
        400
      );
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = new User({
      email: email,
      password: hashedPassword,
      role,
    });
    await user.save();
    return { email, role };
  } catch (err) {
    throw err;
  }
};
const signInService = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new APIError(
        "Either email, password or both are missing please enter before requesting ",
        400
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new APIError("User not found !", 404);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new APIError("Bad request the provided passowrd is Wrong", 400);
    }
    const token = jwt.sign({ email }, process.env.JWTSECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {
    throw err;
  }
};
module.exports = { signUpService, signInService };
