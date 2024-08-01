const UserService = require("../modules/user.Service");
const signUp = async (req, res, next) => {
  try {
    const user = await UserService.signUpService(req, res);
    res
      .status(201)
      .json({ message: `User with email ${user.email} created sucessfully` });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const token = await UserService.signInService(req, res);
    res
      .status(200)
      .json({ BearerToken: token, message: "Sucessfully signed in" });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn };
