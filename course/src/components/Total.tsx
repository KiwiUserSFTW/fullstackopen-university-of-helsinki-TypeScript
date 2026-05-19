import type { JSX } from "react";
import type { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p> Number of exercises {totalExercises}</p>;
};

export default Total;
