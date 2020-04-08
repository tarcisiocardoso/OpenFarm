import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, FormControlLabel, IconButton, Button, Grid, 
    TextField, FormGroup } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);
function ComplementoForm(props){
    const classes = useStyles();
    const {dados, setDados, salvar} = props;

    const [showInfo, setShowInfo] = useState(false);
    
    const infoPiquete = {
        titulo: 'Piquetes',
        descricao: `Com uso racional de rotação de pastagem, pode-se dobrar a taxa de lotação animal.
        <br/>Ao informar o piquete o calculo de consumo muda para considerar a capacidade do pasto.<br/>
        Exemplo: <i>capacidade do pasto 12to/he/ano, consumo médio diario 3% do peso vivo</i>`,
    }


    useEffect(()=>{
        console.log('>>>useEffect complmentar form<<<<', dados);
        // setDado({...dado, suplemento:suplemento, piquete:qtdPiquete});
    },  );
   
    const handleChange=(e)=>{
        let val = e.target.value?e.target.value:0;
        setDados({...dados, [e.target.name]:parseInt(val) } );
    }
    return(
    <Grid container spacing={2}>
        <Grid item xs={12} align='center'>
            <Typography variant="h6" gutterBottom>
                Informações complementar
            </Typography>
        </Grid>
        
        <Grid item xs={11}>
            <TextField
                name="piquete"
                label="Quantiade de Piquetes"
                style={{ margin: 8 }}
                placeholder="10"
                helperText="Informe a quantidade de piquetes disponiveis para pastejo"
                margin="normal"
                value={dados.piquete}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
        <Grid item xs={1}>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>setShowInfo(true)}>
                <InfoIcon/>
            </IconButton>
        </Grid>
        <Grid item xs={12}>
            <TextField
                name="silo"
                label="Silo"
                style={{ margin: 8 }}
                placeholder="10kg"
                helperText="kg/dia"
                margin="normal"
                value={dados.silo}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                name="feno"
                label="Feno"
                style={{ margin: 8 }}
                placeholder="10kg"
                helperText="kg/dia"
                margin="normal"
                value={dados.feno}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                name="capineira"
                label="Capineira"
                style={{ margin: 8 }}
                placeholder="10"
                helperText="To/ano"
                margin="normal"
                value={dados.capineira}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>

        <InfoDialog open={showInfo} setOpen={setShowInfo} info={infoPiquete }/>
    </Grid>
)
}



export default ComplementoForm;