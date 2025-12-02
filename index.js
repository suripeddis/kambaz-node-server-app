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
import CourseModel from "./Kambaz/Courses/model.js";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

mongoose.connect(CONNECTION_STRING);

mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://kambaz-next-6567c8jp5-saumya-suripeddis-projects.vercel.app",
      "https://kambaz-next-js-saumyasuripeddi-5320-saumya-suripeddis-projects.vercel.app",
      "https://kambaz-next-609pu5j25-saumya-suripeddis-projects.vercel.app"
    ],
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(express.json());

app.get('/test', async (req, res) => {
  const courses = await CourseModel.find();
  console.log('Test route found:', courses.length);
  res.json(courses);
});

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