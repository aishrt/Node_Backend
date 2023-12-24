const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenService } = require("../services");

const getProfile = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await User.findById(userId);
    return res.status(200).json({
      status: "200",
      message: "User data fetched successfully!",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetcihng user data !",
      error: error.message,
    });
  }
});

const updateProfile = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId, "userId 0-------");
    const userDetail = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    userDetail.save();
    return res.status(200).json({
      status: "200",
      message: "User data updated successfully!",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while updating user data !",
      error: error.message,
    });
  }
});
const deleteProfile = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findOneAndDelete({ id: userId });
    return res.status(200).json({
      status: "200",
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while deleting user data !",
      error: error.message,
    });
  }
});
const getList = catchAsync(async (req, res) => {
  const currentUser = req.user;
  const selectesRole = req.query.role;
  const searchName = req.query.name;
  const searchEmail = req.query.email;

  const query = {
    _id: { $ne: currentUser },
    role: selectesRole,
  };

  if (searchName) {
    query.first_name = { $regex: new RegExp(searchName, "i") };
  }

  try {
    const userList = await User.find(query);
    return res.status(200).json({
      status: "200",
      message: "User list fetched successfully!",
      data: userList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching user list!",
      error: error.message,
    });
  }
});

module.exports = {
  getProfile,
  updateProfile,
  getList,
  deleteProfile,
};
