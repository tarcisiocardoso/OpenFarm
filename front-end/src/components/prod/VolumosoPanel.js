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

    useEffect(() => {
        console.log("--->VolumosoPanel--<", producao);

        // let pastoMS = producao.dados.pasto.ProducaoMS;
        // let area = producao.dados.producao.areaProducaoEmHE;
        // let qtdAdulto = producao.dados.producao.qtdAdulto;
        // let pesoPedio = (producao.dados.matriz.peso[0] + producao.dados.matriz.peso[1])/2;

        // let producaoTotal = ((pastoMS[0]+pastoMS[1])/2) * area;

        // let consumo = (qtdAdulto * pesoPedio) * 0.03;// 3%

        // setProducaoConsumoAnual( [producaoTotal, consumo] );

    }, [producao]);

    return (
        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" align='center'>
                        Fornecimento de Volumoso
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                <Alert severity="info">
                    Em média o consumo de volumoso é 3% do peso vivo do animal e o fornecimento em geral consiste em pasto, silo, feno e capineira.
                </Alert>
                </Grid>
                <Grid item xs={4}>
                    <ChartPieProduto labels={['Consumo', 'Produção']} dados={[10,12]} titulo={'Consumo vs Produção'}/>
                </Grid>
                <Grid item xs={8}>

                    lalalala
                </Grid>
            </Grid>
        </Container>
            );

}

export default VolumosoPanel;