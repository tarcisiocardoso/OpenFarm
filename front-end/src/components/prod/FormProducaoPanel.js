import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {MenuItem, Button} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200
            },
        },
        btn: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(2),
            position: 'absolute',
            // top: -10,
            right: 0
        },
        formControl: {
            margin: theme.spacing(1),
            width: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default function FormProducaoPanel(props) {
    const classes = useStyles();
    const {producao, update, meses}= props
    let [ciclo, setCiclo] = React.useState(1);
    const [show, setShow] = React.useState(false);
    const [qtd, setQtd] = React.useState(0);
    const [area, setArea]= React.useState(0);
    let [mesInicio, setMesInicio]= React.useState(1);

    useEffect(()=>{
        if( producao){
            setQtd( producao.dados.producao.qtdAdulto);
            setArea( producao.dados.producao.areaProducaoEmHE);
            setCiclo(producao.dados.producao.cicloProdutivo?producao.dados.producao.cicloProdutivo:1 );
            setMesInicio(producao.dados.producao.mesInicio?producao.dados.producao.mesInicio:1 );
        }
    }, [producao]);
    const handleChange = (event) => {
        setCiclo(event.target.value);
        ciclo = event.target.value;
        // setShow(true);
        setTimeout(function(){ 
            handleCheckClick();
         }, 30);
    };
    const handleChangeMes=(e)=>{
        
        setMesInicio(e.target.value);
        mesInicio = e.target.value;
        setTimeout(function(){ 
            handleCheckClick();
         }, 30);
    }
    const handleCheckClick=()=>{
        setShow(false);
        let p = {...producao};

        p.dados.producao.qtdAdulto = parseInt( qtd );
        p.dados.producao.areaProducaoEmHE = parseInt( area );
        p.dados.producao.cicloProdutivo = ciclo;
        p.dados.producao.mesInicio = mesInicio;
        update(p);
    }
    const handleKeyPress=(e)=>{
        if (e.charCode === 13) {
            handleCheckClick();
        }

    }
    const handleQtdChange=(e)=>{
        setShow(true);
        setQtd( e.target.value );
    }
    const handleAreaChange=(e)=>{
        setArea(e.target.value);
    }

    return (
        <div className={classes.root} >
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Ciclo de produção</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ciclo}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Mensal</MenuItem>
                    <MenuItem value={2}>Bimestre</MenuItem>
                    <MenuItem value={3}>Tremestre</MenuItem>
                    <MenuItem value={4}>A cada 4 Meses</MenuItem>
                    <MenuItem value={5}>A cada 5 Meses</MenuItem>
                    <MenuItem value={6}>A cada 6 Meses</MenuItem>
                    <MenuItem value={7}>A cada 7 Meses</MenuItem>
                    <MenuItem value={8}>A cada 8 Meses</MenuItem>
                    <MenuItem value={9}>A cada 9 Meses</MenuItem>
                    <MenuItem value={10}>A cada 10 Meses</MenuItem>
                    <MenuItem value={11}>A cada 11 Meses</MenuItem>
                    <MenuItem value={12}>A cada 12 Meses</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                label="Matrizes" 
                type='number' 
                onChange={handleQtdChange} 
                value={qtd} 
                onKeyPress={handleKeyPress}
            />
            <TextField 
                label="Area de Pasto" 
                type='number' 
                onChange={handleAreaChange} 
                value={area} 
                onKeyPress={handleKeyPress}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Inicio da simulação</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mesInicio}
                    onChange={handleChangeMes}
                >
                    {meses.map((item,index)=>(
                        <MenuItem key={index} value={index}>{item}</MenuItem>
                    ))}
                    
                    
                </Select>
            </FormControl>
            {show && 

                <Button
                    // variant="contained"
                    color="primary"
                    className={classes.btn}
                    startIcon={<DoneIcon />}
                    onClick={handleCheckClick}
                    >
                    Pressione enter
                </Button>
            }
        </div>
    );
}
