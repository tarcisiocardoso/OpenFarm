import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCurrentUser } from "../../../server/UseCurrentUser";
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Grid, Container, Paper, FormControl, FormHelperText } from '@material-ui/core';
import { useHistory } from "react-router-dom";


// /home/cardoso/Documentos/mateus/OpenFarm/front-end/src/server/UseCurrentUser.js


//import { login } from '../../../util/APIUtils';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function BasicTextFields() {

    let [user] = useCurrentUser();

    const classes = useStyles();
    const [novaSenha, setNovaSenha] = useState("");
    const [confirSenha, setConfirSenha] = useState("");
    const [error, setError] = useState({
        ok: true,
        msg: ""
    });
    const history = useHistory();
    const handleBtnClick = () => {
        console.log('Mano agora arruma esse bagui ai ++++', novaSenha, "++++", confirSenha, user)
        // let senha = 
        // let nome = document.getElementsByName("senha").value;
        // console.log('Senha=' + this.nome)


        if (isSenhaValidada()) {
            //TODO enviar pro servidor
            setError({
                hasErro: false,
                msg: ""

            })


            submit();



        } else {
            setError({
                hasErro: true,
                msg: "Senhas estao diferentes"

            })
        }

    }

    function submit(){

        let item = {
            login: user.login, 
            password: novaSenha
        }
        
        fetch('/api/trocaSenha'  , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            credentials: 'include'
        }).then(response => {
            console.log(response);
            history.push('/home');
        }).catch(error => {
            console.log(">>ERRO<<", error);
        });



    }
    function handleTrocarSenha(e) {
        setNovaSenha(e.target.value);
    }

    function handleConfirmarSenha(e) {
        setConfirSenha(e.target.value);
    }

    function isSenhaValidada() {
        return novaSenha === confirSenha;
    }

    return (
        <Container maxWidth="lg" >
            <Paper>
                <Grid item xs={12} align='center'>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Typography component="h5" variant="h5" >
                            Troque a sua senha
                        </Typography>

                        <FormControl>
                            <TextField spacing={3}
                                name="senhaAtual"
                                type="password"
                                label="Senha atual"
                            />
                            <FormHelperText id="my-helper-text">Informe sua senha antiga</FormHelperText>

                        </FormControl>
                        <br />
                        <FormControl>
                            <TextField name="senha"
                                type="password"
                                label="Senha nova"
                                value={novaSenha}
                                onChange={handleTrocarSenha}
                            />
                            <FormHelperText id="my-helper-text">Informe a senha nova</FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                            <TextField name="confirSenha"
                                type="password"
                                label="Confirmar a nova senha"
                                value={confirSenha}
                                error={error.hasErro}
                                helperText={error.msg}
                                onChange={handleConfirmarSenha}


                            // error={!error.ok}
                            // helperText={!error.msg}
                            />
                            <FormHelperText id="my-helper-text">Confirme sua nova senha</FormHelperText>
                        </FormControl>
                        <div>
                            <Button variant="outlined"
                                color="primary"
                                onClick={handleBtnClick}>Trocar</Button>
                            <Button href="/home"
                                variant="outlined"
                                color="secondary">Voltar</Button>
                        </div>

                    </form>
                </Grid>
            </Paper>
        </Container>

    );


}



