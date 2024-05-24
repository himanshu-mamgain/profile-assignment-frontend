import { Home, Logout } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../../store/slices/auth.slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logOut());
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton onClick={() => navigate("/")}>
        <Home />
      </IconButton>
      <IconButton onClick={handleLogOut}>
        <Logout />
      </IconButton>
    </Box>
  );
};

export default Header;
