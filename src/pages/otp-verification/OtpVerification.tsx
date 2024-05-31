import { useEffect, useRef, useState } from "react";
import { Drafts } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { isVerified } = useSelector((state: { auth: any }) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(Number(e.target.value))) return;

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move focus to the next input element if a value is entered
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const payload = {
      otp: Number(otp.join("")),
      userId: localStorage.getItem("userId"),
    };
    // @ts-ignore
    dispatch(verifyOtp(payload));
  };

  useEffect(() => {
    if (isVerified) {
      navigate("/login");
    }
  }, [isVerified]);

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Drafts />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontFamily: "inherit" }}>
          OTP Verification
        </Typography>
        <Paper sx={{ m: 2, p: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
          >
            <Typography variant="h6" sx={{ fontFamily: "inherit" }}>
              Please enter otp sent to your registered email address
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              margin="auto"
              width={"500px"}
              gap={2}
            >
              {otp.map((data, index) => (
                <TextField
                  key={index}
                  value={data}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, index)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(e, index)
                  }
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center" },
                  }}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!otp.every((value) => value.length === 1)}
              onClick={handleVerify}
            >
              Verify
            </Button>
            <Typography sx={{ fontFamily: "inherit" }} color="red">
              Note: Please check your spam folder
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default OtpVerification;
