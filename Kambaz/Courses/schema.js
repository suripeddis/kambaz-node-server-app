import mongoose from "mongoose";
import moduleSchema from "../Modules/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: String,
    endDate: String,
    department: String,
    credits: Number,
    description: String,

    modules: [moduleSchema],

    assignments: [
      {
        _id: String,
        title: String,
        description: String,
        dueDate: String,
        points: Number,
      }
    ],
  },
  { collection: "courses" }
);

export default courseSchema;
