import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const RememberMe: React.FC = () => {
  return (
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="primary" />}
        label="Remember Me"
      />
    </Grid>
  );
};

export default RememberMe;
