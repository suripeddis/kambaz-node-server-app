// kambaz-server/Lab5/QueryParameters.js
export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    const x = parseInt(a);
    const y = parseInt(b);
    let result = 0;

    switch (operation) {
      case "add":
        result = x + y;
        break;
      case "subtract":
        result = x - y;
        break;
      case "multiply":
        result = x * y;
        break;
      case "divide":
        if (y === 0) {
          result = "Division by zero";
        } else {
          result = x / y;
        }
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };

  app.get("/lab5/calculator", calculator);
}
