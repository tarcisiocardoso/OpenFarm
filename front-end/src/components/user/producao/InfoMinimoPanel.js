import React, { useState, useEffect } from 'react';
import { Paper, Container, InputAdornment, Divider, Grid, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import ComplementarPanel from './ComplementarPanel';

var matriz = {};
var consumo = {};
var algumAlerta = false;

export default function InfoMinimoPanel(props) {

    const { producao, setDisable, dado, setDado } = props
    const [erro] = useState({
        qtd: { erro: false, msg: 11 }
    })
    const [alertas, setAlerta] = useState([]);
    const [hasComplemento, setHasComplemento] = useState(false);

    const [msgAbertura, setMsgAbertura] = useState();

    useEffect(() => {
        console.log('>>>>>useEffect do InfoMinimoPanel <<<<', (dado.qtd > 0 && dado.area > 0));
        function verificaInformacao() {
            console.log('>>>verificando<<<', dado);
            if (dado.qtd > 0 && dado.area > 0 && !algumAlerta) { //verifica algum alerta
                let ua = consumo.UA;
                let pesoMedio = matriz.peso.length > 1 ? ((matriz.peso[0] + matriz.peso[1]) / 2) : matriz.peso[0];
                let pTotal = dado.qtd * pesoMedio;
                let x = (pTotal) / ua;
                let arr = [];
                if (x > dado.area) {
                    algumAlerta = true;
                    setMsgAbertura("Informações são suficiente para iniciar a produção, alguns ajustes são necessarios que podem ser feito ao longo do processo produtivo");
                    console.log(x, pTotal);
                    arr.push("De acordo com a lotação \"animal por hectare\" (UA), considerando um peso médio de " + parseInt(pesoMedio) + " kg a quantidade de animal excede o ideal recomendado.");
                    setHasComplemento(true);
                } else if (algumAlerta) {
                    setMsgAbertura("Producao de " + producao.nome + " com informações suficiente para progredir");
                }
                setAlerta(arr);
            }else if( algumAlerta ){ //ja tem alerta, verifica se resolveu o alerta
                if( (dado.suplemento && (dado.suplemento.silo || dado.suplemento.feno || dado.suplemento.capineira)) || (dado.piquete && dado.piquete > 0)){
                    setMsgAbertura("Complemento informado. Apos iniciar o processo assitido, informações e ajustes serão feitos a medida que evolue a produção");
                    setAlerta([]);
                }
            }
        }
        setDisable(!(dado.qtd > 0 && dado.area > 0));
        verificaInformacao();
    }, [dado, setDisable, producao])

    useEffect(() => {
        console.log('>>>>>useEffect do InfoMinimoPanel (producao)<<<<');
        const rep = producao.regras.find(r => r.nome === 'matriz');
        const con = producao.regras.find(r => r.nome === 'consumo');

        matriz = JSON.parse(rep.regra);
        consumo = JSON.parse(con.regra);

        console.log(matriz, consumo);

        setMsgAbertura("Informações minimas necessarioa para iniciar a produção de " + producao.nome);

    }, [producao])

    
    const handleChange = (e) => {
        console.log('.>>handleChange<<<');
        setDado({ ...dado, [e.target.name]: e.target.value });
        algumAlerta = false;
    }

    return (
        <Paper >
            <Container maxWidth="xl">
                <Typography variant="h6" gutterBottom>
                    {msgAbertura}
                </Typography>
                {
                    alertas && alertas.length > 0 &&
                    alertas.map((msg, index) => (
                        <Alert severity="warning" key={index}>{msg}</Alert>
                    ))
                }
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="area"
                            label="Área"
                            style={{ margin: 8 }}
                            placeholder="20"
                            helperText="Informe a área em hectare disponivel para os animais"
                            fullWidth
                            margin="normal"
                            value={dado.area}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">ha</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            error={erro.qtd.erro}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="qtd"
                            label="Quantidade de ovinos adulto"
                            style={{ margin: 8 }}
                            placeholder="100"
                            helperText="Informe a quantidade ou a quantidade pretendia de cabeças que queira produzir"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dado.qtd}
                            onChange={handleChange}
                            required
                            error={erro.qtd.erro}
                        />
                    </Grid>
                    {
                        hasComplemento && 
                        <ComplementarPanel dado={dado} setDado={setDado}/>
                    }
                </Grid>
                <Divider />

                <Alert severity="info">
                    Informações mais precisas como tipo de produção, raça, pasto,etc, podem ser informados depois na melhoria continua do sistema produtivo.
                </Alert>

            </Container>

        </Paper>
    );
}
