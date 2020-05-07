import React, { useState, useEffect } from 'react';
import ChartBarConsumoVsProducao from '../../prod/ChartBarConsumoVsProducao';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const dt = new Date();
export default function NecessidadeCustoPanel(props){
    const {producao, fazenda} = props;
    const [dadosProd, setDadosProd]= useState([]);
    const [dadosCons, setDadosCons]= useState([]);
    const [reserva, setReserva]= useState([]);
    const [labels, setLabels] = useState(['Pasto']);

            
    useEffect(()=>{
        function getProducaoMesIdeal(){
            let mes=0;
            let maxMes=0;
            for(let x in fazenda.matrizClima.chuva){
                if( maxMes < fazenda.matrizClima.chuva[x]){
                    maxMes = fazenda.matrizClima.chuva[x];
                    mes = x;
                }
            }
            return makeConsumoProducaoMes(mes, 0,0); 
        }
        function makeConsumoProducaoMes(mes, producaoPasto, consumoAnimal){
            let sobraAnterior = producaoPasto - consumoAnimal;
    
            const chuvaMMDoMes = fazenda.matrizClima.chuva[ mes ];
            const pasto = producao.dados.pasto;
            const area = producao.dados.producao.areaProducaoEmHE;
            const msPorMesMinima = pasto.producaoMS[0]/12;
            const msPorMesMaxima = pasto.producaoMS[1]/12;
            let capacidade = msPorMesMaxima; //em kg
    
            if( chuvaMMDoMes >= pasto.precipitacao[0]/12 && chuvaMMDoMes <= (pasto.precipitacao.length>1?pasto.precipitacao[1]/12:pasto.precipitacao[0]/12) ){
                capacidade = msPorMesMinima;
            }else if( chuvaMMDoMes < pasto.precipitacao[0]/12 ){
                capacidade = msPorMesMaxima/2;
                if( chuvaMMDoMes < pasto.precipitacao[0]/36 ){
                    capacidade =msPorMesMinima/10;
                }
            }
    
            capacidade = capacidade * area;
            if( consumoAnimal > capacidade && sobraAnterior > 0 ){
                capacidade = sobraAnterior+capacidade;
                if( capacidade > producaoPasto) capacidade = producaoPasto;
            }
    
            const peso = (producao.dados.matriz.peso[0]+producao.dados.matriz.peso[1])/2;
            const precoce= (producao.dados.reprodutor.precoce[0]+ producao.dados.reprodutor.precoce[1])/2;
            let qtdAnimal = producao.dados.producao.qtdAdulto;
            let consumoDiario=3;
            if( precoce >=9 ){
                consumoDiario = 4.0;
            }
            const cst = ((peso * consumoDiario/100)* qtdAnimal * 30)/1000; //tem tonelada
    
            return [parseFloat(capacidade.toFixed(2)), parseFloat(cst.toFixed(2)) ];
        }
    
        if( fazenda && producao ){
            let prodMesIdeal = getProducaoMesIdeal();

            let sobra = parseFloat(prodMesIdeal[0].toFixed(2));//-prodMesIdeal[1];
            if( producao.dados.pasto.piquetes && producao.dados.pasto.piquetes >= 4){
                if( sobra > 0) sobra *= 1.2;//producao.dados.pasto.piquetes/2;
            }

            let mes = dt.getMonth();
            let cap=[];
            let cons=[];
            let reser=[];
            let val = makeConsumoProducaoMes(mes, 0, 0);
            let arr= [meses[mes]];
            cap.push(val[0]);
            cons.push(val[1]);
            sobra = (val[0]< val[1])?sobra-( val[1]-val[0]):sobra;
            reser.push( sobra> 0?sobra:0);
            for(let i=0; i< 5; i++ ){
                if( ++mes > 11)mes=0;

                val = makeConsumoProducaoMes(mes, val[0], val[1]);
                arr.push(meses[mes]);
                cap.push(val[0]);
                cons.push(val[1]);
                sobra = (val[0]< val[1])?sobra-( val[1]-val[0]):sobra;
                reser.push( sobra> 0?parseFloat(sobra.toFixed(2)):0);
    
            }
            
            setLabels(arr);
            setDadosProd(cap);
            setDadosCons(cons);
            setReserva(reser);
        }

    }, [fazenda, producao]);
  

    return (
        <ChartBarConsumoVsProducao nome={meses[dt.getMonth()]} producao={dadosProd} consumo={dadosCons} reserva={reserva} labels={labels} />
    )
}