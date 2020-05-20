import React from 'react';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core';

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
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    painel: {

      display: 'flex',
      '& > *': {
        margin: theme.spacing(0),
        width: '100%',
        //height: theme.spacing(16),
      },
    },

  }),
);

function formatter(val) {
  return (val) ? val.toFixed(2).replace('.', ',') : '';
};

export default function TableGastos(props) {
  const classes = useStyles();
  const { fazenda } = props;

  return (
    <div className={classes.painel}>
      <Paper>
        <Typography variant="h6" gutterBottom align='center'>
          Gasto fixo da fazenda
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="right">Valor</StyledTableCell>
                <StyledTableCell>Tipo</StyledTableCell>
                <StyledTableCell >Descrição</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fazenda && fazenda.gastos && fazenda.gastos.map((gasto, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {gasto.nome}
                  </StyledTableCell>
                  <StyledTableCell align="right">{"R$ " + formatter(gasto.valor)}</StyledTableCell>
                  <StyledTableCell>{gasto.tipo}</StyledTableCell>
                  <StyledTableCell>{gasto.descricao}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
