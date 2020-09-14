import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <TrackChangesIcon />
          <Typography variant="h6" className={classes.title}>
            Retire<strong>Easy</strong> Employee Retirement Savings Management
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
