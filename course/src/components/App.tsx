import { courseParts } from "../data";

import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
