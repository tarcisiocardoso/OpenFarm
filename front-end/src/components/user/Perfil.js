import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, FormLabel, FormGroup, Grid, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import { useCurrentUser } from "../../server/UseCurrentUser";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function CheckboxesGroup() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        fazenda: false,
        estudante: false,
        tecnico: false,
        colaborador: false,
        adm: false
    });


    const { fazenda, estudante, tecnico, colaborador, adm } = state;
    // const error = [fazenda, estudante, tecnico, colaborador, adm].filter((v) => v).length === 0;
    const [profile, loading] = useCurrentUser();
    useEffect(()=>{
        if( profile){
            let st = {...state};
            st.fazenda = !!profile.perfis.find(el => el === 'fazenda');
            st.estudante = !!profile.perfis.find(el => el === 'estudante');
            st.tecnico = !!profile.perfis.find(el => el === 'tecnico');
            st.colaborador = !!profile.perfis.find(el => el === 'colaborador');
            st.adm = !!profile.perfis.find(el => el === 'adm');
            setState(st);
        }
    },[profile] );
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Container maxWidth="sm">
            <form  >
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <br/><br/><br/>
                    <FormControl required component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Acesso ao sistema</FormLabel>
                        <FormGroup required >
                            <FormControlLabel
                                control={<Checkbox checked={fazenda} onChange={handleChange} name="fazenda" />}
                                label="Fazenda"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={estudante} onChange={handleChange} name="estudante" />}
                                label="Estudante"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={tecnico} onChange={handleChange} name="tecnico" />}
                                label="Tecnico"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={colaborador} onChange={handleChange} name="colaborador" />}
                                label="Colaborador"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={adm} onChange={handleChange} name="adm" />}
                                label="Administrador"
                            />
                        </FormGroup>
                        <FormHelperText>Para apresentar as funcionalidade que terá no sistema</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
