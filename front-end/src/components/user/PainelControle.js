import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "margin-top": "50px"
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
  }),
);

function PainelControle() {
    const classes = useStyles();
    const [wait, setWait] = useState(true);
    const location = useLocation();
    const [producao, setProducao] = useState();

    useEffect(() => {
        console.log("--->", location);
        const arr = location.pathname.split("/");
        if( arr.length > 2){
            setProducao(arr[2]);
        }
    }, [producao]);

    return (

        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                    <Typography component="h1" variant="h5" align='center'>
                        Ainda não implementado {producao && ">>>dashboard "+producao+"<<<"}
                    </Typography>
                    </Paper>
                </Grid>

                <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>
                {(location.pathname === '/') ? <Redirect to="/home" /> : ""}
            </Grid>
            <Backdrop className={classes.backdrop} open={wait} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>

            );
        
        }
        
export default PainelControle;