import { type JSX } from "react";
import type { CoursePart, CoursePartBase } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PartHeader = ({ part }: { part: CoursePartBase }) => (
  <h2>
    {part.name} {part.exerciseCount}
  </h2>
);

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <PartHeader part={part} />
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <PartHeader part={part} />
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <PartHeader part={part} />
          <p>{part.description}</p>
          <p>
            submit to
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <PartHeader part={part} />
          <p>{part.description}</p>
          <div>
            <p> required skils : {part.requirements.join(", ")}</p>
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
