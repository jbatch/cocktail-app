import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  red: {
    backgroundColor: 'red',
  },
}));
export default function Bar() {
  const classes = useStyles();
  return <div className={classes.red}>Bar</div>;
}
