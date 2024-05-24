import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import EducationDetailsForm, {
  EducationDetails as EducationDetailsData,
} from "../education-details-form/EducationDetailsForm";
import EducationDetails from "../education-details/EducationDetails";

const EducationQualifications: React.FC<{
  educationDetails: EducationDetailsData[];
  onUpdate: () => void;
}> = ({ educationDetails, onUpdate }) => {
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [educationId, setEducationId] = useState<string>("");

  return (
    <Box sx={{ my: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{ fontFamily: "inherit", p: 2, pt: 0, mb: 1 }}
        >
          Education Qualifications
        </Typography>
        <Box>
          {edit ? (
            <EducationDetailsForm
              formTitle="Update Education"
              buttonTitle="Update"
              educationId={educationId}
              handleCancelClick={() => {
                setEdit(!edit), setEducationId("");
              }}
              onUpdate={onUpdate}
            />
          ) : (
            educationDetails &&
            educationDetails.length > 0 &&
            educationDetails?.map(
              (educationDetailsData: EducationDetailsData, index: number) => (
                <EducationDetails
                  key={index}
                  _id={educationDetailsData._id}
                  instituteName={educationDetailsData.instituteName}
                  courseName={educationDetailsData.courseName}
                  startYear={educationDetailsData.startYear}
                  endYear={educationDetailsData.endYear}
                  percentage={educationDetailsData.percentage}
                  setEducationId={setEducationId}
                  edit={edit}
                  setEdit={setEdit}
                />
              )
            )
          )}
        </Box>
        {addFlag ? (
          <EducationDetailsForm
            formTitle="Add Education"
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

export default EducationQualifications;
