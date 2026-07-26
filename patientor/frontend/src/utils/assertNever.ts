export const assertNever = (value: never): never => {
  throw new Error(`Error case: ${value}`);
};
