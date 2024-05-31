import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import YearPicker from "../shared/YearPicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addEducation,
  getEducationDetails,
  updateEducation,
} from "../../store/slices/profile.slice";
import dayjs from "dayjs";

interface EducationDetailsFormProps {
  formTitle: string;
  buttonTitle: string;
  educationId?: string;
  handleCancelClick: () => void;
  onUpdate: (token: string) => void;
}

export interface EducationDetails {
  _id?: string;
  instituteName: string;
  courseName: string;
  startYear: string;
  endYear: string;
  percentage: string;
  setEducationId?: any;
  edit?: boolean;
  setEdit?: any;
}

const EducationDetailsForm: React.FC<EducationDetailsFormProps> = ({
  formTitle,
  buttonTitle,
  educationId,
  handleCancelClick,
  onUpdate,
}) => {
  const [education, setEducation] = useState<EducationDetails>({
    instituteName: "",
    courseName: "",
    startYear: "",
    endYear: "",
    percentage: "",
  });
  const [startYear, setStartYear] = useState<dayjs.Dayjs>();
  const [endYear, setEndYear] = useState<dayjs.Dayjs>();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { educationDetails } = useSelector(
    (state: { profile: any }) => state.profile
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setEducation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Object.assign(education, {
      startYear: startYear?.year(),
      endYear: endYear?.year(),
    });

    const payload: any = {
      token,
      education,
    };

    if (buttonTitle.toLowerCase() === "update") {
      payload.educationId = educationId;
      // @ts-ignore
      dispatch(updateEducation(payload)).then(() => onUpdate(token));
    } else {
      // @ts-ignore
      dispatch(addEducation(payload)).then(() => onUpdate(token));
    }

    setEducation({
      instituteName: "",
      courseName: "",
      startYear: "",
      endYear: "",
      percentage: "",
    });

    handleCancelClick();
  };

  useEffect(() => {
    if (educationId) {
      const payload = {
        token,
        educationId,
      };

      // @ts-ignore
      dispatch(getEducationDetails(payload));

      if (educationDetails) {
        setEducation({
          instituteName: educationDetails?.instituteName,
          courseName: educationDetails?.courseName,
          startYear: educationDetails?.startYear,
          endYear: educationDetails?.endYear,
          percentage: educationDetails?.percentage,
        });

        setStartYear(dayjs(educationDetails?.startYear, "YYYY"));
        setEndYear(dayjs(educationDetails?.endYear, "YYYY"));
      }
    }
  }, [educationId]);

  function handleCancel() {
    handleCancelClick();

    setEducation({
      instituteName: "",
      courseName: "",
      startYear: "",
      endYear: "",
      percentage: "",
    });
  }

  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: "inherit" }}>
        {formTitle}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="instituteName"
            label="University / School Name"
            name="instituteName"
            type="text"
            value={education.instituteName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="courseName"
            name="courseName"
            label="Course Name"
            type="text"
            value={education.courseName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <YearPicker
            label="Start Year"
            year={startYear}
            setYear={setStartYear}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <YearPicker label="End Year" year={endYear} setYear={setEndYear} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="percentage"
            name="percentage"
            label="Percentage %"
            type="text"
            value={education.percentage}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="success">
          {buttonTitle}
        </Button>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EducationDetailsForm;
