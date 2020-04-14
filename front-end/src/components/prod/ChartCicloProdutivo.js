import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';


const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const dt = new Date();
let recalcula = true;
export default function ChartCicloProdutivo(props){
  const {fazenda, producao} = props
  const [parto, setParto] = useState([]);
  const [filhotes, setFilhotes] = useState([]);
  const [borregos, setBorrregos] = useState([]);
  const [terminacao, setTerminacao]= useState([]);

  const [labels, setLabels]= useState([]);
  const [titulo, setTitulo] = useState('');
  
  const [ciclo, setCiclo] = useState('mensal');
  
  useEffect(()=>{
    console.log('>>>chartCicloProdutivo<<<', fazenda, producao );

    if( fazenda && producao && recalcula){
      let cicloProdutivo = producao.dados.producao.cicloProdutivo?producao.dados.producao.cicloProdutivo:'mensal';

      switch( cicloProdutivo){
        case 'mensal':
          calculoMensal();
          break;
      }
    }

  }, [fazenda, producao]);

  function calculoMensal(){
    console.log('==================fazendo calculo mensal===============')
    const qtdPorCiclo = producao.dados.producao.qtdAdulto/ ((producao.dados.matriz.intervaloEntreParto[0]+producao.dados.matriz.intervaloEntreParto[1])/2);
    const faseLactacao = parseInt(producao.dados.fases.lactacao);
    const prolificidade = (producao.dados.matriz.prolificidade[0]+producao.dados.matriz.prolificidade[1])/2;
    const taxaMortalidade = (producao.dados.reprodutor.mortalidade[0]+producao.dados.reprodutor.mortalidade[1])/2;
    const precocidade = 30*(producao.dados.reprodutor.precoce[0]+producao.dados.reprodutor.precoce[1])/2;
    const acabamento = parseInt(producao.dados.fases.acabamento);


    let arrParto =[];
    let arrFilhotes =[];
    let arrBorregos=[];
    let arrLabel=[];
    let arrTerminacao=[];
    let lac = 0;
    let qtdFilhote = qtdPorCiclo;
    let qtdBorrego =0;
    let qtdTerminacao=0;
    let tBorrego=0;
    let tTerminacao=0;
    let mes=0
    for (let x=0; x< 26; x++){
      if( mes > 11) mes=0;
      lac += 30;
      tBorrego+= 30;
      tTerminacao+=30;

      arrFilhotes.push(parseInt(qtdFilhote - (qtdFilhote * taxaMortalidade/100)));
      arrParto.push(qtdPorCiclo);
      arrBorregos.push( qtdBorrego );
      arrTerminacao.push(qtdTerminacao);
      arrLabel.push( meses[mes] );

      if( lac >= faseLactacao ){
        qtdBorrego+= parseInt(qtdFilhote - (qtdFilhote * taxaMortalidade/100)) ;
        qtdFilhote=1;
        lac=1;
      }
      if( tBorrego >= precocidade - acabamento){
        if( qtdTerminacao=== 0 )tTerminacao=0;
        qtdTerminacao+= qtdBorrego;
        tBorrego=0;
        qtdBorrego =0;
      }
      if( tTerminacao >= acabamento){
        qtdTerminacao=0;
      }
      qtdFilhote += parseFloat(( qtdPorCiclo * prolificidade).toFixed(2));
      mes++; 
    }
    setParto(arrParto);
    setFilhotes(arrFilhotes)
    setBorrregos(arrBorregos );
    setLabels(arrLabel);
    setTerminacao( arrTerminacao );
    setTitulo("Cilogo produtivo de "+producao.dados.producao.qtdAdulto+" matrizes com "+parseInt(qtdPorCiclo)+" montas por mes");
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cobertura',
        backgroundColor: 'blue',
        borderColor:'blue',
        fill: false,
        // fill: false,
        // lineTension: 0.1,
        // backgroundColor: 'blue',
        // borderColor: 'rgba(75,192,192,1)',
        // borderCapStyle: 'butt',
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        // pointBorderColor: 'rgba(75,192,192,1)',
        // pointBackgroundColor: 'blue',
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        // pointHoverBorderColor: 'rgba(220,220,220,1)',
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: parto
      },
      {
        label: 'Filhotes',
        backgroundColor: 'green',
        borderColor:'green',
        fill: false,
        data: filhotes
      },
      {
        label: 'Borregos',
        backgroundColor: 'orange',
        borderColor:'orange',
        fill: false,
        data: borregos
      },
      {
        label: 'Terminação',
        backgroundColor: 'red',
        borderColor:'red',
        fill: false,
        data: terminacao
      }
    ]
  };
  const options = {
    title: {
      display: true,
      text: titulo
    },
    // maintainAspectRatio: true,
    // responsive: true,
    aspectRatio:1,
    legend: {
      position: 'top',
    },
    onClick: (e, item) => {
      // console.log(`Item with text ${item[0]._index} and index ${item[0]._datasetIndex} clicked`);
      e.stopPropagation();
    }
  }

  
    return (
      <div>
        {/* <h2>Line Example</h2> */}
        <Line 
          data={data} 
          width={800}
          // height={300}
          options={options}
        />
      </div>
    );
}