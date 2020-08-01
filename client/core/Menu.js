import React from "react";
import { withRouter } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MERN SKELETON
      </Typography>
      <Link to="/">
        <IconButton aria-label="HOME" style={isActive(history, "/")}>
          <HomeIcon />
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {auth.isAuthenticated() && (
        <span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => auth.clearJwt(() => history.push("/"))}
          >
            Sign Out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
