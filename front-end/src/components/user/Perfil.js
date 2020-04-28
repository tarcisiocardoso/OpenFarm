import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, FormLabel, FormGroup, Grid, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import { useCurrentUser } from "../../server/UseCurrentUser";
import { ContactlessOutlined } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

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
    const history = useHistory();
    const [error, setError]= useState({
        res: false,
        msg: ""

    });
    const [state, setState] = React.useState({
        fazenda: false,
        estudante: false,
        tecnico: false,
        colaborador: false,
        adm: false
    });    


    const { fazenda, estudante, tecnico, colaborador, adm } = state;
    // const error = [fazenda, estudante, tecnico, colaborador, adm].filter((v) => v).length === 0;
    const [usuario, loading] = useCurrentUser();


    useEffect(()=>{

       
        if( usuario){
            let st = {...state};
            st.fazenda = !!usuario.perfis.find(el => el === 'fazenda');
            st.estudante = !!usuario.perfis.find(el => el === 'estudante');
            st.tecnico = !!usuario.perfis.find(el => el === 'tecnico');
            st.colaborador = !!usuario.perfis.find(el => el === 'colaborador');
            st.adm = !!usuario.perfis.find(el => el === 'adm');
            setState(st);
        }
    },[usuario] );  


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

   function handleSalve(e) {       
        let arr = [];
       for(let x in state){
           
            if(state[x]){
                arr.push(x)
            }
       }      

       let st = {
           id:usuario.id,
           perfis:arr
       }       
       e.preventDefault();

        fetch('/api/perfil', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(st),
            credentials: 'include'
        }).then(response => {
            localStorage.removeItem("accessToken_PROFILE");
            console.log(response);
            if(response.status !== 200){
                setError({
                    res: true,
                    msg: response.statusText


                })
            }else{
                history.push('/home');
            }            
            
        }).catch(error => {
            console.log(">>ERRO<<", error);
        });

   }

  


    return (
        <Container maxWidth="sm">            
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
                    <Grid item xs={12} className={classes.paper} >
                        <Button variant="outlined" color="primary" onClick={handleSalve} type="submit">
                            Salvar
                        </Button>
                        <Button href="/home" variant="outlined" color="secondary">
                            Sair
                        </Button>
                    </Grid>
                </Grid>   

                {error.res && 
                <Alert severity="error">{error.msg}</Alert>
                
                
                
                }
                
                
                
        </Container>
    );

    
}
