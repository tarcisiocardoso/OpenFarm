import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, IconButton, Button, 
    Input, InputAdornment } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
import ChartPieProduto from './ChartPieProduto';
import ChartBarProduto from './ChartBarProduto';
import {useFetch} from '../../server/UseFetch';

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
    const [labelValor, setLabelValor] = useState(['Leite', 'Carne', 'Couro', 'Lã']);
    const [valor, setValor] = useState([0,0,0]);
    const [campos, setCampos] = useState({
        valorPVInicial: '',
        valorPVFinal:   '',
        valorCouroMN:   '',
        valorCouroMM:   '',
        valorLeiteMN:   '',
        valorLeiteMM:   '',
        valorLaMN:      '',
        valorLaMM:      ''
    })
    const {producao, setProducao, setError} = props;
    const [showInfo, setShowInfo] = useState(false);
    const [hasChange, setHasChange] = useState(false);
    const [menorMaiorLabel] = useState(['Minimo', 'Maximo']);
    const [menorMaiorDado, setMenorMaiorDado] = useState([20, 60]);
    
    const [info, infoCarregando] = useFetch("/api/info");

    useEffect(() => {
        console.log("--->CadastroProducaoPanel<---", producao);
        let p = producao.dados.producao;
        
        setCampos({
            valorPVInicial: p.carnePesoVivo[0],
            valorPVFinal: p.carnePesoVivo[1],
            valorCouroMN: p.couro[0],
            valorCouroMM: p.couro[1],
            valorLeiteMN: p.leiteLitro[0],
            valorLeiteMM: p.leiteLitro[1],
            valorLaMN: p.laKg[0],
            valorLaMM: p.laKg[1],
        });

    }, [producao]);

    useEffect(() => {
        console.log("--->CadastroProducaoPanel CAMPOS<---", campos);

        let menor = parseFloat( campos.valorCouroMN? campos.valorCouroMN:0);
        menor += parseFloat( campos.valorLeiteMN? campos.valorLeiteMN: 0 );
        menor += parseFloat( campos.valorPVInicial? campos.valorPVInicial:0);
        menor += parseFloat( campos.valorLaMN? campos.valorLaMM:0);

        let maior = parseFloat(campos.valorCouroMM? campos.valorCouroMM:0 );
        maior +=    parseFloat(campos.valorLeiteMM? campos.valorLeiteMM: 0);
        maior +=    parseFloat(campos.valorLaMM? campos.valorLaMM: 0);
        maior +=    parseFloat(campos.valorPVFinal? campos.valorPVFinal:0 );
        function mediaLeite(){
            if( campos.valorLeiteMN && campos.valorLeiteMM ){
                return (parseFloat(campos.valorLeiteMN ) + parseFloat(campos.valorLeiteMM ))/2;
            }else{
                return (campos.valorLeiteMN)?parseFloat(campos.valorLeiteMN ):parseFloat(campos.valorLeiteMM );
            }
        }
        function mediaCarne(){
            if( campos.valorPVInicial && campos.valorPVFinal ){
                return (parseFloat(campos.valorPVInicial ) + parseFloat(campos.valorPVFinal ))/2;
            }else{
                return (campos.valorPVInicial)?parseFloat(campos.valorPVInicial ):parseFloat(campos.valorPVFinal );
            }
        }
        function mediaCouro(){
            if( campos.valorCouroMN && campos.valorCouroMM ){
                return (parseFloat(campos.valorCouroMN ) + parseFloat(campos.valorCouroMM ))/2;
            }else{
                return (campos.valorCouroMN)?parseFloat(campos.valorCouroMN ):parseFloat(campos.valorCouroMM );
            }
        }
        function mediaLa(){
            if( campos.valorLaMN && campos.valorLaMM ){
                return (parseFloat(campos.valorLaMN ) + parseFloat(campos.valorLaMM ))/2;
            }else{
                return (campos.valorLaMN)?parseFloat(campos.valorLaMN ):parseFloat(campos.valorLaMM );
            }
        }
    
        setMenorMaiorDado([menor, maior]);
        
        let arr = [];
        let arrLb=[];
        let vl = mediaLeite();
        if( vl ){
            arr.push(vl);
            arrLb.push('Leite');
        }
        vl = mediaCarne();
        if( vl ){
            arr.push(vl);
            arrLb.push('Carne');
        }
        vl = mediaCouro();
        if( vl ){
            arr.push(vl);
            arrLb.push('Couro');
        }
        vl = mediaLa();
        if( vl ){
            arr.push(vl);
            arrLb.push('Lã');
        }
        setValor(arr );
        setLabelValor(arrLb);

    }, [campos]);

    const handleChange = (e) => {
        setCampos({...campos, [e.target.name]:e.target.value});
        setHasChange(true);
    }
    const handleSalvaProducao= () => {
        setHasChange(false);
        let pro = {...producao} ;
        pro.dados.producao.carnePesoVivo = [parseFloat(campos.valorPVInicial), parseFloat(campos.valorPVFinal) ];
        pro.dados.producao.leiteLitro = [parseFloat(campos.valorLeiteMN), parseFloat(campos.valorLeiteMM) ];
        pro.dados.producao.couro = [parseFloat(campos.valorCouroMN), parseFloat(campos.valorCouroMM) ];
        pro.dados.producao.laKg = [parseFloat(campos.valorLaMN), parseFloat(campos.valorLaMM) ];
        
        fetch('/api/userProduction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pro),
            credentials: 'include'
        }).then( response => response.json())
        .then(data => setProducao ( data ) )
        .catch( error => setError(error));
    }
    
    return (
        <Container maxWidth="xl" className={classes.root} >
            <Paper>
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <Typography variant="h3" align='center'>
                        Cadastro valor unitário dos produtos comercializados
                    </Typography>
                </Grid>
                <Grid item xs={1} >
                    { !infoCarregando &&
                        <IconButton color="primary" aria-label="Informação" onClick={() => setShowInfo(true)}>
                            <InfoIcon />
                        </IconButton>
                    }
                </Grid>
                <Grid item xs={12}>
                <form noValidate >
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="span">
                            Peso vido em Kg
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorPVInicial" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                            onChange={handleChange} 
                            value={campos.valorPVInicial}
                        />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorPVFinal" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            onChange={handleChange} value={campos.valorPVFinal}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="span">
                            Couro peça
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                        <Input className={classes.espaco} 
                            name="valorCouroMN" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                            onChange={handleChange} value={campos.valorCouroMN}
                        />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorCouroMM" 
                            label="Valor maximo" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            onChange={handleChange} value={campos.valorCouroMM}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="span">
                            Quilo da Lã
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                            <Input className={classes.espaco} 
                                name="valorLaMN" 
                                type="number"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                                onChange={handleChange} value={campos.valorLaMN}
                            />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorLaMM" 
                            label="Valor maximo" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            onChange={handleChange} value={campos.valorLaMM}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="span">
                            Litro do leite
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>  
                        <Typography variant="subtitle1" component="span" className={classes.espaco}>
                            de: 
                        </Typography>
                            <Input className={classes.espaco} 
                                name="valorLeiteMN" 
                                type="number"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                                onChange={handleChange} value={campos.valorLeiteMN}
                            />
                        <Typography variant="subtitle1" component="span">
                            à
                        </Typography>
                        <Input className={classes.espaco}
                            name="valorLeiteMM" 
                            type="number"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            onChange={handleChange} value={campos.valorLeiteMM}
                        />
                    </Grid>
                    <Grid item xs={4} align='center'>
                        { hasChange &&
                            <Button variant="outlined" onClick={handleSalvaProducao} color='primary'>Salvar</Button>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <ChartPieProduto labels={menorMaiorLabel} dados={menorMaiorDado} titulo="Direfença dos valores"/>
                    </Grid>
                    <Grid item xs={6}>
                        <ChartBarProduto labels={labelValor} dados={valor} titulo="Produtos comercializados"/>
                    </Grid>
                </Grid>
            </form>
                </Grid>
            </Grid>
            </Paper>
            { !infoCarregando &&
                <InfoDialog open={showInfo} setOpen={setShowInfo} info={info.valorUnitario}/>
            }
        </Container>
            );
}

export default CadastroProducaoPanel;