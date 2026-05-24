import { type JSX } from "react";
import DiaryList from "./DiaryList";
import DiaryForm from "./DiaryForm";

const App = (): JSX.Element => {
  return (
    <>
      <DiaryForm />
      <DiaryList />
    </>
  );
};

export default App;
