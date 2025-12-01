import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";  
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://kambaz-next-6567c8jp5-saumya-suripeddis-projects.vercel.app"
    ],
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Changed to false for local development
    httpOnly: true,
    sameSite: "lax",  // Changed from "none" to "lax"
    maxAge: 24 * 60 * 60 * 1000,
  },
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