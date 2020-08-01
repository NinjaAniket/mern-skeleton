import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { update, read } from "./api-user";
import { Redirect } from "react-router";
import useStyles from "./styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Icon,
  CardActions,
  Button,
} from "@material-ui/core";

export default function Editprofile({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    redirectToProfile: false,
    error: "",
    open: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update(
      {
        userId: match.params.userId,
      },
      {
        t: jwt.token,
      },
      user
    ).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          userId: data._id,
          redirectToProfile: true,
        });
      }
    });
  };
  const changeHandler = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.userId} />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={changeHandler("name")}
            margin="normal"
          />
          <TextField
            id="email"
            label="email"
            className={classes.textField}
            value={values.email}
            onChange={changeHandler("email")}
            margin="normal"
          />
          <TextField
            id="password"
            label="password"
            className={classes.textField}
            value={values.password}
            onChange={changeHandler("password")}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
