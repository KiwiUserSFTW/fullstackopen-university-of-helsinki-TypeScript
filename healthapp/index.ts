import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { notNumberCheck } from "./utils.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack");
});

app.get("/bmi", (req, res, next) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  try {
    notNumberCheck([parsedHeight, parsedWeight]);
  } catch (error) {
    if (error instanceof Error) res.send({ error: error.message });
    return next(error);
  }

  res.send(calculateBmi(parsedHeight, parsedWeight));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
