import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { notNumberCheck } from "./utils.ts";
import { exerciseCalculator } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  try {
    notNumberCheck([parsedHeight, parsedWeight]);
  } catch {
    // if (error instanceof Error) res.send({ error: error.message });
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  res.json(calculateBmi({ height: parsedHeight, weight: parsedWeight }));
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: dailyResults, target } = req.body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (!dailyResults || target === undefined) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(dailyResults) ||
    typeof target !== "number" ||
    !dailyResults.every((value): value is number => typeof value === "number")
  ) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  res.send(exerciseCalculator(target, dailyResults));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
