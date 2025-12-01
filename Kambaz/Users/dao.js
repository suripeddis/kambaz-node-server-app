import UserModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return UserModel.create(newUser);
  };

  const findAllUsers = () => UserModel.find();

  const findUserById = (userId) => UserModel.findById(userId);

  const findUserByUsername = (username) =>
    UserModel.findOne({ username });

  const findUserByCredentials = (username, password) =>
    UserModel.findOne({ username, password });

  const findUsersByRole = (role) =>
    UserModel.find({ role });

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return UserModel.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ],
    });
  };

  const updateUser = (userId, updates) =>
    UserModel.updateOne({ _id: userId }, { $set: updates });

  const deleteUser = (userId) =>
    UserModel.findByIdAndDelete(userId);

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser,
  };
}
