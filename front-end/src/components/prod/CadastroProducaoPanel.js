import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, IconButton, TextField, FormControl, InputLabel, 
    Input, InputAdornment } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
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
    },
    espaco: {
        marginLeft: theme.spacing(2)
    }
  }),
);

function CadastroProducaoPanel(props) {
    const classes = useStyles();
    const location = useLocation();
    const ref = useRef(null);
    const [campos, setCampos] = useState({
        valorPVInicial: '',
        valorPVFinal:   '',
        valorCouroMN:   '',
        valorCouroMM:   '',
        valorLeiteMN:   '',
        valorLeiteMM:   '',
    })
    const {producao} = props;
    const [showInfo, setShowInfo] = useState(false);
    const [menorMaiorLabel] = useState(['Minimo', 'Maximo']);
    const [menorMaiorDado, setMenorMaiorDado] = useState([20, 60]);
    const [info] = useState({
        titulo:"Não implementado",
        descricao: "Não implementado"
    })

    useEffect(() => {
        console.log("--->CadastroProducaoPanel<---", producao);
        let p = producao.dados.producao;
        
        setCampos({
            valorPVInicial: p.carnePesoVivo[0],
            valorPVFinal: p.carnePesoVivo[1],
            valorCouroMN: p.couro[0],
            valorCouroMM: p.couro[1],
            valorLeiteMN: p.laKg[0],
            valorLeiteMM: p.laKg[1],
        })

    }, [producao]);

    useEffect(() => {
        console.log("--->CadastroProducaoPanel CAMPOS<---", campos);

        let menor = parseFloat( campos.valorCouroMN? campos.valorCouroMN:0);
        menor += parseFloat( campos.valorLeiteMN? campos.valorLeiteMN: 0 );
        menor += parseFloat( campos.valorPVInicial? campos.valorPVInicial:0);

        let maior = parseFloat(campos.valorCouroMM? campos.valorCouroMM:0 );
        maior +=    parseFloat(campos.valorLeiteMM? campos.valorLeiteMM: 0);
        maior +=    parseFloat(campos.valorPVFinal? campos.valorPVFinal:0 );

        console.log( menor, maior) ;
        setMenorMaiorDado([menor, maior]);

    }, [campos]);

    const handleChange = (e) => {
        setCampos({...campos, [e.target.name]:e.target.value});
    }

    return (
        <Container maxWidth="xl" className={classes.root} >
            <Paper>
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <Typography component="h1" variant="h5" align='center'>
                        Cadastro de produção
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" aria-label="Informação" onClick={() => setShowInfo(true)}>
                        <InfoIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                <form noValidate >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="span">
                            Valor do peso vido em Kg
                        </Typography>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorPVInicial" 
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                            onChange={handleChange} 
                            value={campos.valorPVInicial}
                        />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input 
                            name="valorPVFinal" 
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={handleChange} value={campos.valorPVFinal}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="span">
                            Valor do couro
                        </Typography>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                            <Input className={classes.espaco} 
                                name="valorCouroMN" 
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                                onChange={handleChange} value={campos.valorCouroMN}
                            />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorCouroMM" 
                            label="Valor maximo" 
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={handleChange} value={campos.valorCouroMM}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="span">
                            Valor do litro do leite
                        </Typography>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                            <Input className={classes.espaco} 
                                name="valorLeiteMN" 
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                                onChange={handleChange} value={campos.valorLeiteMN}
                            />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorLeiteMM" 
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={handleChange} value={campos.valorLeiteMM}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ChartPieProduto labels={menorMaiorLabel} dados={menorMaiorDado} titulo="Direfença dos gastos"/>
                    </Grid>
                </Grid>
            </form>
                </Grid>
            </Grid>
            </Paper>
            <InfoDialog open={showInfo} setOpen={setShowInfo} info={info}/>
        </Container>
            );
}

export default CadastroProducaoPanel;