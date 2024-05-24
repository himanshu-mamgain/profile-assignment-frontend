import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ProfilePhoto from "../profile-photo/ProfilePhoto";
import { Edit, Save } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBasicDetails } from "../../store/slices/profile.slice";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface BasicDetailsProps {
  data: ProfileData;
  photo: string;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ data, photo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<Omit<ProfileData, "phone">>({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBasicDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const payload = {
      token,
      basicDetails,
    };

    // @ts-ignore
    dispatch(updateBasicDetails(payload));

    setEdit(false);
  };

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "inherit", p: 2, pt: 0 }}>
            Basic Details
          </Typography>
          {edit ? (
            <IconButton onClick={handleSave}>
              <Save />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEdit(!edit)}>
              <Edit />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            gap: 5,
          }}
        >
          <ProfilePhoto photo={photo} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  defaultValue={data.name}
                  InputProps={{
                    readOnly: !edit,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  defaultValue={data.email}
                  InputProps={{
                    readOnly: !edit,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  defaultValue={data.phone}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BasicDetails;
