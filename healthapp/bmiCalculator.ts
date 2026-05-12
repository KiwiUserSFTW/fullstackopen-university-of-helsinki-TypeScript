import { notNumberCheck } from "./utils.ts";

interface BmiCategory {
  from: number;
  to: number;
  name: string;
}

// categories
const bmiCategories: BmiCategory[] = [
  {
    from: 0,
    to: 16,
    name: "Underweight (Severe thinness)",
  },
  {
    from: 16,
    to: 17,
    name: "Underweight (Moderate thinness)",
  },
  {
    from: 17,
    to: 18.5,
    name: "Underweight (Mild thinness)",
  },
  {
    from: 18.5,
    to: 25,
    name: "Normal range",
  },
  {
    from: 25,
    to: 30,
    name: "Overweight (Pre-obese)",
  },
  {
    from: 30,
    to: 35,
    name: "Obese (Class I)",
  },
  {
    from: 35,
    to: 40,
    name: "Obese (Class II)",
  },
  {
    from: 40,
    to: Infinity,
    name: "Obese (Class III)",
  },
];

export const calculateBmi = (heightS: number, weight: number): string => {
  const heightM = heightS / 100;
  const bmi: number = weight / (heightM * heightM);

  let match: string | null = null;

  for (const category of bmiCategories) {
    const { from, to, name }: BmiCategory = category;
    if (bmi >= from && bmi <= to) {
      match = name;
    }
  }

  return match || "undefined";
};

// args parser
 const parseCalculateArgs = (args: string[]): [number, number] => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const heightS = Number(args[2]);
  const weight = Number(args[3]);

  notNumberCheck([heightS, weight]);

  return [heightS, weight];
};

if (process.argv[1] === import.meta.filename) {
  console.log(calculateBmi(...parseCalculateArgs(process.argv)));
}
