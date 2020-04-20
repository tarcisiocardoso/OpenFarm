import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
    FormControlLabel, IconButton, Button, Grid,
    TextField, FormGroup, Paper, InputLabel
} from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
import { useHistory } from "react-router-dom";
import SearchField from '../../util/SearchField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
function ReprodutorForm(props) {
  
    const classes = useStyles();
    const { producao, fazenda, updateProducao, setShowConfirm } = props;
    const [showInfo, setShowInfo] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [raca, setRaca] = useState('');
    const [precocidade, setPrecocidade] = useState({
        inicio:0,
        fim:0
    });

    const history = useHistory();
    const infoPiquete = {
        titulo: 'Reprodutor',
        descricao: `Reprodutor juntom com a matriz formencem caracteristicas importantes para o sistema produtivo como a precocidade das suas criar.\n
            A precocidade indica o quão rápido o animal chega em ponto de abate, diminuindo assim recursos cosumido por esse animal.<br/>
            A precodidade varia entre a genetica do reprodutor com da matriz, por isso indique uma faixa, sendo que produção com uma unica raça a faixa é mais proxima.<br/>
            Exemplo: para chegar a 30kg <b>Dorper</b> chega em 4 meses, <b>Morada Nova</b> chega em 14. A faixa seria entre 4 a 14.`,
    }

    useEffect(() => {
        console.log('>>>useEffect REPRODUTOR form<<<', producao);
        if( producao ){
            setPrecocidade({
                inicio:producao.dados.reprodutor.precoce[0],
                fim:producao.dados.reprodutor.precoce[1],
            })
            setRaca( producao.dados.reprodutor.raca?producao.dados.reprodutor.raca:'' );
        }
    }, [producao]);

    const handleChangeRaca = (valor) => {
        console.log('>>>filtrando<<<', valor);
        setShowSave(true);
        setRaca(valor);
    };

    const handleChange = (e) => {
        let val = e.target.value ? e.target.value : 0;
        console.log(e.target.name+": "+e.target.value);
        setPrecocidade({...precocidade, [e.target.name]: e.target.value} );
        setShowSave(true);
    }
    const handleSalvar=(e)=>{
        setShowSave(false);
        let p = {...producao};

        p.dados.reprodutor.precoce[0] = parseInt(precocidade.inicio);
        p.dados.reprodutor.precoce[1] = parseInt(precocidade.fim);
        p.dados.reprodutor.raca = raca;
        
        updateProducao(p);
        
        history.push({pathname: "-1", state: {showSave: true}});
    }
    return (
        <Paper className={classes.formControl}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    {/* {dashboardNome && */}
                    <Typography variant="h6" align='center'>Reprodutor</Typography>
                    {/* } */}
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setShowInfo(true)}>
                        <InfoIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={1}>
                    <Typography className={classes.lbMargin} variant="h6" align='center'>Raça:</Typography>
                </Grid>
                <Grid item xs={11}>
                    <SearchField
                        placeholder={'raça não definida'}
                        name='raca'
                        value={raca}
                        listaDados={listaDados}
                        onChange={handleChangeRaca}
                    />

                </Grid>
                <Grid className={classes.dflex} item form="maincomponent">
                    <Typography className={classes.lbMargin} variant="h6" align='center'>Precocidade entre:</Typography>
                    <TextField
                        name="inicio"
                        helperText="meses"
                        value={precocidade.inicio}
                        onChange={handleChange}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Typography className={classes.lbMargin} variant="h6" align='center'>à</Typography>
                    <TextField
                        name="fim"
                        style={{ margin: 8 }}
                        helperText="meses"
                        value={precocidade.fim}
                        onChange={handleChange}
                        type="number"
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
    )

}



export default ReprodutorForm;