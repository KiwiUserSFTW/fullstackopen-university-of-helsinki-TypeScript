import type { coursePartType } from "./App";

const Content = ({ courseParts }: { courseParts: coursePartType[] }) =>
  courseParts.map((part) => (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  ));

export default Content;