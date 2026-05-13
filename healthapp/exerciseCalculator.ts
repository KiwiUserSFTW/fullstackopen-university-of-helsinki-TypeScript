import { notNumberCheck } from "./utils.ts";

interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratings: { minRatio: number; rate: number; description: string }[] = [
  { minRatio: 1, rate: 3, description: "excellent work " },
  { minRatio: 0.75, rate: 2, description: "good rythm buddy" },
  { minRatio: 0, rate: 1, description: "could be better, bad" },
];

const ratingCalculator = (
  average: number,
  target: number,
): [string, number] => {
  const ratio = average / target;
  const rating = ratings.find((v) => ratio >= v.minRatio);

  if (!rating) {
    throw new Error("No rating mached");
  }

  return [rating.description, rating.rate];
};

interface ExerciseCalculator {
  (target: number, daysResults: number[]): ExerciseCalculatorResult;
}

export const exerciseCalculator: ExerciseCalculator = (target, daysResults) => {
  const periodLength = daysResults.length;
  const average =
    daysResults.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const trainingDays = daysResults.filter((hours) => hours > 0).length;
  const success = average >= target;
  const [ratingDescription, rating] = ratingCalculator(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArgs = (args: string[]): [number, number[]] => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const daysResults = args.slice(3).map((v) => Number(v));
  const target = Number(args[2]);
  notNumberCheck([...daysResults, target]);

  return [target, daysResults];
};

if (process.argv[1] === import.meta.filename) {
  console.log(exerciseCalculator(...parseExerciseArgs(process.argv)));
}
