import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
    const course = await CourseModel.findById(courseId);
    return course.assignments || [];
  }

  async function createAssignment(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };

    await CourseModel.updateOne(
      { _id: courseId },
      { $push: { assignments: newAssignment } }
    );

    return newAssignment;
  }

  async function deleteAssignment(courseId, assignmentId) {
    return CourseModel.updateOne(
      { _id: courseId },
      { $pull: { assignments: { _id: assignmentId } } }
    );
  }

  async function updateAssignment(courseId, assignmentId, assignmentUpdates) {
    const course = await CourseModel.findById(courseId);
    const assignment = course.assignments.id(assignmentId);
    Object.assign(assignment, assignmentUpdates);
    await course.save();
    return assignment;
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
