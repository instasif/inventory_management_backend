const User = require("../models/user");
const userServices = require("../services/user.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const user = await userServices.signUpService(req.body);
    res.status(200).json({
      status: "Successful",
      message: "Successfully signed up!",
      userData: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "signup failed",
      message: error.message,
      error: error,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbUser = await User.findOne({ email });

    const errorMsg = "Auth failed, email or password is wrong";
    if (!dbUser) {
      return res.status(403).json({
        success: false,
        message: errorMsg,
      });
    }

    const iseEqualPassword = await bcrypt.compare(password, dbUser.password);
    console.log(iseEqualPassword);
    if (!iseEqualPassword) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: dbUser?.email, _id: dbUser?._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful!",
      status: true,
      name: dbUser?.firstName + " " + dbUser?.lastName,
      email: dbUser?.email,
      jwtToken,
    });
  } catch (error) {
    res.status(400).json({
      status: "login failed",
      message: error.message,
      error: error,
    });
  }
};
