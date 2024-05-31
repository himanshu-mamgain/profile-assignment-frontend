import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import YearPicker from "../shared/YearPicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addExperience,
  getExperienceDetails,
  updateExperience,
} from "../../store/slices/profile.slice";
import dayjs from "dayjs";

interface PastExperienceFormProps {
  formTitle: string;
  buttonTitle: string;
  experienceId?: string;
  handleCancelClick: () => void;
  onUpdate: (token: string) => void;
}

export interface ExperienceDetails {
  _id?: string;
  companyName: string;
  designation: string;
  startYear: string;
  endYear: string;
  setExperienceId?: any;
  edit?: boolean;
  setEdit?: any;
}

const PastExperienceForm: React.FC<PastExperienceFormProps> = ({
  formTitle,
  buttonTitle,
  experienceId,
  handleCancelClick,
  onUpdate,
}) => {
  const [experience, setExperience] = useState<ExperienceDetails>({
    companyName: "",
    designation: "",
    startYear: "",
    endYear: "",
  });
  const [startYear, setStartYear] = useState<dayjs.Dayjs>();
  const [endYear, setEndYear] = useState<dayjs.Dayjs>();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { experienceDetails } = useSelector(
    (state: { profile: any }) => state.profile
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setExperience((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Object.assign(experience, {
      startYear: startYear?.year(),
      endYear: endYear?.year(),
    });

    const payload: any = {
      token,
      experience,
    };

    if (token) {
      if (buttonTitle.toLowerCase() === "update") {
        payload.experienceId = experienceId;

        // @ts-ignore
        dispatch(updateExperience(payload)).then(() => {
          onUpdate(token);
        });
      } else {
        // @ts-ignore
        dispatch(addExperience(payload)).then(() => {
          onUpdate(token);
        });
      }
    }

    setExperience({
      companyName: "",
      designation: "",
      startYear: "",
      endYear: "",
    });

    handleCancelClick();
  };

  useEffect(() => {
    if (experienceId) {
      const payload = {
        token,
        experienceId,
      };

      // @ts-ignore
      dispatch(getExperienceDetails(payload));

      if (experienceDetails) {
        setExperience({
          companyName: experienceDetails.companyName,
          designation: experienceDetails.designation,
          startYear: experienceDetails.startYear,
          endYear: experienceDetails.endYear,
        });

        setStartYear(dayjs(experienceDetails?.startYear, "YYYY"));
        setEndYear(dayjs(experienceDetails?.endYear, "YYYY"));
      }
    }
  }, [experienceId]);

  function handleCancel() {
    handleCancelClick();

    setExperience({
      companyName: "",
      designation: "",
      startYear: "",
      endYear: "",
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
            id="companyName"
            label="Company Name"
            name="companyName"
            type="text"
            value={experience.companyName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="designation"
            name="designation"
            label="Designation"
            type="text"
            value={experience.designation}
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

export default PastExperienceForm;
