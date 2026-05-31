import { useEffect, useState, type JSX } from "react";
import axios from "axios";

import {
  NewEntrySchema,
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "../types";
import diaryService from "../service/diaryService";

import RadioInput from "./RadioInput";
import Notification from "./Notification";

interface DiaryForm {
  addNewDiary: (diary: DiaryEntry) => void;
}
const DiaryForm = ({ addNewDiary }: DiaryForm): JSX.Element => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const delay = 5000;

  const cleanForm = () => {
    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment("");
  };

  // form handler typing: https://www.epicreact.dev/how-to-type-a-react-form-on-submit-handler
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedDiary: NewDiaryEntry = NewEntrySchema.parse({
        date,
        weather,
        visibility,
        comment,
      });

      const newDiary = await diaryService.addOne(parsedDiary);
      addNewDiary(newDiary);
      cleanForm();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), delay);
    }
  }, [message]);

  return (
    <div>
      <h1> Add new entry</h1>
      <Notification message={message} />
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
