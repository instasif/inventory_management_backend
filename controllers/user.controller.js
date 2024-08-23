const userServices = require("../services/user.services");

exports.signUp = async (req, res) => {
  try {
    const user = await userServices.signUpService(req.body);
  res.status(200).json({
    status: "Successful",
    message: "Successfullt signed up!",
    userData: user
  })
  } catch (error) {
    res.status(200).json({
        status: "failed",
        message: error.message,
        error: error
      })
  }
};
