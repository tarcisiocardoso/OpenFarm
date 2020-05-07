import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Box, Button, Icon, Grid} from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IdentificacaoPanel from "./IdentificacaoPanel";
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useCurrentUser } from "../../server/UseCurrentUser";
import Alert from '@material-ui/lab/Alert';
import EscolhaFazenda from './EscolhaFazenda';
import ClimaPanel from './ClimaPanel';
import GastoPanel from './GastoPanel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FazendaMain() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isEdit, setEdit] = React.useState(false);
  const [arrFarm, setArrFar] = React.useState();
  const [error, setError] = React.useState();
  const isFirstRender= useRef(true);

  const [fazenda, setFazenda] = React.useState({
    identificacao: {
        nome: '',
        tamanho: 0,
        cep:'',endereco:'',cidade:'',estado:'',uf:'',telefone:'',email:'',responsavel:'',
        chuva:'',temperatura:'', estiagemInicio:'', estiagemFim:''
    }
  });
  let [profile, loading] = useCurrentUser();

  useEffect(() => {
    console.log('>>>useEffect FazendaMain<<<', profile );
    if( !loading ){
      if( !fazenda.proprietarios){
        let identificacao = {...fazenda.identificacao, responsavel: profile.name};
        setFazenda({...fazenda, proprietarios:[profile.id], identificacao:identificacao});
        if( !arrFarm){
          if(isFirstRender.current){
              isFirstRender.current=false
          }else{
              return;
          }
          fetch('/api/farm/user/'+profile.id)
          .then(response => response.json())
          .then(data => {
              console.log( data );
              setArrFar(data);
              if( data && data.length === 1){
                buscaFazenda(data[0].id);
              }
            })
          .catch(error => setError(error));
        }
      }
    }
  }, [fazenda, arrFarm]);

  const buscaFazenda = (id) => {
    fetch('/api/farm/'+id)
      .then(response => response.json())
      .then(data => {
        setFazenda(data)
        })
      .catch(error => setError(error));
    
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCommit = ()=> {
    setEdit(false);

    let farm = {...fazenda};
    fetch('/api/farm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( farm),
        credentials: 'include'
    }).then( response => response.json())
    .then(data => setFazenda ( data ))
    .catch( error => {
        console.log(">>ERRO<<", error );
    });
  }

  return (
    <div className={classes.root}>
        <Grid container >
          { error && 
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          }
          {
            arrFarm && arrFarm.length > 1 &&  
            <Grid item xs={12}>
              <EscolhaFazenda farms={arrFarm} />    
            </Grid>
          }
          <Grid item xs={10}>
            { fazenda && <h1>{fazenda.identificacao.nome}</h1>}
            
          </Grid>
          <Grid item xs={2}>
            <Grid container alignItems="flex-start" justify="flex-end">
              {isEdit &&
                <Button onClick={handleCommit}><Icon color="primary">save</Icon>Salvar</Button>
              }
            </Grid>
          </Grid>
        </Grid>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Identificaçao" icon={<HomeWorkIcon />} {...a11yProps(0)} />
          <Tab label="Clima da micro região" icon={<CloudQueueIcon />} {...a11yProps(1)} />
          <Tab label="Gasto Fixo" icon={<AttachMoneyIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <IdentificacaoPanel fazenda={fazenda} setFazenda={setFazenda} isEdit={isEdit} setEdit={setEdit}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClimaPanel fazenda={fazenda} setFazenda={setFazenda} isEdit={isEdit} setEdit={setEdit}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GastoPanel fazenda={fazenda} setFazenda={setFazenda} isEdit={isEdit} setEdit={setEdit}/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
