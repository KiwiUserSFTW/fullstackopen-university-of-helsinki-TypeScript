import { useEffect, useState, type JSX } from "react";
import type { DiaryEntry } from "../types";
import diaryService from "../service/diaryService";

import DiaryList from "./DiaryList";
import DiaryForm from "./DiaryForm";

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null);

  const addNewDiary = (diary: DiaryEntry) => {
    setDiaries([...diaries, diary]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const diaries = await diaryService.getAll();

      setDiaries(diaries);
    };

    fetchData();
  }, []);

  return (
    <>
      <DiaryForm addNewDiary={addNewDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
