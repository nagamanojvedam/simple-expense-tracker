const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      status: "success",
      length: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.userSignup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm)
      return res.status(400).json({
        status: "error1",
        message: "Please provide all the fields",
      });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        status: "error2",
        message: "User already exists",
      });

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    return res.status(200).json({
      status: "success",
      user: newUser,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error3",
      message: err.message,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({
        status: "error 1",
        message: "Please fill all fields",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        status: "error 2",
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        status: "error 3",
        message: "Incorrect Email or Password",
      });

    delete user.password;

    return res.status(200).json({
      status: "success",
      message: `Welcome back, ${user.name}`,
      user,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error last",
      message: err.message,
    });
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarSet: true,
        avatar,
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
