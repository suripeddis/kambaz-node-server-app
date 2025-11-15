import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = [...enrollments, { _id: uuidv4(), user: userId, course: courseId }];
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }
  
  return { enrollUserInCourse, unenrollUserFromCourse };
}