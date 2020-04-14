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



export default function FormGastosPanel(props) {
    const classes = useStyles();
    const {producao, update} = props;
    let fistTime = true;
    
    const [valores, setValores] = useState({
        gestacao:{
            periodo:0,
            valor:0,
            qtdRacao:0
        },
        lactacao: {
            periodo:0,
            valor:0,
            qtdRacao:0
        },
        lactacao: {
            periodo:0,
            valor:0,
            qtdRacao:0
        },
        greepfeed: {
            periodo:0,
            valor:0,
            qtdRacao:0
        },
        recria: {
            periodo:0,
            valor:0,
            qtdRacao:0,
        },
        acabamento: {
            periodo:0,
            valor:0,
            qtdRacao:0,
        }
    })

    useEffect(() => {
        if( !fistTime) return;
        fistTime = false;
        let gestacao={};
        gestacao.periodo = producao.dados.fases.gestacao;
        gestacao.valor = producao.dados.custoProdutivoUnitario.racao.gestacao;
        gestacao.qtdRacao = (producao.dados.consumo.concentrado.gestacao[0]+producao.dados.consumo.concentrado.gestacao[1])/2;

        let lactacao={};
        lactacao.periodo = producao.dados.fases.lactacao;
        lactacao.valor = producao.dados.custoProdutivoUnitario.racao.lactacao;
        lactacao.qtdRacao = (producao.dados.consumo.concentrado.lactacao[0]+producao.dados.consumo.concentrado.lactacao[1])/2;
        
        let greepfeed={};
        greepfeed.periodo = producao.dados.fases.lactacao;
        greepfeed.valor = producao.dados.custoProdutivoUnitario.racao.greepfeed;
        greepfeed.qtdRacao = (producao.dados.consumo.concentrado.filhotes[0]+producao.dados.consumo.concentrado.filhotes[1])/2;

        let precoce = (producao.dados.reprodutor.precoce[0] +producao.dados.reprodutor.precoce[1])/2;
        precoce = precoce * 30;

        let faseRegria = Math.abs(producao.dados.fases.lactacao - precoce);
        let recria={};
        let acbmento = producao.dados.fases.acabamento?producao.dados.fases.acabamento:0;
        if( faseRegria > acbmento ){
            recria.periodo = Math.abs(acbmento - faseRegria);
        }else{
            recria.periodo = 0;
        }
        recria.valor = producao.dados.custoProdutivoUnitario.racao.cordeiro;
        recria.qtdRacao = (producao.dados.consumo.concentrado.borrego[0]+producao.dados.consumo.concentrado.borrego[1])/2;
    
        let acabamento={};
        acabamento.periodo = producao.dados.fases.acabamento;
        acabamento.valor = producao.dados.custoProdutivoUnitario.racao.engorda;
        acabamento.qtdRacao = (producao.dados.consumo.concentrado.normal[0]+producao.dados.consumo.concentrado.normal[1])/2;

        setValores({...valores, 
            gestacao:gestacao,
            lactacao:lactacao,
            greepfeed: greepfeed,
            recria: recria,
            acabamento: acabamento
        });
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
        setValores( val );

        let prod = {...producao};
        prod.dados.consumo.concentrado.gestacao[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.gestacao[1] = prod.dados.consumo.concentrado.gestacao[0];
        update(prod);
    }

    const handleLactacaoPeriodo = (e)=>{
        let val = {...valores};
        val.lactacao.periodo = e.target.value;
        val.greepfeed.periodo = e.target.value;
        setValores( val);

        let precoce = (producao.dados.reprodutor.precoce[0] +producao.dados.reprodutor.precoce[1])/2;
        precoce = precoce * 30;

        let faseRegria = Math.abs(val.lactacao.periodo - precoce);
        let acbmento = val.acabamento.periodo;
        if(  faseRegria > acbmento ){
            val.recria.periodo = Math.abs(acbmento - faseRegria);;
        }else{
            val.recria.periodo = 0;
        }

        let prod = {...producao};
        prod.dados.fases.lactacao = e.target.value;
        
        update(prod);
    }
    const handleLactacaoValorSaco=(e) => {
        let val = {...valores};
        val.lactacao.valor = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.custoProdutivoUnitario.racao.lactacao = parseFloat(e.target.value);
        update(prod);
    }
    const handleLactacaoQtdRacao=(e) => {
        let val = {...valores};
        val.lactacao.qtdRacao = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.consumo.concentrado.lactacao[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.lactacao[1] = prod.dados.consumo.concentrado.lactacao[0];
        update(prod);
    }
    const handleGreepFeedValorSaco=(e) => {
        let val = {...valores};
        val.greepfeed.valor = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.custoProdutivoUnitario.racao.greepfeed = parseFloat(e.target.value);
        update(prod);
    }
    const handleGreepFeedQtdRacao=(e) => {
        let val = {...valores};
        val.greepfeed.qtdRacao = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.consumo.concentrado.filhotes[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.filhotes[1] = prod.dados.consumo.concentrado.filhotes[0];
        update(prod);
    }

    const handleRecriaValorSaco=(e) => {
        let val = {...valores};
        val.recria.valor = e.target.value?e.target.value:0;

        setValores( parseFloat(val) );

        let prod = {...producao};
        prod.dados.custoProdutivoUnitario.racao.cordeiro = parseFloat(val.recria.valor);
        
        update(prod);
    }
    const handleRecriaQtdRacao=(e) => {
        let val = {...valores};
        val.recria.qtdRacao = e.target.value?e.target.value:0;

        setValores( parseFloat(val) );

        let prod = {...producao};
        prod.dados.consumo.concentrado.borrego[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.borrego[1] = prod.dados.consumo.concentrado.borrego[0];
        update(prod);
    }

    const handleAcabamentoPeriodo = (e)=>{
        let val = {...valores};
        val.acabamento.periodo = e.target.value;

        let precoce = (producao.dados.reprodutor.precoce[0] +producao.dados.reprodutor.precoce[1])/2;
        precoce = precoce * 30;

        let faseRegria = Math.abs(val.lactacao.periodo - precoce);
        let acbmento = val.acabamento.periodo;
        if(  faseRegria > acbmento ){
            val.recria.periodo = Math.abs(acbmento - faseRegria);;
        }else{
            val.recria.periodo = 0;
        }
        
        setValores( val);

        let prod = {...producao};
        prod.dados.fases.acabamento = e.target.value;
        update(prod);
    }
    const handleAcabamentoValorSaco=(e) => {
        let val = {...valores};
        val.lactacao.valor = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.custoProdutivoUnitario.racao.engorda = parseFloat(e.target.value);
        update(prod);
    }
    const handleAcabamentoQtdRacao=(e) => {
        let val = {...valores};
        val.acabamento.qtdRacao = e.target.value;

        setValores( val );

        let prod = {...producao};
        prod.dados.consumo.concentrado.normal[0] = parseFloat(e.target.value);
        prod.dados.consumo.concentrado.normal[1] = prod.dados.consumo.concentrado.normal[0];
        update(prod);
    }


    return (
        <Paper>
            <Typography variant="caption" display="block" gutterBottom >Periodo do ano gasto com ração por animal dia</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Gasto/Ração</TableCell>
                            <TableCell>Periodo/Dia</TableCell>
                            <TableCell>Custo/Saco R$</TableCell>
                            <TableCell>Ração animal/dia</TableCell>
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
                                <TextField size="small" type="number" onChange={handleLactacaoPeriodo} value={valores.lactacao.periodo}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleLactacaoValorSaco} value={valores.lactacao.valor}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleLactacaoQtdRacao} value={valores.lactacao.qtdRacao}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>GreepFeed</TableCell>
                            <TableCell>
                                {valores.greepfeed.periodo}
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleGreepFeedValorSaco} value={valores.greepfeed.valor}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleGreepFeedQtdRacao} value={valores.greepfeed.qtdRacao}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Recria</TableCell>
                            <TableCell>
                                {valores.recria.periodo}
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleRecriaValorSaco} value={valores.recria.valor}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleRecriaQtdRacao} value={valores.recria.qtdRacao}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Acabamento</TableCell>
                            <TableCell>
                                <TextField size="small" type="number" onChange={handleAcabamentoPeriodo} value={valores.acabamento.periodo} />
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleAcabamentoValorSaco} value={valores.acabamento.valor}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField size="small" type="number" onChange={handleAcabamentoQtdRacao} value={valores.acabamento.qtdRacao}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
