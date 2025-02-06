import React, { useState } from "react";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import { User } from "../../../typed";
import { useAppDispatch } from "../../../app/hooks.ts";
import { unsetUser } from "../../../store/slices/userSlice.ts";
import { logout } from "../../../store/thunks/userThunk.ts";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  return (
    <Grid display="flex" alignItems="center">
      <Button color="inherit" component={NavLink} to="/add-artist">
        Add artist
      </Button>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          height: "2rem",
          alignSelf: "center",
          marginX: 1,
        }}
      />
      <Button color="inherit" component={NavLink} to="/add-album">
        Add album
      </Button>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          height: "2rem",
          alignSelf: "center",
          marginX: 1,
        }}
      />
      <Button color="inherit" component={NavLink} to="/add-track">
        Add track
      </Button>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          height: "2rem",
          alignSelf: "center",
          marginX: 1,
        }}
      />
      <Button color="inherit" component={NavLink} to="/track_history">
        Track history
      </Button>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          height: "2rem",
          alignSelf: "center",
          marginX: 1,
        }}
      />
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName ? user.displayName : user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Avatar sx={{ ml: 1 }} src={user.avatar} alt={user.displayName} />
    </Grid>
  );
};

export default UserMenu;
