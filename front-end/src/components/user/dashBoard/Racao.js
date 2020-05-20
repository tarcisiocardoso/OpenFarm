import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, InputAdornment, Typography } from '@material-ui/core';

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

    const data = {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            label: 'Ração',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [20, 10, 4, 2]
        }]
    }
    // let arr ={};
    // concentrado.forEach(item => {
    //     arr[item.id]=50;
    // });

    // console.log('>>>arr<<<', arr);
    // setItens(arr);
    const [itens, setItens] = useState(); //(arr);
    const [itensErro, setItensErro] = useState();
    const [proteina, setProteina] = useState(16);

    useEffect(() => {
        console.log('>>>RACAO<<<');
        if (!itens) {
            calculaRacaoInicial();
        }
    }, [concentrado]);

    const handleChangeValor = (e, item) => {
        console.log(e.target.value, "-->", item);
        recalcula(e.target.value, item);
    }
    const handleProteina = (e) => {
        setProteina(e.target.value);
    }

    function calculaRacaoInicial() {
        arrEnergeticos=[];
        arrProteicos=[];
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
            arr[item.id] = parseFloat((porceEnergetico/arrEnergeticos.length).toFixed(2));
            arrErro[item.id]= '';
        });
        arrProteicos.forEach(item => {
            arr[item.id] = parseFloat((porceProteico/arrProteicos.length).toFixed(2));
            arrErro[item.id]= '';
        });
        console.log('>>>arr<<<', arr);
        setItens(arr);
        setItensErro(arrErro);
    }
    function getPorcentagem(id){
        let val = 0;
        for(let x in concentrado){
            if( concentrado[x].id === id){
                val = concentrado[x].p/100;
            }
        }
        return val;
    }
    function getValorProteico(arr, item) {
        if( !item){
            let soma = 0;
            arr.forEach(it=> {
                soma += it.p;
            })
            return soma / arr.length;
        }else{
            let totalParte=0;
            arr.forEach(it=> {
                totalParte += parseFloat(itens[it.id]);
            })
            let qtd=0;
            arr.forEach(it => {
                qtd += (it.p * itens[it.id]/totalParte);
                console.log( it.id+' --->', (it.p * itens[it.id]/totalParte) );
            })
            return qtd;
        }
    }
    function recalcula(valor, item){
        var arr = {...itens};
        var arrErro = {...itensErro};

        if( item.limiteEmPC && item.limiteEmPC < valor){
            arrErro[item.id] = "Ultramassou limite indicado!";
        }else{
            arrErro[item.id] = "";
        }

       let isRecalculando = true;
       let qtd = 0;
       let acrescimo = (valor > arr[item.id])?-1:1;
       let totalProt = 0;
       while( isRecalculando ){
        // console.log('>>>recalculando<<<', acrescimo);
        totalProt = 0;
        for(let x in arr){
            // console.log(x, '-->', arr[x]);
            
            if( x !== item.id){
                totalProt += (arr[x] * getPorcentagem(x) );
                if( arr[x]> 0 ){

                }
            }else{
                totalProt += (valor * getPorcentagem(x) );
            }
            if( totalProt > (proteina + 0.50)){

            }else if( totalProt < proteina ){

            }else{
                isRecalculando = false;// montar os parametros concluido
            }
        }

        if( qtd++ > 2) break;
       }
       console.log("totalProt: "+ totalProt );
       arr[item.id] = valor;
       setItens(arr);
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
                                value={itens[item.id]}
                                variant="filled"
                                helperText={itensErro[item.id]}
                            />
                        ))
                        }
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