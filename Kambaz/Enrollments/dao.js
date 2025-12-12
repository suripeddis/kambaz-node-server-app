import model from "./model.js";

export default function EnrollmentsDao() {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((e) => e.user);
  }

  async function enrollUserInCourse(userId, courseId) {
    // Check if enrollment already exists
    const existing = await model.findOne({ user: userId, course: courseId });
    if (existing) {
      return existing; // Already enrolled, return existing
    }
    
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    });
  }

  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}