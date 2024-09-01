const User = require("../models/user");

exports.signUpService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};