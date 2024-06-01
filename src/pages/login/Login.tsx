import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Password from "../../components/password/Password";
import AuthLink from "../../components/auth-link/AuthLink";
import RememberMe from "../../components/remember-me/RememberMe";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router";

const validationSchema = yup.object({
  phone: yup
    .string()
    .min(10, "Enter a valid mobile number")
    .required("Phone is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // @ts-ignore
      dispatch(loginUser(values));
    },
  });

  const { isVerified, isLoggedIn } = useSelector(
    (state: { auth: any }) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // @ts-ignore
  //   dispatch(loginUser(formData));
  // };

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
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="mobile"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <Password
                  id="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
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
