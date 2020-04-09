import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress, IconButton, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ChartPieProduto from './ChartPieProduto';
import ComplementoForm from './ComplementoForm';
import SaveIcon from '@material-ui/icons/Save';
import ChartBarHorizontal from './ChartBarHorizontal';

const useStyles = makeStyles((theme) =>
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

function VolumosoPanel(props) {
    const classes = useStyles();
    const location = useLocation();
    const ref = useRef(null);
    const {producao, setProducao, salva} = props;
    const [producaoConsumoAnual, setProducaoConsumoAnual] = useState();
    const [complemento, setComp] = useState();
    const [tituloChart, setTituloChart] = useState('');
    const [showSalvar, setShowSalvar] = useState(false);
    const [infoMsg, setInfoMsg] = useState();
    const [alertMsg, setAlertaMsg] = useState();
    const [label, setLabel] = useState();
    const [dadosComplemento, setDadosComplemento] = useState();

    

    useEffect(() => {
        console.log("--->VolumosoPanel--<", producao);

        const piquete = producao.dados.pasto.piquetes;
        const silo=producao.dados.complemento.silo;
        const feno=producao.dados.complemento.feno;
        const capineira=producao.dados.complemento.capineira;
        setComp({
            piquete: piquete?piquete:0,
            silo: silo?silo:0,
            feno: feno?feno:0,
            capineira:capineira?capineira:0
        });

        if( piquete && piquete > 2){
           calculoComPiquete(); 
        }else{
           calculoComUA();
        }
        
    }, [producao]);
    const setComplemento=(c)=>{
        console.log('complemento', c);
        setComp(c);
        setShowSalvar(true);
        let piquete = producao.dados.pasto.piquetes;
        if( c['piquete'] ){
            piquete = c['piquete'];
        }else{
            piquete = 0;
        }

        setProducao({...producao, dados:{...producao.dados, 'complemento':{silo:c.silo, feno:c.feno, capineira:c.capineira}, 
            pasto:{...producao.dados.pasto, ['piquetes']:piquete} }});
    }

    function calculoComPiquete(){
        let pastoMS = producao.dados.pasto.producaoMS;
        let area = producao.dados.producao.areaProducaoEmHE;
        let qtdAdulto = producao.dados.producao.qtdAdulto;
        let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;

        let producaoTotal = pastoMS[0];
        // TODO erificar piquetes
        producaoTotal = producaoTotal * area;

        const cpl = calculoComplemento()
        //qtdAdulto -= (cpl.silo+cpl.feno+cpl.capineira);
        if( cpl.capineira > 0 ){
            producaoTotal += producao.dados.complemento.capineira;
        }
        qtdAdulto -= (cpl.silo+cpl.feno);

        let consumoDiario = ((qtdAdulto * pesoMedio) * 0.03);//1000;// 3%
        let consumo = (consumoDiario * 365)/1000;//consumo anual em tonelada

        setProducaoConsumoAnual( [consumo, producaoTotal] );
        setLabel(['Consumo', 'Produção']);
        setTituloChart("Consumo vs Produção em Toneladas")
        
        let dif = producaoTotal - consumo;
        if( dif > 1){
            let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
            let consumoBaseAno = (pesoMedio * 0.03)*360/1000;
            let qtd = dif / consumoBaseAno;
            setInfoMsg("Sua produção supera o consumo em "+ parseInt(dif)+" tonelada ha/ano podendo ter um acrescimo de animais adulto em "+parseInt(qtd)+" cabeças.");
            setAlertaMsg();
        }else if( dif < -1){
            setAlertaMsg("Sua produção não supre a necessidade de volumos dos animais adulto, sendo necessario um complemento de "+ parseInt(Math.abs( dif) )+" tonelada ha/ano em feno, silagem ou capineira");
            setInfoMsg();
        }else{
            setAlertaMsg();
            setInfoMsg();
        }
    }
    function calculoComUA(){
        let UA = producao.dados.consumo.UA;
        let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
        let qtdAdulto = producao.dados.producao.qtdAdulto;
        const cpl = calculoComplemento()
        qtdAdulto -= (cpl.silo+cpl.feno+cpl.capineira);

        let area = producao.dados.producao.areaProducaoEmHE;

        let suporte = (UA /pesoMedio) * area; 

        console.log( suporte );
        setLabel(['Capacidade', 'Qtd de adulto']);
        setProducaoConsumoAnual( [suporte, qtdAdulto] );
        setTituloChart("Taxa de lotação animal");

        let dif = parseInt( suporte - qtdAdulto);
        if( dif > 1 ){
            setInfoMsg("A taxa de lotação animais tendo uma UA com "+UA+" kg permite um acrescimo de "+dif+" animais");
            setAlertaMsg();
        }else if( dif < -1) {
            setInfoMsg();
            setAlertaMsg("Taxa de lotação animal considerando uma UA de "+UA+"kg ultrapassa o limite em "+ Math.abs( dif)+" animais adultos.");
        }else{
            setInfoMsg();
            setAlertaMsg("Taxa de lotação animal considerando uma UA de "+UA+"kg ultrapassa o limite em "+ Math.abs( dif)+" animais adultos.");
        }
    }
    function calculoComplemento(){
        const silo = decrementaDevidoComplementacao(producao.dados.complemento.silo);
        const feno = decrementaDevidoComplementacao(producao.dados.complemento.feno);
        let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
        let capineira = producao.dados.complemento.capineira?producao.dados.complemento.capineira:0;
        if( capineira > 0 ){
            capineira = (capineira * 1000)/365 * (pesoMedio * 0.03);
        }
        setDadosComplemento([parseInt(silo), parseInt(feno), parseInt(capineira) ]);
        return {
            silo: silo,
            feno: feno,
            capineira: capineira
        }
    }
    
    function decrementaDevidoComplementacao(complemento){
        let result = 0;
        if( complemento && complemento > 0 ){ // decrementa devido a suplementacao
            let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
            result = complemento/(pesoMedio * 0.03);

            console.log(complemento, "xxxxxxxxxxxxxxxx", result)
        }
        return result;
    }
    const handleSave = (e)=> {
        setShowSalvar(false);
        salva( producao );
    }
    
    return (
        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h5" align='center'>
                        Fornecimento de Volumoso para {producao.dados.producao.qtdAdulto} animais adultos em { producao.dados.producao.areaProducaoEmHE} hectare por ano
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    {showSalvar &&
                        <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSave}
                        startIcon={<SaveIcon />}
                        >
                        Salvar
                    </Button>
                    }
                </Grid>
                { alertMsg &&
                    <Grid item xs={12}>
                        <Alert severity="warning"> {alertMsg} </Alert>
                    </Grid>
                }
                { infoMsg && 
                    <Grid item xs={12}>
                    <Alert severity="info">
                        {infoMsg}
                    </Alert>
                    </Grid>
                }
                <Grid item xs={4}>
                    <ChartPieProduto labels={label} dados={producaoConsumoAnual} titulo={tituloChart}/>
                </Grid>
                { complemento && 
                    <Grid item xs={8}>
                        <ComplementoForm dados={complemento} setDados={setComplemento} salvar={handleSave}/>
                        { dadosComplemento &&
                            <ChartBarHorizontal titulo={'Fornecimento Diário'} dados={dadosComplemento} labels={['Silo', 'Feno', 'Capineira']} label={'Animais'} />
                        }
                    </Grid>
                }
            </Grid>
        </Container>
            );

}

export default VolumosoPanel;