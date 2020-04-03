import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, TextField, Input} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    font: 12,
  },
  tableCellChuvaForte: {
    backgroundColor: "#3366cc"
  },
  tableCellChuvaFraca: {
    backgroundColor: "#80ccff"
  },
  tableCellSeco: {
    backgroundColor: "#ffff66"
  },
  selected: {}
});

export default function ClimaTable(props) {
  const classes = useStyles();

  const {matriz, updateMatriz, meses} = props;

  const handleChange = (e) => {

    let m = {...matriz};
    let nome = e.target.name.split("_")[0];
    let index = e.target.name.split("_")[1];
    m[nome][index] = e.target.value?parseInt(e.target.value):'';

    updateMatriz(m);
  }
  const changeTemperatura = (t) => {
    let ret = "#ffc2b3";
    if( t < 15) ret = "#1af5ff";
    if( t > 20) ret = "#ff8566";
    if( t > 25) ret = "#ff471a";
    if( t >= 30 )ret = "#ff1a1a";
    return ret;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {
                meses.map((m, index) => (
                    <TableCell back="red" align="right" key={index}>{m}</TableCell>  
                ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">Tp.Min</TableCell>
                {
                    matriz && 
                    matriz.tMinima.map( (t, index) => (
                        <TableCell align="right" key={index} style={{backgroundColor : changeTemperatura(t)}} >
                            <TextField size="small" type="number" name={"tMinima_"+index} value={t} onChange={handleChange} />
                        </TableCell>
                    ))
                }
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Tp.Méd</TableCell>
                {
                    matriz && 
                    matriz.tMedia.map( (t, index) => (
                        <TableCell align="right" key={index} style={{backgroundColor : changeTemperatura(t)}}>
                            <TextField size="small" type="number" name={"tMedia_"+index} value={t} onChange={handleChange} />
                        </TableCell>
                    ))
                }
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Tp.Max</TableCell>
                {
                    matriz && 
                    matriz.tMaxima.map( (t, index) => (
                        <TableCell align="right" key={index} style={{backgroundColor : changeTemperatura(t)}}>
                            <TextField size="small" type="number" name={"tMaxima_"+index} value={t} onChange={handleChange} />
                        </TableCell>
                    ))
                }
                </TableRow>
                <TableRow >
                    <TableCell component="th" scope="row">Ch.(mm)</TableCell>
                {
                    matriz && 
                    matriz.chuva.map( (t, index) => (
                        <TableCell key={index} className={ t > 150? classes.tableCellChuvaForte:(t < 150 && t > 20?classes.tableCellChuvaFraca:classes.tableCellSeco)}>
                            <TextField size="small" type="number" name={"chuva_"+index} value={t} onChange={handleChange} />
                        </TableCell>
                    ))
                }
                </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
