import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
};

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);  
Lab5(app);
Hello(app);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});