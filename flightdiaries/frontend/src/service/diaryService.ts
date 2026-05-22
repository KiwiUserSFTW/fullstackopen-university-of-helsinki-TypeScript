import axios from "axios";
import { type DiaryEntry } from "../types";

const apiBaseUrl = "http://localhost:3000/api/diaries";
const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(apiBaseUrl);

  return data;
};

export default {
  getAll,
};
