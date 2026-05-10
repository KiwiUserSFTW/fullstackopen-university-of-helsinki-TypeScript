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
  (daysResults: number[], target: number): ExerciseCalculatorResult;
}

const exerciseCalculator: ExerciseCalculator = (daysResults, target) => {
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
