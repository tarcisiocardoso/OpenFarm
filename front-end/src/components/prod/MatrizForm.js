import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
    IconButton, Button, Grid,
    TextField, Paper
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
import { useHistory } from "react-router-dom";
import SearchField from '../../util/SearchField';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(10),
        },
        lbMargin: {
            marginTop: theme.spacing(1),
        },
        btn: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        dflex: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(2),
            },
        }

    }),
);

const listaDados = [
    'Dorper', 'Morada Nova', 'Santa Ines', 'Textel'
]
export default function MatrizForm(props) {
    const classes = useStyles();
    const { producao, updateProducao } = props;
    const [showInfo, setShowInfo] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [matriz, setMatriz] = useState({
        peso:[0,0],
        intervaloEntreParto:[0,0],
        prolificidade:[0,0],
        raca: ''
    });

    const history = useHistory();
    const infoPiquete = {
        titulo: 'Matriz',
        descricao: `As fêmeas são a base da produção de ovinos, onde tem o maior custo e a maior quantidade de adulto. A matriz soma-se a a capacidade genetida de reprodutor
            e traz parametros importante como o indice materno, que entre outra coisa ajuda a diminuir a taxa de mortalidade do plantel.`,
    }

    useEffect(() => {
        console.log('>>>useEffect REPRODUTOR form<<<', producao);
        if( producao ){
            let m = {...producao.dados.matriz};
            m.raca = m.raca?m.raca:'';
            setMatriz(m);
        }
    }, [producao]);

    const handleChangeRaca = (valor) => {
        console.log('>>>filtrando<<<', valor);
        setShowSave(true);
        let m = {...matriz};
        m.raca = valor;
        setMatriz(m);
    };

    const handleChange = (e) => {
        let val = e.target.value ? parseFloat(e.target.value) : 0;
        let name = e.target.name;
        console.log(name+": "+val);
        let m = {...matriz};
        if(name === 'pesoInicio'){
            m.peso[0] = val;
        }else if( name === 'pesoFim'){
            m.peso[1] = val;
        }else if ( name === 'partoInicio'){
            m.intervaloEntreParto[0] = val;
        }else if ( name === 'partoFim'){
            m.intervaloEntreParto[1] = val;
        }else if ( name === 'prolifInicio'){
            m.prolificidade[0] = val;
        }else if ( name === 'prolifFim'){
            m.prolificidade[1] = val;
        }
        setMatriz(m);
        setShowSave(true);
    }
    const handleSalvar=(e)=>{
        setShowSave(false);
        let p = {...producao};

        p.dados.matriz = matriz;
        
        updateProducao(p);

        history.push({pathname: "-1", state: {showSave: true}});
    }
    return (
        <Paper className={classes.formControl}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    {/* {dashboardNome && */}
                    <Typography variant="h6" align='center'>Matriz</Typography>
                    {/* } */}
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setShowInfo(true)}>
                        <InfoIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.lbMargin} variant="h6">Raça:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <SearchField
                        placeholder={'raça não definida'}
                        name='raca'
                        value={matriz.raca}
                        listaDados={listaDados}
                        onChange={handleChangeRaca}
                    />

                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.lbMargin} variant="h6" >Peso:</Typography>
                </Grid>
                <Grid className={classes.dflex} item xs={9}>
                    
                    <TextField
                        name="pesoInicio"
                        helperText="meses"
                        value={matriz.peso[0]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography className={classes.lbMargin} variant="h6" align='center'>à</Typography>
                    <TextField
                        name="pesoFim"
                        style={{ margin: 8 }}
                        helperText="meses"
                        value={matriz.peso[1]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.lbMargin} variant="h6" >Intervalo entre parto:</Typography>
                </Grid>
                <Grid className={classes.dflex} item xs={9}>
                    
                    <TextField
                        name="partoInicio"
                        helperText="meses"
                        value={matriz.intervaloEntreParto[0]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Mes</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography className={classes.lbMargin} variant="h6" align='center'>à</Typography>
                    <TextField
                        name="partoFim"
                        style={{ margin: 8 }}
                        helperText="meses"
                        value={matriz.intervaloEntreParto[1]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Mes</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.lbMargin} variant="h6" >Parto gemeado (prolificidade):</Typography>
                </Grid>
                <Grid className={classes.dflex} item xs={9}>
                    
                    <TextField
                        name="prolifInicio"
                        helperText="meses"
                        value={matriz.prolificidade[0]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Mes</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography className={classes.lbMargin} variant="h6" align='center'>à</Typography>
                    <TextField
                        name="prolifFim"
                        style={{ margin: 8 }}
                        helperText="meses"
                        value={matriz.prolificidade[1]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Mes</InputAdornment>,
                          }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <center className={classes.btn}>
                        <Button variant="outlined" onClick={history.goBack}> voltar </Button>
                        { showSave && 
                            <Button variant="outlined" color="primary" onClick={handleSalvar}>
                                Salvar
                            </Button>
                        }
                    </center>
                </Grid>
                

                <InfoDialog open={showInfo} setOpen={setShowInfo} info={infoPiquete} />
            </Grid>
        </Paper>
    )}
