import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../../util/ConfirmDialog';
import ReprodutorForm from '../../prod/ReprodutorForm';
import MatrizForm from '../../prod/MatrizForm';
import MainProducao from './MainProducao';
import { useCurrentUser } from "../../../server/UseCurrentUser";
import PainelControleFazendeiro from './PainelControleFazendeiro';

import {
    Switch,
    Route,
    useRouteMatch,
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
    const [fazenda, setFazenda] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    let [profile] = useCurrentUser();

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
                    fetch("/api/userProduction/" + id)
                    .then(response => response.json())
                    .then(data => buscaFazenda(data))
                    .catch(error => setError(error));
                }
            }else{
                setWait(false);
            }
    }, [producao, location]);
    
    function updateProducao(prod){
        setProducao( prod );
        setShowSave(true);
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
    function isPerfilFazenda(){
        return profile && profile.perfis.find(item => item === 'fazenda')
    }
    return (
        <Container maxWidth="xl" className={classes.root} >
            
            <Backdrop className={classes.backdrop} open={wait } >
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
                    { isPerfilFazenda() ? 
                        <PainelControleFazendeiro user={profile}/>
                        :
                        <h2>não implementado</h2>
                    }
                </Route>
            </Switch>

        </Container>

            );
        
        }
        
export default PainelControle;
