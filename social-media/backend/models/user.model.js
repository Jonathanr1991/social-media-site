const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//test commit
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  major: { type: String, required: false },
  bio: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  imageURL: {
    type: String,
    default: "/img/user-profile-pic/default_profile.jpg",
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const user = mongoose.model("user", userSchema);

module.exports = user;
