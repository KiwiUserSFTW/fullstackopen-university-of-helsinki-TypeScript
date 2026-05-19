import type { JSX } from "react";
import type { coursePartType } from "./App";

const Total = ({
  courseParts,
}: {
  courseParts: coursePartType[];
}): JSX.Element => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p> Number of exercises {totalExercises}</p>;
};

export default Total;
