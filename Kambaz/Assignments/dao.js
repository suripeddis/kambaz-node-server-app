import moduleSchema from "../Modules/schema.js";
import assignmentSchema from "../Assignments/schema.js";

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  startDate: String,
  endDate: String,
  department: String,
  credits: Number,
  description: String,
  modules: [moduleSchema],
  assignments: [assignmentSchema],
});
