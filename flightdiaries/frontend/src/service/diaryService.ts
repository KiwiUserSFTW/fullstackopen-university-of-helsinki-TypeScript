import axios from "axios";
import { type DiaryEntry, type NewDiaryEntry } from "../types";

const apiBaseUrl = "http://localhost:3000/api/diaries";
const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(apiBaseUrl);

  return data;
};

const addOne = async (diary: NewDiaryEntry) => {
  const { data } = await axios.post<NewDiaryEntry>(apiBaseUrl, diary);

  return data;
};
export default {
  getAll,
  addOne,
};
