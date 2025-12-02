import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao();

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment(courseId, req.body);
    res.json(newAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const status = await dao.deleteAssignment(courseId, assignmentId);
    res.send(status);
  };

  const updateAssignment = async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const updates = req.body;
    const updated = await dao.updateAssignment(courseId, assignmentId, updates);
    res.json(updated);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
}
