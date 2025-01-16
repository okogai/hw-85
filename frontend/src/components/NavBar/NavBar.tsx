import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
