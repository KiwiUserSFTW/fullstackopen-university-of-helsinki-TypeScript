import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Male, Female } from "@mui/icons-material";
import { Gender, Patient } from "../../types";

import patientService from "../../services/patients";

const GenderIcon = ({ gender }: { gender: Gender }): JSX.Element => {
  switch (gender) {
    case Gender.Female:
      return <Female fontSize="large" />;
    case Gender.Male:
      return <Male fontSize="large" />;
    case Gender.Other:
      return <></>;
    default:
      return <></>;
  }
};

const PatientInfoPage = (): JSX.Element | undefined => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return;

  return (
    <div>
      <div>
        <Typography variant="h3">
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography>date of birth: {patient.dateOfBirth}</Typography>
      </div>
    </div>
  );
};

export default PatientInfoPage;
