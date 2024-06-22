const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwtProvider = require("../Config/jwtProvider");
const createUser = async (userData) => {
  try {
    let { FirstName, LastName, Email, Password } = userData;

    const isUserExist = await User.findOne({ Email });

    if (isUserExist) {
      throw new Error("User Already Exist With Email ", Email);
    }

    Password = await bcrypt.hash(Password, 9);

    const user = await User.create({ FirstName, LastName, Email, Password });

    return user;

    console.log("created USer", user);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    
    if (!user) {
      throw new Error("user not found with id:", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (Email) => {
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      throw new Error("user not found with email:", Email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);

    if (!user) {
      throw new Error("user not found with id:", userId);
    }

    return user;
  } catch (error) {
    
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
