import type { ReactNode, JSX } from "react";

import { Paper, Typography, Box } from "@mui/material";

interface Props {
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  icon?: ReactNode;
  employerName?: string;
  additionalInfo?: ReactNode;
}

const BaseEntry = ({
  date,
  description,
  specialist,
  diagnosisCodes,
  icon,
  employerName,
  additionalInfo,
}: Props): JSX.Element => (
  <Paper
    variant="outlined"
    sx={{
      p: 1,
      mb: 2,
    }}
  >
    <Box display="flex" alignItems="center" gap={1}>
      <Typography>{date}</Typography>
      {icon}
      {employerName && (
        <Typography sx={{ fontStyle: "italic" }}>{employerName}</Typography>
      )}
    </Box>

    <Typography component="div" sx={{ fontStyle: "italic", mt: 0.5 }}>
      {description}
    </Typography>

    {additionalInfo && <Typography sx={{ mt: 1 }}>{additionalInfo}</Typography>}

    {diagnosisCodes && (
      <Box>
        <Typography> diagnoses codes: </Typography>
        <ul>
          {diagnosisCodes &&
            diagnosisCodes.map((code) => <li key={code}> {code}</li>)}
        </ul>
      </Box>
    )}

    <Box display="flex" alignItems="center" gap={1} mt={1}>
      <Typography>diagnose by {specialist}</Typography>
    </Box>
  </Paper>
);

export default BaseEntry;
