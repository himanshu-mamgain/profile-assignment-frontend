import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { checkLogin } from "../../store/slices/auth.slice";
import { CONSTANTS } from "../../constants/constants";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: { auth: any }) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // @ts-ignore
      dispatch(checkLogin(token));
    }
  }, [token]);

  function handlePingClick() {
    fetch(`${CONSTANTS.BASE_URL}/ping`);
    toast.success('Ping succsefull')
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: "inherit", m: 2 }}>
              Hi, this is assignment Home page
            </Typography>
            <Typography sx={{ fontFamily: "inherit", m: 2 }}>
              Note: If the backend server is not responding please click this
              button
            </Typography>
            <Button variant="contained" onClick={handlePingClick}>Ping Server</Button>
            <Typography sx={{ fontFamily: "inherit", m: 2 }}>
              Pinging server is required because this project is deployed free
              of cost and backend server can be inactive!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} spacing={2}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: "inherit", m: 2 }}>
              Let's get started!
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={
                isLoggedIn
                  ? () => navigate("/profile")
                  : () => navigate("/register")
              }
            >
              {isLoggedIn ? "Go to Profile page" : "Register"}
            </Button>
            <Typography variant="h6" sx={{ fontFamily: "inherit", m: 2 }}>
              Click on the above button to register yourself and create your
              profile!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
