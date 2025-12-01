import mongoose from "mongoose";
import userSchema from "./schema.js";

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
