import axios from "axios";
import { type DiaryEntry, type NewDiaryEntry } from "../types";

const apiBaseUrl = "http://localhost:3000/api/diaries";
const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(apiBaseUrl);

  return data;
};

const addOne = async (diary: NewDiaryEntry) => {
  try {
    const { data } = await axios.post<DiaryEntry>(apiBaseUrl, diary);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const path = error.response?.data?.error?.[0]?.path?.[0];

      if (path) {
        error.message = `Incorect ${path}: ${diary[path as keyof NewDiaryEntry]}`;
      }
    }

    throw error;
  }
};

export default {
  getAll,
  addOne,
};
