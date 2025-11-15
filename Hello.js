export default function Hello(app) {
  app.get("/hello", (req, res) => {
    res.send("Life is good!");
  });

  app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
  });

  app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from the server" });
  });
}