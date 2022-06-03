const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入您的姓名"]
    },
    email: {
      type: String,
      required: [true, "請輸入您的 email"],
      unique: true,
      lowercase: true,
      select: false
    },
    photo: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;