import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Password from "../../components/password/Password";
import AuthLink from "../../components/auth-link/AuthLink";
import RememberMe from "../../components/remember-me/RememberMe";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, loginUser } from "../../store/slices/auth.slice";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const { isVerified, isLoggedIn } = useSelector(
    (state: { auth: any }) => state.auth
  );

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // @ts-ignore
    dispatch(loginUser(formData));
  };

  // useEffect(() => {
  //   if (token) {
  //     // @ts-ignore
  //     dispatch(checkLogin());
  //   }
  // }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      if (isVerified) {
        navigate("/profile");
      } else {
        navigate("/otp-verification");
      }
    }
  }, [isLoggedIn, isVerified, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Paper sx={{ m: 2, p: 3 }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Phone Number"
                  name="phone"
                  autoComplete="mobile"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Password name="Password" onChange={handleChange} />
              </Grid>
              <RememberMe />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <AuthLink
              text={"Don't have an account? Sign up"}
              link={"/register"}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
