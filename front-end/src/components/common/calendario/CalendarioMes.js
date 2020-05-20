import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AtividadeCard from '../AtividadeCard';
const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
const DAYS_OF_MONTH = 31;
const qtd_colunas = 6;

const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);
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
var month = 0;    // Retorna mes (0-11)
var today = 0;     // Retorna dias (1-31)
var ultimoDia = 0;
export default function CalendarioMes(props) {
    const { producao, data } = props;
    const classes = useStyles();
    const [semanas, setSemanas] = useState([]);

    useEffect(() => {
        var dt = new Date();
        dt.setMonth(data.getMonth());
        let semanas = [];

        console.log(">>Calendario<<", dt);

        month = dt.getMonth();    // Retorna mes (0-11)
        today = dt.getDate();     // Retorna dias (1-31)
        // var weekday = dt.getDay();   // Retorna dias (1-7)

        var dia = 0;
        dt.setDate(1);    // Comecar o calendario no dia '1'
        //dt.setMonth(month);    // Comecar o calendario com o mes atual
        if (dt.getDay() > 0) {
            dt.setDate(-dt.getDay() + 1);
        }

        for (let x = 0; x < qtd_colunas; x++) {
            let ds = [];
            for (let y = 0; y < dias.length; y++) {
                ds.push({
                    dia: dt.getDate(),
                    mes: dt.getMonth()
                });

                dia++;
                dt.setDate(dt.getDate() + 1);
            }
            semanas.push(ds);
            if (dia > DAYS_OF_MONTH) break;
        }
        //dt = new Date();
        dt.setDate(0);
        ultimoDia = dt.getDate();
        setSemanas(semanas);
        // setDt(dt);
    }, [data]);

    return (
        < Grid container >
            <Grid item xs={12}>
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                dias.map((item, index) =>
                                    <StyledTableCell key={index}>{item}</StyledTableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {semanas.map((ds, index) => (
                            <StyledTableRow key={index} >
                                {ds.map((d, i) => (
                                    <TableCell key={i} className={classes.tableCell}
                                        size='small'
                                        padding='none'
                                        width="100%"
                                    >
                                        <AtividadeCard
                                            dia={d.dia}
                                            mes={d.mes}
                                            producao={producao}
                                            today={today}
                                            month={month}
                                            ultimoDia={ultimoDia}
                                        />
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid >
    )
}