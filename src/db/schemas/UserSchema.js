const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "owner"], default: "user" },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
