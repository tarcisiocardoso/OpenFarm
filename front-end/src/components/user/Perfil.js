import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Container, Button, FormLabel, FormGroup, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../server/UseCurrentUser";
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
import Alert from '@material-ui/lab/Alert';
import {useFetch} from '../../server/UseFetch';

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
    const isFirstRender= useRef(true);
    const [error, setError] = useState({
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
    const [txt, setTxt] = React.useState({
        titulo:'', descricao:''
    });


    const { fazenda, estudante, tecnico, colaborador, adm } = state;
    // const error = [fazenda, estudante, tecnico, colaborador, adm].filter((v) => v).length === 0;
    const [usuario] = useCurrentUser();

    useEffect(() => {
        if (usuario) {
            if(isFirstRender.current){
                isFirstRender.current=false
            }else{
                return;
            }
            let st = { ...state };
            st.fazenda = !!usuario.perfis.find(el => el === 'fazenda');
            st.estudante = !!usuario.perfis.find(el => el === 'estudante');
            st.tecnico = !!usuario.perfis.find(el => el === 'tecnico');
            st.colaborador = !!usuario.perfis.find(el => el === 'colaborador');
            st.adm = !!usuario.perfis.find(el => el === 'adm');
            setState(st);
        }
    }, [usuario, state]);

    const [ openInfo, setOpenInfo] = React.useState(false);
    const [info, infoLoading] = useFetch("/api/info");

    const handleOpenInfo = (e, info) => {
        if( !info){
            setError({
                res: true,
                msg:"Ainda não implemntado"
            })
            return;
        }
        setOpenInfo(true);
        setState({...state} );
        setTxt(info);
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    function handleSalve(e) {
        let arr = [];
        for (let x in state) {

            if (state[x]) {
                arr.push(x)
            }
        }

        let st = {
            id: usuario.id,
            perfis: arr
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
            if (response.status !== 200) {
                setError({
                    res: true,
                    msg: response.statusText
                })
            } else {
                history.push('/home');
            }
        }).catch(error => {
            console.log(">>ERRO<<", error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Grid container className={classes.root} spacing={3}>
                <Grid item sm={12}>
                    <br /><br /><br />
                    <FormControl required component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Acesso ao sistema</FormLabel>
                        <FormGroup required >
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={fazenda} onChange={handleChange} name="fazenda" />}
                                    label="Fazenda"
                                />
                                <IconButton color="primary" aria-label="info" onClick={(e)=>handleOpenInfo(e, info.Fazendeiro)}>
                                    <InfoIcon />    
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={estudante} onChange={handleChange} name="estudante" />}
                                label="Estudante"
                            />
                            <IconButton color="primary" aria-label="info" onClick={handleOpenInfo}>
                                    <InfoIcon />    
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={tecnico} onChange={handleChange} name="tecnico" />}
                                label="Tecnico"
                            />
                            <IconButton color="primary" aria-label="info" onClick={handleOpenInfo}>
                                    <InfoIcon />    
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={colaborador} onChange={handleChange} name="colaborador" />}
                                label="Colaborador"
                            />
                            <IconButton color="primary" aria-label="info" onClick={handleOpenInfo}>
                                    <InfoIcon />    
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={adm} onChange={handleChange} name="adm" />}
                                label="Administrador"
                            />
                            <IconButton color="primary" aria-label="info" onClick={handleOpenInfo}>
                                    <InfoIcon />    
                                </IconButton>
                            </Grid>

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

            { !infoLoading && 
                <InfoDialog open={openInfo} setOpen={setOpenInfo} info={txt}/>
            }
        </Container>
    );


}
