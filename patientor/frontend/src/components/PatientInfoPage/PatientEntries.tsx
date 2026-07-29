import { DiagnoseEntry, Entry, NewEntry, PatientEntry } from "../../types";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Box, Typography, Button } from "@mui/material";
import EntryDetails from "./EntryDetails";
import diagnosesService from "../../services/diagnoses";
import AddEntryModal from "./AddEntryModal";
import patientsService from "../../services/patients";

const PatientEntries = ({
  patient,
  addEntryToPatient,
}: {
  patient: PatientEntry;
  addEntryToPatient: (newEntry: Entry) => void;
}): JSX.Element => {
  const [diagnoses, setDisgnoses] = useState<DiagnoseEntry[] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { id } = useParams();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleAddNewEntrySubmit = async (newEntry: NewEntry) => {
    if (!newEntry || !id) return;
    try {
      const response = await patientsService.addEntry(id, newEntry);
      addEntryToPatient(response);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDisgnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  if (!patient) return <></>;
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">entries</Typography>
      {patient.entries?.length >= 1 ? (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      ) : (
        <Typography>no entries</Typography>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={handleAddNewEntrySubmit}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default PatientEntries;
