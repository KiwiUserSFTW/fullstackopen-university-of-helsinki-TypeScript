const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));

export const notNumberCheck = (args: number[]): void => {
  if (args.length === 0) throw new Error("No values were provided!");

  for (const arg of args) {
    if (isNotNumber(arg)) {
      throw new Error("Provided values were not numbers!");
    }
  }
};
