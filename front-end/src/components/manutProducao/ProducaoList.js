import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Container, Grid, Typography, Button, ButtonGroup, Icon } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  table: {
    minWidth: 700,
  },
}));

export default function ProducaoList() {
  const classes = useStyles();
  const [listaProducao, setListaProducao] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log('>>>userEffect<<<');
    if (!listaProducao) {
      fetch('/api/producao')
        .then(response => response.json())
        .then(data => setListaProducao(data))
        .catch(error => setError(error));
    }

  }, [listaProducao]);

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={9}>
          <Typography component="h1" variant="h5">
            Cadastro de produção
            </Typography>
        </Grid>
        <Grid item xs={3} align="left">
          <Button color="primary" href="/manutProducao/nova">Nova Produção</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell >Ativo</StyledTableCell>
              <StyledTableCell align="right">Regras</StyledTableCell>
              <StyledTableCell >Descrição</StyledTableCell>
              <StyledTableCell align="center">Ação</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProducao && listaProducao.map(prod => (
              <StyledTableRow key={prod.id}>
                <StyledTableCell component="th" scope="row">
                  {prod.nome}
                </StyledTableCell>
                <StyledTableCell >{prod.ativo ? "sim" : "não"}</StyledTableCell>
                <StyledTableCell align="right">{prod.regras.length}</StyledTableCell>
                <StyledTableCell >{prod.descricao} </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button href={'/manutProducao/edit/' + prod.id}><Icon color="primary">edit</Icon></Button>
                    <Button><Icon color="primary">remove</Icon></Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
