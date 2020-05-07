import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button, Backdrop, CircularProgress, Container, Box, Paper, Typography } from '@material-ui/core';
import { useCurrentUser } from "../../../server/UseCurrentUser";
import EscolhaProducaoPanel from "./EscolhaProducaoPanel";
import InfoMinimoPanel from "./InfoMinimoPanel";
import ConfirmarPanel from './ConfirmarPanel';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function getSteps() {
  return ['Qual será a produção', 'Informações basicas', 'Proximos passos'];
}

var buscandoFarm = false;
export default function ProducaoWizard() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [fazenda, setFazenda] = React.useState({});
  const [arrFarm, setArrFarm] = React.useState();
  const [error, setError] = React.useState();
  const steps = getSteps();
  let [profile, loading] = useCurrentUser();
  // const [listaProducao, loadingProducao] = useFetch("/api/producao");
  const [loadingProducao, setLoadingProducao] = useState(true);
  const [listaProducao, setListaProducao]= useState([{
      id: 0,
      nome: '-'
    }]
  );
  const [disable, setDisable] = useState(true);
  const [producao, setProducao] = useState({
    id: 0,
    nome: '-'
  });
  const [dado, setDado] = useState({
    qtd: '',
    area: ''
  });

  useEffect(() => {
    console.log('>>>useEffect ProducaoWizard<<<', profile, fazenda, loading );
    if( profile ){
        if( !arrFarm && !buscandoFarm){
          buscandoFarm = true;
          fetch('/api/farm/user/'+profile.id)
          .then(response => response.json())
          .then(data => {
              console.log( data );
              setArrFarm(data);
              if( data && data.length === 1){
                setProducao({...producao, idFazenda:data[0].id});
                setFazenda({
                  id: data[0].id,
                  nome: data[0].identificacao.nome
                });
              }
            })
          .catch(error => setError(error));
        }
    }

    fetch( '/api/producao')
          .then(response => response.json())
          .then(data => {
              console.log('===========', data );
              setLoadingProducao(false);
              let pro = [...listaProducao];
              data.forEach(item =>{
                pro.push(item);
              });
              console.log('prod>>>>', pro);
              setListaProducao(pro);
              
            })
          .catch(error => setError(error));

  }, [profile]);

  const handleNext = () => {
    console.log('solicitarProducao', activeStep );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if( activeStep === 2){
      solicitarProducao();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return listaProducao.length > 1 && <EscolhaProducaoPanel setDisable={setDisable} listaProducao={listaProducao} 
        producao={producao} setProducao={setProducao} 
        fazenda={fazenda} setFazenda={setFazenda}
        arrFarm={arrFarm}
        />;
      case 1:
        return <InfoMinimoPanel producao={producao} setDisable={setDisable} dado={dado} setDado={setDado} />;
      case 2:
        return <ConfirmarPanel dado={dado} producao={producao} />;
      default:
        return "<h1>Desconhecido</h1>";
    }
  }

  function solicitarProducao() {
    console.log(producao, dado);

    let solicitacao = {
      data: new Date(),
      tipo: 'novaProducao',
      idUser: profile.id,
      idFazenda: fazenda.id,
      userAgent: navigator.userAgent,
      entrada: {
        user: dado,
        producao: producao
      }
    }

    console.log("enviando para o servidor", solicitacao);

    fetch('/api/solicitacaoProducao', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitacao),
      credentials: 'include'
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.log(">>ERRO<<", error);
      });
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container fixed>
        {activeStep === steps.length ? (
          <div>
            <center>
              <Alert severity="success">Sucesso — A solicitação de produção foi enviada!</Alert>
            </center>
            <Paper>
            <Typography variant="body1" gutterBottom>
                Aguarde a construção do sistema de produção. Apos a conclusão terá todo controle da produção ao alcance dos dedos.
            </Typography>
            </Paper>
            <Button href="/" color='primary' >Voltar para pagina principal</Button>
          </div>
        ) : (
            <div>
              {getStepContent(activeStep)}

              { error && 
                  <Alert severity="error">{error}</Alert>
              }
              
              <div>
                <Box component="span" m={1}>
                  <p />
                </Box>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Voltar
              </Button>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={disable && !loadingProducao}>
                  {activeStep === steps.length - 1 ? 'Concluir' : 'Proximo'}
                </Button>
              </div>
            </div>
          )}
      </Container>
      <Backdrop className={classes.backdrop} open={loadingProducao} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
