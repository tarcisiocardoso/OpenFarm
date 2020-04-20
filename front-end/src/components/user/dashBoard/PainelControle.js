import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { useCurrentUser } from "../../../server/UseCurrentUser";
import { IconButton, Grid, Typography, Backdrop, CircularProgress, Button, Menu, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PainelControleProducaoPanel from './PainelControleProducaoPanel';
import ConfirmDialog from '../../../util/ConfirmDialog';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReprodutorForm from '../../prod/ReprodutorForm';
import MatrizForm from '../../prod/MatrizForm';
import MainProducao from './MainProducao';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams
  } from "react-router-dom";


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
    const [error, setError] = useState();
    const [path, setPath] = useState();
    const [fazenda, setFazenda] = useState();
    const [profile, carregando] = useCurrentUser();
    const [showConfirm, setShowConfirm] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    let match = useRouteMatch();

    useEffect(() => {
        if( location.state && location.state.showSave )setShowSave(true);
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
    
    function updateProducao(prod){
        setProducao( prod );
        setShowSave(true);
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleReprodutorForm=()=>{
        handleClose();
    }
  
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

    const handleSalva=(e)=>{
        setShowConfirm(true);
    }
    function salvaProducao(){
        let prod = {...producao};
        fetch('/api/userProduction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prod),
            credentials: 'include'
        }).then( response => response.json())
        .then(data => setShowSave(false) )
        .catch( error => setError(error));
        
    }
    return (
        <Container maxWidth="xl" className={classes.root} >
            
            <Backdrop className={classes.backdrop} open={wait || carregando} >
                <CircularProgress color="inherit" />
            </Backdrop>
            { error &&  <Alert severity="error">{error}</Alert> }
            <ConfirmDialog 
                open={showConfirm} 
                setOpen={setShowConfirm}
                titulo={'Salvar produção'}
                msg={'Confirma atualizar dados de produção no servidor?'}
                exec={salvaProducao}
                />

            <Switch>
                <Route path={`${match.path}/prod/:topicId`}>
                    <Topic />
                </Route>
                <Route path={`${match.path}/:id/reprodutor`}>
                    <ReprodutorForm
                        producao={producao} 
                        updateProducao={updateProducao} 
                        fazenda={fazenda} 
                        setShowConfirm={setShowConfirm}
                    />
                </Route>
                <Route path={`${match.path}/:id/matriz`}>
                    <MatrizForm
                        producao={producao} 
                        updateProducao={updateProducao} 
                        fazenda={fazenda} 
                        setShowConfirm={setShowConfirm}
                    />
                </Route>
                <Route path={`${match.path}/:id`}>
                    <MainProducao 
                        producao={producao} 
                        updateProducao={updateProducao} 
                        fazenda={fazenda} 
                        setShowConfirm={setShowConfirm}
                        showSave={showSave}
                    />
                </Route>
                <Route path={match.path}>
                    <h1>Não implementado</h1>
                </Route>
            </Switch>

        </Container>

            );
        
        }
        
export default PainelControle;

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }