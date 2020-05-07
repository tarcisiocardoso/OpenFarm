import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, ButtonGroup, Button, Icon} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const editar = (e, index)=>{
    console.log('Não implementado...');
}
const remover = (e, index)=>{
    console.log('Não implementado...');
}
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function GastoTable(props) {
    const classes = useStyles();
    const { gastos } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Gasto</StyledTableCell>
                        <StyledTableCell>Periodiciade</StyledTableCell>
                        <StyledTableCell align="right">Valor</StyledTableCell>
                        <StyledTableCell>Descrição</StyledTableCell>
                        <StyledTableCell align="right">Ação</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gastos && gastos.map((g, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{g.nome}</StyledTableCell>
                            <StyledTableCell>{g.tipo}</StyledTableCell>
                            <StyledTableCell align="right">{g.valor}</StyledTableCell>
                            <StyledTableCell>{g.descricao}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button onClick={e => editar(g, index)}><Icon color="primary">edit</Icon></Button>
                                    <Button onClick={e => remover(index)}><Icon color="primary">remove</Icon></Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
