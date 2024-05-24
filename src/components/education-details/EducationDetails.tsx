import { Grid, IconButton, Typography } from "@mui/material";
import { EducationDetails as EducationDetailsData } from "../education-details-form/EducationDetailsForm";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../store/slices/profile.slice";

const EducationDetails: React.FC<EducationDetailsData> = ({
  _id,
  instituteName,
  courseName,
  startYear,
  endYear,
  percentage,
  setEducationId,
  edit,
  setEdit,
}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  function handleEdit(educationId: string | undefined) {
    setEdit(!edit);
    if (educationId) {
      setEducationId(educationId);
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
        onClick={() => dispatch(deleteEducation({ token, educationId: _id }))}
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
          <b>Univeristy / School Name:</b> {instituteName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <b>Course Name:</b> {courseName}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography>
          <b>Time Period:</b> {startYear} - {endYear}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography>
          <b>Percentage (%):</b> {percentage}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EducationDetails;
