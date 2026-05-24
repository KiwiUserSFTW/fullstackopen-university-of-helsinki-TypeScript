import { useState, type JSX } from "react";
import {
  NewEntrySchema,
  Visibility,
  Weather,
  type NewDiaryEntry,
} from "../types";
import diaryService from "../service/diaryService";

import RadioInput from "./RadioInput";

const DiaryForm = (): JSX.Element => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedDiary: NewDiaryEntry = NewEntrySchema.parse({
        date,
        weather,
        visibility,
        comment,
      });
      await diaryService.addOne(parsedDiary);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <RadioInput
          buttons={Object.values(Weather)}
          selectedValue={weather}
          title="Weather"
          setRadioButton={(v) => setWeather(v)}
        />
        <RadioInput
          buttons={Object.values(Visibility)}
          selectedValue={visibility}
          title="Visibility"
          setRadioButton={(v) => setVisibility(v)}
        />
        <label>
          Comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
