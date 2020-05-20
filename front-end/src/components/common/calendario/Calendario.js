import React, { useState } from 'react';
import { Grid, Container, Typography, Button, ButtonGroup, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CalendarioMes from './CalendarioMes';
import CalendarioAno from './CalendarioAno';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const useStyles = makeStyles(theme => ({
    table: {
        tableLayout: 'fixed'
    },
    tableCell: {
        // whiteSpace: 'nowrap',
        // width: '150px',
        // overflow: 'hidden',
        // display: 'block'
    },
    btns: {
        // display: 'flex',
        float: 'right',
        // justifyContent: 'flex-end',
        // display: 'block',
        // flexDirection: 'column',
        // alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
let d = new Date();
var year = d.getFullYear();       // Retorna o ano
var month = d.getMonth() + 1;    // Retorna mes (0-11)
var today = d.getDate();     // Retorna dias (1-31)
export default function Calendario(props) {
    const { producao } = props;
    const classes = useStyles();
    const [data, setData] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState();

    let preferencia = JSON.parse(localStorage.getItem('preferencia'));

    const [tipoCalendario, setTipoCalendario] = useState((preferencia && preferencia.calendario) ? preferencia.calendario : "mes");

    const handleMesAnterior = (e) => {
        let dt = new Date();
        if (tipoCalendario === 'mes') {
            dt.setMonth(data.getMonth() - 1);
        } else {
            dt.setFullYear(data.getFullYear() - 1)
        }
        console.log(data, "<>", dt);
        setData(dt);

        year = dt.getFullYear();       // Retorna o ano
        month = dt.getMonth() + 1;    // Retorna mes (0-11)
        today = dt.getDate();     // Retorna dias (1-31)

    }
    const handleMesProximo = (e) => {
        console.log('>>>handleMesProximo<<<');
        let dt = new Date();
        if (tipoCalendario === 'mes') {
            dt.setMonth(data.getMonth() + 1);
        } else {
            dt.setFullYear(data.getFullYear() + 1)
        }
        console.log(data, "<>", dt);
        setData(dt);

        year = dt.getFullYear();       // Retorna o ano
        month = dt.getMonth() + 1;    // Retorna mes (0-11)
        today = dt.getDate();     // Retorna dias (1-31)

    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAction = (e, acao) => {
        setAnchorEl(null);
        console.log(acao);

    }
    const handleActionCalendario = (e) => {
        console.log('>>>handleActionCalendario<<<', preferencia);
        setAnchorEl(null);
        if (!preferencia || preferencia.calendario === 'ano') {
            preferencia = preferencia ? preferencia : {};
            preferencia.calendario = 'mes';
            setTipoCalendario('mes');
            localStorage.setItem('preferencia', JSON.stringify(preferencia));
        } else {
            preferencia = preferencia ? preferencia : {};
            preferencia.calendario = 'ano';
            setTipoCalendario('ano');
            localStorage.setItem('preferencia', JSON.stringify(preferencia));
        }
    }

    function Cabecalho() {
        if (tipoCalendario === 'mes') {
            return (
                <Typography variant="h6" gutterBottom align='center'>
                    {today + " de " + meses[month].toUpperCase() + " " + year}
                </Typography>
            )
        } else {
            return (
                <Typography variant="h6" gutterBottom align='center'>
                    {year}
                </Typography>
            )
        }
    }
    
    return (
        <Container maxWidth="xl">
            <Paper>
                <Grid container>
                    <Grid item xs={11}>
                        <Cabecalho />
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.btns}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={handleMesAnterior}>
                                    <ArrowBackIosIcon />
                                </Button>
                                <Button onClick={handleClick}>
                                    <DehazeIcon />
                                </Button>
                                <Button onClick={handleMesProximo}>
                                    <ArrowForwardIosIcon />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Grid>
                </Grid>

                {(tipoCalendario === 'mes') &&
                    <CalendarioMes data={data} producao={producao} />
                }
                {(tipoCalendario === 'ano') &&
                    <CalendarioAno data={data} producao={producao} meses={meses}/>
                }
            </Paper>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAction}
            >
                <MenuItem onClick={(e) => handleActionCalendario(e)}>{(!preferencia || preferencia.calendario === 'ano') ? 'Calendario Mensal' : 'Calendario Anual'}</MenuItem>
                <MenuItem onClick={(e) => handleAction(e, 'anual')} >Atividades</MenuItem>
            </Menu>
        </Container>
    )
}