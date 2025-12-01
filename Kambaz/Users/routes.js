import UsersDao from "./dao.js";

export default function UserRoutes(app) {  // Make sure "export default" is here!
  const dao = UsersDao();

  const signup = async (req, res) => {
    console.log("=== SIGNUP ATTEMPT ===");
    console.log("Request body:", req.body);
    
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    console.log("=== SIGNIN ATTEMPT ===");
    console.log("Request body:", req.body);
    console.log("Username:", req.body.username);
    console.log("Password:", req.body.password);
    
    const { username, password } = req.body;
    
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      console.log("Found user:", currentUser);
      
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        console.log("No user found - returning 401");
        res.status(401).json({ message: "Unable to login" });
      }
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;
    await dao.updateUser(userId, updates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...updates };
    }
    res.json({ status: "ok" });
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      res.json(await dao.findUsersByRole(role));
      return;
    }
    if (name) {
      res.json(await dao.findUsersByPartialName(name));
      return;
    }
    res.json(await dao.findAllUsers());
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users", createUser);
}