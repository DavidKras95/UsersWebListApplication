const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userAuthSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userAuthSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    return Error("incorrect password");
  }
  return Error("incorrect email");
};

// Hash users token
userAuthSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);
module.exports = UserAuth;
