import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function AlimentacaoTable(props) {
  const{arrAlimentacao} = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Gasto</TableCell>
            <TableCell>Qtd.</TableCell>
            <TableCell align="right">Valor R$</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrAlimentacao.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.fase}</TableCell>
              <TableCell>{item.qtd+ " "+item.tipo}</TableCell>
              <TableCell align="right">{item.gasto.toLocaleString('pt-br', {minimumFractionDigits: 2})}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
