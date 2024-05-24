import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export interface AuthLinkProps {
  text: string;
  link: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ text, link }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <NavLink to={link}>{text}</NavLink>
      </Grid>
    </Grid>
  );
};

export default AuthLink;
