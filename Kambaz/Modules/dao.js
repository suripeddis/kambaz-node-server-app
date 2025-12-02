import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function ModulesDao() {
  async function findModulesForCourse(courseId) {
    const course = await CourseModel.findById(courseId);
    if (!course) return [];
    return course.modules ?? [];
  }

  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };

    await CourseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );

    return newModule;
  }

  async function deleteModule(courseId, moduleId) {
    return await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const module = course.modules.id(moduleId);
    if (!module) return null;

    Object.assign(module, moduleUpdates);
    await course.save();

    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
