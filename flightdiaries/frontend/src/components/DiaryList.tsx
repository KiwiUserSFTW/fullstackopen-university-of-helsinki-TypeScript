import { type JSX } from "react";
import { type DiaryEntry } from "../types";

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
const DiaryList = ({ diaries }: { diaries: DiaryEntry[] | null }) => {
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
