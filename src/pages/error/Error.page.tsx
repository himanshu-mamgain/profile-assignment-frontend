import {
  Avatar,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";

const Error: React.FC = () => {
    const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ReportIcon />
        </Avatar>
        <Typography variant="h4" sx={{ fontFamily: "inherit" }}>
          404 Page not found!
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          <ArrowBackIcon /> Go Back
        </Button>
      </Paper>
    </Container>
  );
};

export default Error;
