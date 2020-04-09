import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { useCurrentUser } from "../../server/UseCurrentUser";
import Alert from '@material-ui/lab/Alert';
import PiquetePanel from './PiquetePanel';
import CadastroProducaoPanel from './CadastroProducaoPanel';
import VolumosoPanel from './VolumosoPanel';

const useStyles = makeStyles((theme) =>
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

function Producao() {
    const classes = useStyles();
    const [wait, setWait] = useState(true);
    const location = useLocation();
    const [producao, setProducao] = useState();
    const [error, setError] = useState();
    const [path, setPath] = useState();
    let [profile, carregando] = useCurrentUser();

    useEffect(() => {
        console.log("--->", location);
        if (!producao) {
            const search = location.search;
            const id = search.split('id=')[1];
            const arr = location.pathname.split("/");
            if (arr.length > 2) {
                let i=0;
                let pathArray= []
                for(i=2; i < arr.length; i++){
                    pathArray.push(arr[i]);
                }
                setPath(pathArray);
                fetch("/api/userProduction/" + id)
                .then(response => response.json())
                .then(data => {
                    setProducao(data);
                    setWait( false );
                })
                .catch(error => setError(error));

            }
        }
    }, [producao]);

    const salvaProducao=(prod)=>{
        console.log(prod);

        fetch('/api/userProduction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prod),
            credentials: 'include'
        }).then( response => response.json())
        .then(data => setProducao ( data ) )
        .catch( error => setError(error));
    }

    return (

        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                {
                    hasPiquete() && 
                    <Grid item xs={12}>
                        <Paper>
                            <Typography component="h1" variant="h5" align='center'>
                                <PiquetePanel producao={producao} />
                            </Typography>
                        </Paper>
                    </Grid>
                }
                {
                    hasProducao() && 
                        <CadastroProducaoPanel producao={producao} setProducao={setProducao} setError={setError}/>
                }
                {
                    hasVolumoso() && 
                        <VolumosoPanel producao={producao} setProducao={setProducao} salva={salvaProducao} />
                }
                { error && 
                    <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>
                }

            </Grid>
            <Backdrop className={classes.backdrop} open={wait} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </Container>

    );

    function hasPiquete(){
        if( wait) return false;
        if( !path ) return false;
        return path.find(item => item.includes('piquete'));
    }

    function hasProducao(){
        if( wait) return false;
        if( !path ) return false;
        return path.find(item => item.includes('producao'));
    }
    function hasVolumoso(){
        if( wait) return false;
        if( !path ) return false;
        return path.find(item => item.includes('volumoso'));
    }

}

export default Producao;