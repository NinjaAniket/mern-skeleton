import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Redirect } from "react-router";
import {
  Paper,
  Typography,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  makeStyles,
  List,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Person, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteProfile from "./DeleteProfile";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  //this effect only needs to reruns when id params changes. i.e move from one profile to another

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: match.params.userId,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={user.email}
          ></ListItemText>
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteProfile userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
