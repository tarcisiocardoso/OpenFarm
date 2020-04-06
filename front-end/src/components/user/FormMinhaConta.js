import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, FormLabel, FormGroup, Grid, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import { useCurrentUser } from "../../server/UseCurrentUser";
  

const useStyles = makeStyles(theme => ({
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

export default function FormMinhaConta() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        login: '',
        pass: ''
    });
    const [state, setState] = React.useState({
        fazenda: false,
        estudante: false,
        tecnico: false,
        colaborador: false,
        adm: false
    });
    //atualiza a pagina 
    function refreshPage(){
        window.location.reload();
    }

    let [profile] = useCurrentUser();

    useEffect(() => {
        console.log("profile", profile );
        if( profile ){
            if( profile.erro) return;
            user.name = profile.name;
            user.email = profile.email;
            user.login = profile.login;
            user.perfis = profile.perfis;
            if( user.perfis ){
                user.perfis.forEach((val) => {
                    state[val]=true;
                    setState(state);
                });
            }
            setUser(user);
        }
      }, [profile, user, state] );

    const handleSubmit = (event) => {
        event.preventDefault();

        user.provider = 'local'; //autencição no sistema local
        console.log( user );

        fetch('/api/formMinhaConta' + ((user.id) ? '/' + user.id.toString() : ''), {
            method: (user.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
          }).then( response =>{
              console.log( response );
            history.push('/home');
          }).catch( error => {
            console.log(">>ERRO<<", error );
          });
          
    }

    const handleChange = e => {
        // const target = event.target;
        // const value = target.value;
        // const name = target.id;
        // console.log(name, value);
        // let u = {};
        // for(let x in user){
        //     u[x] = user[x];
        // }
        // if( value ){
        //     u[name]=value;
        // }
        // setUser(u);
        setUser({...user, [e.target.name]: e.target.value} );
    };
    const handleChangePerfil = event => {
        const target = event.target;
        const name = target.id;
        let u = {};
        for(let x in user){
            u[x] = user[x];
        }
        if( !u.perfis ) u.perfis = [];
        if( !target.checked ){
            let item = u.perfis.indexOf(name); //.perfis.find( f => f === name);    
            u.perfis.splice(item, 1);
        }else {
            u.perfis.push(name);
        }
        setUser(u);
    }
    

    
    return (
        <Container maxWidth="sm">
            <form className={classes.root} noValidate autoComplete="off" action="/api/formMinhaConta" method="post" onSubmit={handleSubmit} >
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Configurações do cliente
                        </Typography>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="name">Nome</InputLabel>
                            <Input name="name" aria-describedby="nome-helper-text" onChange={handleChange} value={ user.name||'' }/>
                            <FormHelperText id="nome-helper-text">Nome e sobrenome</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input name="email" aria-describedby="my-helper-text" onChange={handleChange} value={ user.email||''} />
                            <FormHelperText id="my-helper-text">Nos nunca divulgaremos seu email</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="login">Login</InputLabel>
                            <Input name="login" aria-describedby="login-helper-text" onChange={handleChange} value={ user.login||''}/>
                            <FormHelperText id="login-helper-text">Nome que gostaria de ser chamado</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="pass">Senha</InputLabel>
                            <Input name="password" type="password" onChange={handleChange}/>
                            <FormHelperText id="pass-helper-text">Informe a senha com minimo 8 caracteres</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="passValidacao">Confirma Senha</InputLabel>
                            <Input name="passValidacao" type="password" aria-describedby="pass-helper-text" onChange={handleChange} />
                            <FormHelperText id="passValidacao-helper-text">Confirme a senha</FormHelperText>
                        </FormControl>
                        <br/><br/><br/>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Acesso ao sistema</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={                            
                                        // if( user && user.perfis && user.perfis.find(element => element == 'fazenda') )
                                        <Checkbox id="fazenda" checked="false" onChange={handleChangePerfil} value={state.fazenda}/>
                                    }
                                    label="Adiministrador fazenda"
                                />
                                <FormControlLabel
                                    control={                            
                                        <Checkbox id="estudante" checked="false" onChange={handleChangePerfil} value={state.estudante}/>
                                    }
                                    label="Estudante e Hobista"
                                />
                                <FormControlLabel
                                    control={                            
                                        <Checkbox id="tecnico" checked="false" onChange={handleChangePerfil} value={state.tecnico}/>
                                    }
                                    label="Tecnico e especialista"
                                />
                                <FormControlLabel
                                    control={                            
                                        <Checkbox id="colaborador" checked="false" onChange={handleChangePerfil} value={state.colaborador}/>
                                    }
                                    label="Colaborador"
                                />
                                <FormControlLabel
                                    control={                            
                                        <Checkbox id="adm" checked="false" onChange={handleChangePerfil} value={state.adm}/>
                                    }
                                    label="Adiministrador do sistema"
                                />
                            </FormGroup>
                            <FormHelperText>Para apresentar as funcionalidade que terá no sistema</FormHelperText>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} className={classes.paper} >
                        <Button variant="outlined" color="primary" onClick={handleSubmit} type="submit">
                            Ok
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={refreshPage}>
                            cancelar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
    
}
