import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { FaUserNurse } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
        <FaUserNurse />
      </IconButton>

      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={onProfileClick}>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
