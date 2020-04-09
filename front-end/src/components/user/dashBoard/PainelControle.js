import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { useCurrentUser } from "../../../server/UseCurrentUser";
import { Paper, Grid, Typography, Backdrop, CircularProgress, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PainelControleProducaoPanel from './PainelControleProducaoPanel';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "margin-top": "5px"
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
    const [showSave, setShowSave] = useState(false);
    const location = useLocation();
    const [producao, setProducao] = useState();
    const [dashboardNome, setDashBoardNome] = useState();
    const [error, setError] = useState();
    const [path, setPath] = useState();
    const [fazenda, setFazenda] = useState();
    const [profile, carregando] = useCurrentUser();

    useEffect(()=>{
        if ( fazenda) setDashBoardNome(fazenda.identificacao.nome+" - "+producao.nomeProducao+ " - "+producao.dados.producao.qtdAdulto+" matrizes");
    }, [fazenda]);

    useEffect(() => {
        const arr = location.pathname.split("/");
            if (arr.length > 2) {
                if (!producao) {
                    const id = arr[2];
                    let i=0;
                    let pathArray= []
                    for(i=2; i < arr.length; i++){
                        pathArray.push(arr[i]);
                    }
                    setPath(pathArray);
                    fetch("/api/userProduction/" + id)
                    .then(response => response.json())
                    .then(data => buscaFazenda(data))
                    .catch(error => setError(error));
                }
            }else{
                setWait(false);
            }
    }, [producao]);

    function buscaFazenda(data){
        setProducao(data)
        fetch("/api/farm/" + data.idFazenda)
        .then(response => response.json())
        .then(data => {
            setFazenda(data);
            setWait( false );
        })
        .catch(error => setError(error));
    }

    function updateProducao(prod){
        setProducao( prod );
        setShowSave(true);
    }
    const handleSalva=(e)=>{
        console.log('AINDA NÃO IMPLEMTADO');
    }

    return (

        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={0}>
                <Grid item xs={10}>
                    { dashboardNome && 
                        <Typography variant="h6" align='center'>{dashboardNome}</Typography>
                    }
                </Grid>
                <Grid item xs={2} align='right'>
                    { showSave && 
                        <Button variant="outlined" color="primary" onClick={handleSalva}>
                            Salvar
                        </Button>
                    }
                </Grid>
                <Grid item xs={12}>
                    <PainelControleProducaoPanel fazenda={fazenda} producao={producao} update={updateProducao}/>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={wait || carregando} >
                <CircularProgress color="inherit" />
            </Backdrop>
            { error &&  <Alert severity="error">{error}</Alert> }
        </Container>

            );
        
        }
        
export default PainelControle;