const handleResponse = require("../service/handleResponse");
const User = require("../models/users");

const users = {
  getUsers: handleResponse.errorAsync(async (req, res, next) => {
    const allUsers = await User.find();
    handleResponse.success(res, "資料讀取成功", allUsers);
  }),
}

module.exports = users;