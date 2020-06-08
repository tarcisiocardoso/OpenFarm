import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, InputAdornment, Typography, Button } from '@material-ui/core';

import { Radar } from 'react-chartjs-2';

var arrProteicos = [];
var arrEnergeticos = [];

export default function Racao() {
    const concentrado = [
        {
            id: 'milho',
            p: 9.4,
            nome: 'Milho'
        },
        {
            id: 'soja',
            p: 43,
            nome: 'Soja'
        },
        {
            id: 'fareloTrigo',
            p: 16,
            nome: 'Farelo de trigo',
            limiteEmPC: 16,
            descricao: 'Possui teor protéico médio (16%) e maior teor de fibra que as demais fontes protéicas. É excelente fonte de micro-elementos minerais, como selênio, zinco e outros. Possui elevadíssimo teor de fósforo e desta maneira não deve ser utilizado em grande quantidade, máximo de 20-25% da ração concentrada, pois a ingestão elevada de fósforo pode causar a urolitíase obstrutiva (cálculos na uretra), principalmente em machos.'
        },
        {
            id: 'fareloArroz',
            p: 14.41,
            nome: 'Farelo de arroz'
        }
    ];

    const titulo = 'Formulação de ração';

    const [data, setData] = useState({
        labels: [], //['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            label: 'Ração',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [] //[20, 10, 4, 2]
        }]
    });

    const [itens, setItens] = useState(); //(arr);
    const [itensErro, setItensErro] = useState();
    const [proteina, setProteina] = useState(16);

    useEffect(() => {
        if (!itens) {
            calculaRacaoInicial();
        }
    }, [concentrado]);

    const handleChangeValor = (e, item) => {
        //recalcula(e.target.value, item);
        let valor = e.target.value;
        valor = valor?valor:0;
        var arr = { ...itens };
        arr[item.id] = parseFloat(valor);
        setItens(arr);
    }
    const handleLostFocus = (e) =>{
        console.log('>>>handleLostFocus<<<');
    }
    const handleProteina = (e) => {
        setProteina(e.target.value);
    }

    function calculaRacaoInicial() {
        arrEnergeticos = [];
        arrProteicos = [];
        concentrado.forEach(item => {
            if (item.p < proteina) {
                arrEnergeticos.push(item);
            } else {
                arrProteicos.push(item);
            }
        });
        let protEnergetico = getValorProteico(arrEnergeticos);
        let protProteico = getValorProteico(arrProteicos);

        let parteEnergetico = Math.abs(protProteico - proteina);
        let parteProteico = Math.abs(protEnergetico - proteina);
        let parteTotal = parteProteico + parteEnergetico;

        let porceEnergetico = (parteEnergetico / parteTotal) * 100;
        let porceProteico = (parteProteico / parteTotal) * 100;

        console.log('-->', porceEnergetico);
        console.log('-->', porceProteico);

        let arr = {};
        let arrErro = {};
        arrEnergeticos.forEach(item => {
            arr[item.id] = parseFloat((porceEnergetico / arrEnergeticos.length).toFixed(2));
            arrErro[item.id] = '';
        });
        arrProteicos.forEach(item => {
            arr[item.id] = parseFloat((porceProteico / arrProteicos.length).toFixed(2));
            arrErro[item.id] = '';
        });
        console.log('>>>arr<<<', arr);

        let dado = {...data};
        dado.labels=[];
        dado.datasets[0].data=[];
        for(let x in arr){
            if( arr[x] > 0 ){
                dado.labels.push(x);
                dado.datasets[0].data.push( arr[x])
            }
        }
        setData(dado);

        setItens(arr);
        setItensErro(arrErro);
    }
    function getValorProteicoRacao(id) {
        let val = 0;
        for (let x in concentrado) {
            if (concentrado[x].id === id) {
                val = concentrado[x].p;
                break;
            }
        }
        return val;
    }
    function getValorProteico(arr) {
        let soma = 0;
        arr.forEach(it => {
            soma += it.p;
        })
        return soma / arr.length;
    }
    function getValorProteicoEmPc(arr){
        let soma = 0;
        let total =0;
        arr.forEach(it => {
            total += it.parte;
        }) 
        arr.forEach(it => {
            soma += it.proteina * (it.parte/total);
        })
        return soma;
    }
    function handleOnClick(e){
        console.log('>>handleOnClick<<');
        recalcula();
    }
    function recalcula() {
        var arr = { ...itens };
        
        let total = 0;
        Object.entries(arr).map( i => total += i[1]);

        let novaRacao= [];
        for(let x in arr){
            novaRacao.push({
                nome:x,
                parte:arr[x],
                proteina: getValorProteicoRacao(x),
            });
        }
        arrEnergeticos = [];
        arrProteicos = [];
        novaRacao.forEach(item => {
            if (item.proteina < proteina) {
                arrEnergeticos.push(item);
            } else {
                arrProteicos.push(item);
            }
        });
        let protEnergetico = getValorProteicoEmPc(arrEnergeticos);
        let protProteico = getValorProteicoEmPc(arrProteicos);

        let parteEnergetico = Math.abs(protProteico - proteina);
        let parteProteico = Math.abs(protEnergetico - proteina);
        let parteTotal = parteProteico + parteEnergetico;

        let porceEnergetico = (parteEnergetico / parteTotal) * 100;
        let porceProteico = (parteProteico / parteTotal) * 100;

        let totalParte=0;
        arrEnergeticos.forEach( it => totalParte += it.parte);

        arrEnergeticos.forEach(item => {
            arr[item.nome] = parseFloat((porceEnergetico * (item.parte/totalParte)).toFixed(2));
            // arrErro[item.nome] = '';
        });
        totalParte=0;
        arrProteicos.forEach( it => totalParte += it.parte);
        arrProteicos.forEach(item => {
            arr[item.nome] = parseFloat((porceProteico * (item.parte/totalParte)).toFixed(2));
            // arrErro[item.nome] = '';
        });

        let dado = {...data};
        dado.labels=[];
        dado.datasets[0].data=[];
        for(let x in arr){
            if( arr[x] > 0 ){
                dado.labels.push(x);
                dado.datasets[0].data.push( arr[x])
            }
        }

        validarRacao(arr);

        setData(dado);

        setItens(arr);
    }
    function validarRacao(arr){
        var arrErro = { ...itensErro };
        for(let x in arr){
            let item = concentrado.find(item => item.id === x);
            if( item && item.limiteEmPC && arr[x] > item.limiteEmPC  ){
                arrErro[x] = "Ultramassou limite indicado!"; 
            }else{
                arrErro[x] = "";
            }
        }

        setItensErro(arrErro);
    }
    return (
        <Paper>
            <Grid container>
                <Grid item xs={8}>
                    <h2>{titulo}</h2>
                    <Radar
                        data={data}
                        width={100}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <Typography variant="subtitle1">
                            Igredientes para formulação da ração
                        </Typography>
                        {itens && concentrado.map((item, index) => (
                            <TextField key={index} fullWidth
                                error={itensErro[item.id].length > 0}
                                name={item.id}
                                label={item.nome}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{item.p + "%"}</InputAdornment>,
                                }}
                                onChange={e => { handleChangeValor(e, item) }}
                                onBlur={e => handleLostFocus(e, item)}
                                value={itens[item.id]}
                                variant="filled"
                                helperText={itensErro[item.id]}
                            />
                        ))
                        }
                        <Button variant="contained" color="primary" onClick={handleOnClick}>
                            Recalcular
                        </Button>
                        <Typography variant="subtitle1">
                            Porcentagem proteica
                        </Typography>
                        <TextField fullWidth
                            id="proteina"
                            label="Proteina:"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            onChange={handleProteina}
                            value={proteina}
                            variant="filled"
                        />


                    </div>
                </Grid>
            </Grid>
        </Paper>
    );

}