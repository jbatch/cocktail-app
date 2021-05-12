import React from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

const useStyles = makeStyles((theme) => ({
  red: {
    backgroundColor: 'red',
  },
}));
type Props = {} & RouteComponentProps;
export default function Bar(props: Props) {
  const classes = useStyles();
  return <div className={classes.red}>Bar</div>;
}
