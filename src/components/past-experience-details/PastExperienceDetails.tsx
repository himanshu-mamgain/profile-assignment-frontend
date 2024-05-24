import { Grid, IconButton, Typography } from "@mui/material";
import { ExperienceDetails } from "../past-experience-form/PastExperienceForm";
import { Delete, Edit } from "@mui/icons-material";
import { deleteExperience } from "../../store/slices/profile.slice";
import { useDispatch } from "react-redux";

const PastExperienceDetails: React.FC<ExperienceDetails> = ({
  _id,
  companyName,
  designation,
  startYear,
  endYear,
  setExperienceId,
  edit,
  setEdit,
}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  function handleEdit(experienceId: string | undefined) {
    setEdit(!edit);

    if (experienceId) {
      setExperienceId(experienceId);
    }
  }

  return (
    <Grid
      container
      sx={{
        p: 2,
        my: 2,
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: "0 10px #000",
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", right: 0, bottom: 0 }}
        color="error"
        // @ts-ignore
        onClick={() => dispatch(deleteExperience({ token, experienceId: _id }))}
      >
        <Delete />
      </IconButton>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        color="success"
        onClick={() => handleEdit(_id)}
      >
        <Edit />
      </IconButton>
      <Grid item xs={12}>
        <Typography>
          <b>Company Name:</b> {companyName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <b>Designation:</b> {designation}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography>
          <b>Time Period:</b> {startYear} - {endYear}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PastExperienceDetails;
