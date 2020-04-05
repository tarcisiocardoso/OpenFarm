import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    canvas: {
        border: '2px solid #d3d3d3'
    }
  }),
);

function CadastroProducaoPanel(props) {
    const classes = useStyles();
    const location = useLocation();
    const ref = useRef(null);
    const {producao} = props;

    useEffect(() => {
        console.log("--->CadastroProducaoPanel<---", producao);
    });

    return (
        <Container maxWidth="xl" className={classes.root} >
            <Paper>
            <Grid container spacing={3}>
                <Grid item xl={11}>
                    <Typography component="h1" variant="h5" align='center'>
                        Cadastro de produção
                    </Typography>
                </Grid>
                <Grid item xl={1}>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="caption" display="block" gutterBottom>
                        <div id="info_debug"></div>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    melhor layout?????
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
            </Grid>
            </Paper>
        </Container>
            );
}

export default CadastroProducaoPanel;