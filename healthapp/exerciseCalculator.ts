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

const ratingCalculator = (average: number): [string, number] => {
  const normalizedAverage = Math.max(1, Math.min(Math.ceil(average), 3));
  const ratings = ["could be better", "good rythm buddy", "excellent work"];

  return [ratings[normalizedAverage - 1], normalizedAverage];
};

interface ExerciseCalculator {
  (target: number, daysResults: number[]): ExerciseCalculatorResult;
}

const exerciseCalculator: ExerciseCalculator = (target, daysResults) => {
  const periodLength = daysResults.length;
  const average =
    daysResults.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const trainingDays = daysResults.filter((hours) => hours > 0).length;
  const success = average >= target;
  const [ratingDescription, rating] = ratingCalculator(average);

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

console.log(exerciseCalculator(...parseExerciseArgs(process.argv)));
