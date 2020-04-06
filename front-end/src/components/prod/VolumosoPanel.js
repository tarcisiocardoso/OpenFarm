import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ChartPieProduto from './ChartPieProduto';

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
    const {producao} = props;
    const [producaoConsumoAnual, setProducaoConsumoAnual] = useState();
    const [infoMsg, setInfoMsg] = useState();
    const [alertMsg, setAlertaMsg] = useState();
    const [label, setLabel] = useState();

    useEffect(() => {
        console.log("--->VolumosoPanel--<", producao);

        let piquete = producao.dados.pasto.piquetes;
        let producaoTotal=0;
        let consumo =0;
        if( piquete && piquete > 2){
           calculoComPiquete(); 
        }else{
           calculoComUA();
        }
        
    }, [producao]);

    function calculoComPiquete(){
        let pastoMS = producao.dados.pasto.producaoMS;
        let area = producao.dados.producao.areaProducaoEmHE;
        let qtdAdulto = producao.dados.producao.qtdAdulto;
        let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;

        let producaoTotal = pastoMS[0];
        // TODO erificar piquetes
        producaoTotal = producaoTotal * area;

        let consumoDiario = ((qtdAdulto * pesoMedio) * 0.03);//1000;// 3%
        let consumo = (consumoDiario * 365)/1000;//consumo anual em tonelada

        setProducaoConsumoAnual( [consumo, producaoTotal] );
        setLabel(['Consumo', 'Produção']);
        
        let dif = producaoTotal - consumo;
        if( dif > 0){
            let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
            let consumoBaseAno = (pesoMedio * 0.03)*360/1000;
            let qtd = dif / consumoBaseAno;
            setInfoMsg("Sua produção supera o consumo em "+ parseInt(dif)+" tonelada ha/ano podendo ter um acrescimo de animais adulto em "+parseInt(qtd)+" cabeças.");
            setAlertaMsg();
        }else{
            setAlertaMsg("Sua produção não supre a necessidade de volumos dos animais adulto, sendo necessario um complemento de "+ parseInt(Math.abs( dif) )+" tonelada ha/ano em silo, feno, silagem ou capineira");
            setInfoMsg();
        }
    }
    function calculoComUA(){
        let UA = producao.dados.consumo.UA;
        let pesoMedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;
        let qtdAdulto = producao.dados.producao.qtdAdulto;
        let area = producao.dados.producao.areaProducaoEmHE;

        let suporte = (UA /pesoMedio) * area; 

        console.log( suporte );
        setLabel(['Capacidade', 'Quantidad de adulto']);
        setProducaoConsumoAnual( [suporte, qtdAdulto] );

        let dif = parseInt( suporte - qtdAdulto);
        if( dif > 0 ){
            setInfoMsg("A taxa de lotação animais tendo uma UA com "+UA+" kg permite um acrescimo de "+dif+" animais");
            setAlertaMsg();
        }else{
            setInfoMsg();
            setAlertaMsg("Taxa de lotação animal considerando uma UA com "+UA+" ultrapaça o limite em "+ Math.abs( dif)+" animais adultos.");
        }
    }
    return (
        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" align='center'>
                        Fornecimento de Volumoso
                    </Typography>
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
                    <ChartPieProduto labels={label} dados={producaoConsumoAnual} titulo={'Consumo vs Produção em Toneladas'}/>
                </Grid>
                <Grid item xs={8}>

                    lalalala
                </Grid>
            </Grid>
        </Container>
            );

}

export default VolumosoPanel;