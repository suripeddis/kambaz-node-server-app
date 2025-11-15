// kambaz-server/Lab5/PathParameters.js
export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };

  const subtract = (req, res) => {
    const { a, b } = req.params;
    const diff = parseInt(a) - parseInt(b);
    res.send(diff.toString());
  };

  const multiply = (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  };

  const divide = (req, res) => {
    const { a, b } = req.params;
    const denominator = parseInt(b);
    if (denominator === 0) {
      res.send("Division by zero");
      return;
    }
    const quotient = parseInt(a) / denominator;
    res.send(quotient.toString());
  };

  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
