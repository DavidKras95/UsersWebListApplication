const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    job: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userDataSchema);
module.exports = UserData;
