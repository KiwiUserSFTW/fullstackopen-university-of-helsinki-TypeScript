import { type JSX, useEffect, useState } from "react";
import { type DiaryEntry } from "../types";
import diaryService from "../service/diaryService";

const DiaryListItem = ({
  diaryListItem: { date, visibility, weather },
}: {
  diaryListItem: DiaryEntry;
}): JSX.Element => (
  <div>
    <h3>{date}</h3>
    <p> visibility: {visibility}</p>
    <p> weather: {weather}</p>
  </div>
);
const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const diaries = await diaryService.getAll();

      setDiaries(diaries);
    };

    fetchData();
  }, []);

  if (!diaries) return <> loading ...</>;
  return (
    <div>
      <h1> Diary entries</h1>
      {diaries.map((diary) => (
        <DiaryListItem key={diary.id} diaryListItem={diary} />
      ))}
    </div>
  );
};

export default DiaryList;
