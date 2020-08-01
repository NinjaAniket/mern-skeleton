import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";
import { Redirect } from "react-router-dom";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

// import { DeleteIcon } from "@material-ui/icons/Delete";

function DeleteProfile({ userId }) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    remove(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJwt(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteProfile;
