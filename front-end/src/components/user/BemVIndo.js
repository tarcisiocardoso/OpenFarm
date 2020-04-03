import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useCurrentUser } from "../../server/UseCurrentUser";
import Spinner from 'react-spinner-material';
import './BemVindo.css';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function BemVindo() {
  const classes = useStyles();
  let [profile, loading] = useCurrentUser();

  const renderWellCome = (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Bem vindo { profile && profile.name }</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    
  );
  return (
    <div className={classes.root}>
    {
        loading ? (
            <div className="center">
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
            </div>
        ) : renderWellCome
    }
    </div>
  );
}


  export default BemVindo;