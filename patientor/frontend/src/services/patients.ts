import axios from "axios";
import { NewEntry, PatientEntry, PatientFormValues,Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientEntry[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<PatientEntry>(
    `${apiBaseUrl}/patients/${id}`,
  );

  return data;
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients`,
    object,
  );

  return data;
};

const addEntry = async (id: string, object: NewEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
  );

  return data;
};

export default {
  getAll,
  getOne,
  create,
  addEntry,
};
