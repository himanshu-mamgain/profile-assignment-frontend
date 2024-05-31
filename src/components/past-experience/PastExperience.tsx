import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import PastExperienceForm, {
  ExperienceDetails as ExperienceDetailsData,
} from "../past-experience-form/PastExperienceForm";
import PastExperienceDetails from "../past-experience-details/PastExperienceDetails";

const PastExperience: React.FC<{
  experienceDetails: ExperienceDetailsData[];
  onUpdate: (token: string) => void;
}> = ({ experienceDetails, onUpdate }) => {
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [experienceId, setExperienceId] = useState<string>("");

  return (
    <Box sx={{ my: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{ fontFamily: "inherit", p: 2, pt: 0, mb: 1 }}
        >
          Past Experience
        </Typography>
        <Box>
          {edit ? (
            <PastExperienceForm
              formTitle="Update Experiene"
              buttonTitle="Update"
              experienceId={experienceId}
              handleCancelClick={() => {
                setEdit(!edit), setExperienceId("");
              }}
              onUpdate={onUpdate}
            />
          ) : (
            experienceDetails &&
            experienceDetails?.length > 0 &&
            experienceDetails.map(
              (experience: ExperienceDetailsData, index: number) => (
                <PastExperienceDetails
                  key={index}
                  _id={experience._id}
                  companyName={experience.companyName}
                  designation={experience.designation}
                  startYear={experience.startYear}
                  endYear={experience.endYear}
                  setExperienceId={setExperienceId}
                  edit={edit}
                  setEdit={setEdit}
                />
              )
            )
          )}
        </Box>
        {addFlag ? (
          <PastExperienceForm
            formTitle="Add Experiene"
            buttonTitle="Submit"
            handleCancelClick={() => setAddFlag(!addFlag)}
            onUpdate={onUpdate}
          />
        ) : (
          <>
            {edit ? null : (
              <Button variant="contained" onClick={() => setAddFlag(!addFlag)}>
                Add
              </Button>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PastExperience;
