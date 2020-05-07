import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, FormControlLabel, Checkbox, FormLabel, Grid, 
    TextField, FormGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
function ComplementarPanel(props){
    const classes = useStyles();
    const {dado, setDado} = props;

    const [piquete, setPiquete] = useState(false);
    const [suplementoChecked, setSuplementoChecked] = useState(false);
    const [qtdPiquete, setQtdPiquete] = useState(0);

    const [suplemento, setSuplemento] = useState({
        silo:false,
        feno:false,
        capineira:false
    });

    useEffect(()=>{
        console.log('>>>useEffect complmentar panel<<<<');
        if( !dado) setDado({...dado, suplemento:suplemento, piquete:qtdPiquete});
    }, [suplemento, qtdPiquete, dado, setDado] );

    const handlePiquete =()=>{
        setPiquete(!piquete);
    }

    const handleSuplemento=()=>{
        setSuplementoChecked( !suplementoChecked );
    }
    const handleChangeSuplemento=(e)=>{
        console.log( e.target.name, e.target.value, e.target.ckecked, e.target, suplemento );
        setSuplemento({...suplemento, [e.target.name]: e.target.checked});

    }
    const handleChange=(e)=>{

        setQtdPiquete(e.target.value);
    }
    return(
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                Informações complementar
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Possue piquete?</FormLabel>
                <FormControlLabel
                    control={<Checkbox value={piquete} name="piquete" onChange={handlePiquete} />}
                    label={piquete?"sim":"Informe se existe piquete no pasto"}
                />
                <FormHelperText>Com tecnica correta de rotação de pasto pode facilmente dobrar a taxa de lotação</FormHelperText>
            </FormControl>
            { piquete &&
                <TextField
                    name="piquete"
                    label="Quantiade"
                    style={{ margin: 8 }}
                    placeholder="10"
                    helperText="Informe a quantidade de piquetes disponiveis para pastejo"
                    margin="normal"
                    value={qtdPiquete}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            }
        </Grid>
        <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Existe suplementação com feno, capineira, silo?</FormLabel>
                <FormControlLabel
                    control={<Checkbox  value={suplementoChecked} name="suplemento" onChange={handleSuplemento} /> }
                    label={suplementoChecked?"sim":"Informe se existe complementação com volumoso"}
                />
            </FormControl>
            { suplementoChecked &&
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Quais forragens são fornecidas</FormLabel>
                <FormGroup>
                    <FormControlLabel
                    control={<Checkbox value={suplemento.silo} onChange={handleChangeSuplemento} name="silo" />}
                    label="Silo"
                    />
                    <FormControlLabel
                    control={<Checkbox value={suplemento.feno} onChange={handleChangeSuplemento} name="feno" />}
                    label="Feno"
                    />
                    <FormControlLabel
                    control={<Checkbox value={suplemento.capineira} onChange={handleChangeSuplemento} name="capineira" />}
                    label="Capineira"
                    />
                </FormGroup>
                <FormHelperText>Fornecimento de volumoso aumenta a produção</FormHelperText>
            </FormControl>
            }
        </Grid>
    </Grid>
)
}



export default ComplementarPanel;