const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const pageSchema = new Schema(
  {
    page: {
      type: Number,
      required: true,
    },
    per_page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    total_pages: {
      type: Number,
      required: true,
    },
    data: [userSchema],
    support: {
      url: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const PageUserData = mongoose.model("PageUserData", pageSchema);

module.exports = PageUserData;
