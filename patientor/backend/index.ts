import express from "express";
import cors from "cors";
import diagnosesRouter from "./routers/diagnosesRouter.ts";
import patientsRouter from "./routers/patientsRouter.ts";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
