import React from "react";
import useStyles from "../user/styles";
import { GridList, GridListTile, Avatar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function FollowGrid({ people }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {people.map((person, i) => {
          return (
            <GridListTile style={{ height: 120 }} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar
                  src={"/api/users/photo/" + person._id}
                  className={classes.bigAvatar}
                />
                <Typography className={classes.tileText}>
                  {person.name}
                </Typography>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
