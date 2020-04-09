import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
});

let fistTime = true;

export default function FormGastosPanel(props) {
    const classes = useStyles();
    const {producao, update} = props;

    const [valores, setValores] = useState({
        gestacao:{
            periodo:0,
            valor:0,
            qtdRacao:0
        }
    })

    useEffect(() => {
        if( !fistTime) return;

        fistTime = false;
        console.log('>>>FormGastosPanel <<<', producao);

        let gestacao={};
        gestacao.periodo = producao.dados.fases.gestacao;
        gestacao.valor = producao.dados.custoProdutivoUnitario.racao.gestacao;
        gestacao.qtdRacao = (producao.dados.consumo.concentrado.gestacao[0]+producao.dados.consumo.concentrado.gestacao[1])/2;

        setValores({...valores, gestacao:gestacao});
    }, [producao]);

    const handleGestacaoPeriodo = (e)=>{
        let val = {...valores};
        val.gestacao.periodo = e.target.value
        setValores( val);

        let prod = {...producao};
        prod.dados.fases.gestacao = e.target.value;
        update(prod);
    }
    const handleGestacaoValorSaco=(e) => {
        let val = {...valores};
        val.gestacao.valor = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.custoProdutivoUnitario.racao.gestacao = parseFloat(e.target.value);
        update(prod);
    }
    const handleGestacaoQtdRacao=(e) => {
        let val = {...valores};
        val.gestacao.qtdRacao = e.target.value;

        console.log( parseFloat(e.target.value) );

        setValores( val );

        let prod = {...producao};
        prod.dados.consumo.concentrado.gestacao[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.gestacao[1] = prod.dados.consumo.concentrado.gestacao[0];
        update(prod);
    }
    return (
        <Paper>
            <Typography variant="caption" display="block" gutterBottom >Periodo de gasto com ração por animal em gramas</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Gasto/Ração</TableCell>
                            <TableCell>Periodo/Dia</TableCell>
                            <TableCell>Custo/Saco R$</TableCell>
                            <TableCell>Qtd p/Animal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Gestação</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" onChange={handleGestacaoPeriodo} value={valores.gestacao.periodo} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleGestacaoValorSaco} value={valores.gestacao.valor} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleGestacaoQtdRacao} value={valores.gestacao.qtdRacao}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Lactação</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>GreepFeed</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Recria</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Acabamento</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
