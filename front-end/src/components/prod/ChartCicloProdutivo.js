import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';

const useStyles = makeStyles((theme) =>
  createStyles({
    btn: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      position: 'absolute',
      top: 0,
      right: 0
    }
  })
);

let mesInicio=0;
let recalcula = true;
export default function ChartCicloProdutivo(props) {
  const classes = useStyles();
  const { fazenda, producao, meses } = props
  const [showInfo, setShowInfo] = useState(false);
  const [parto, setParto] = useState([]);
  const [filhotes, setFilhotes] = useState([]);
  const [borregos, setBorrregos] = useState([]);
  const [terminacao, setTerminacao] = useState([]);

  const [labels, setLabels] = useState([]);
  const [titulo, setTitulo] = useState('');


  let infoPiquete = {
    titulo: 'Ciclo Produtivo',
    descricao: `Fazer constrole de monta alem de melhorar o conhecimento da produtividade de cada animal, permite montar um fluxo e ter maior controle sobre a produção 
    reconhecendo animais que saem da curva ideal.`,
  }

  useEffect(() => {
    function calculoBiMensal(intervalo){
      const qtdPorCiclo = producao.dados.producao.qtdAdulto / ((producao.dados.matriz.intervaloEntreParto[0] + producao.dados.matriz.intervaloEntreParto[1]) / 2) * intervalo;
      const faseLactacao = parseInt(producao.dados.fases.lactacao);
      const prolificidade = (producao.dados.matriz.prolificidade[0] + producao.dados.matriz.prolificidade[1]) / 2;
      const taxaMortalidade = (producao.dados.reprodutor.mortalidade[0] + producao.dados.reprodutor.mortalidade[1]) / 2;
      const precocidade = 30 * ((producao.dados.reprodutor.precoce[0] + producao.dados.reprodutor.precoce[1]) / 2);
      const acabamento = parseInt(producao.dados.fases.acabamento);
      let init = false;
  
      let arrLabel = [];
      let arrParto = [];
      let arrFilhotes = [];
      let arrBorregos = [];
      let arrTerminacao = [];
      let qtdCobertura =0;
      let qtdFilhote=0;
      let qtdBorrego=0;
      let qtdTerminacao = 0;
      let cobertura=[];
      let filhotes=[];
      let borrego=[];
      let terminacao=[];
      let mes = 0;
      let tParto=0;
      for (let x = 0; x < 26; x++) {
        
        if( !init ){
          init = x >= mesInicio;
          if (!init){ 
            arrParto.push(0);
            arrFilhotes.push( 0);
            arrBorregos.push(0);
            arrTerminacao.push(0);
            arrLabel.push(meses[mes]);
            mes++;
            tParto+=30;
            continue;
          }
        }
        if (mes > 11) mes = 0;
        
        incrementaTempo(cobertura);
        incrementaTempo(filhotes);
        incrementaTempo(borrego);
        incrementaTempo(terminacao);
  
        qtdCobertura=0
        if( tParto % (30*intervalo) === 0 ){
          cobertura.push({
            qtd: parseFloat((qtdPorCiclo).toFixed(2)),
            tempo:1
          });
          qtdCobertura=cobertura[0].qtd;
        }
        if( tempoCobertura(cobertura, 150)){
          let val = cobertura[0].qtd * prolificidade;
          filhotes.push({
            qtd: parseFloat( val.toFixed(2)),
            tempo:1
          });
          cobertura.shift();
        }
        if (tempoLactacao(filhotes, faseLactacao)) {
          let val = filhotes[0].qtd;//getTotal(filhotes);
          val = parseInt(val - (val * (taxaMortalidade/2) / 100));
          filhotes.shift();
          borrego.push({
            qtd: val,
            tempo:1,
          });
        }
        if( tempoRegrica(borrego, (precocidade - acabamento- faseLactacao)) ){
          let val = borrego[0].qtd;
          val = parseInt(val - (val * (taxaMortalidade/2) / 100));
          terminacao.push({
            qtd: val,
            tempo:1
          })
          borrego.shift();
        }
        if( tempoTerminacao(terminacao, acabamento)){
          terminacao.shift();
        }
        // qtdCobertura     = getTotal( cobertura);
        qtdFilhote   = getTotal(filhotes);
        qtdBorrego   = getTotal(borrego);
        qtdTerminacao= getTotal(terminacao);
              
        arrParto.push(parseFloat(qtdCobertura.toFixed(2)));
        arrFilhotes.push( qtdFilhote);
        arrBorregos.push(qtdBorrego);
        arrTerminacao.push(qtdTerminacao);
        arrLabel.push(meses[mes]);
        mes++;
        tParto+=30;
      }
      setParto(arrParto);
      setFilhotes(arrFilhotes);
      setBorrregos(arrBorregos);
      setTerminacao(arrTerminacao);
      setLabels(arrLabel);
      setTitulo("Ciclo produtivo " + producao.dados.producao.qtdAdulto + " matrizes com " + parseInt(qtdPorCiclo) + " monta a cada "+intervalo+" meses.");
    }
    if (fazenda && producao && recalcula) {
      let cicloProdutivo = producao.dados.producao.cicloProdutivo ? producao.dados.producao.cicloProdutivo : 1;
      calculoBiMensal(cicloProdutivo)
    }

  }, [fazenda, producao, meses]);


  function incrementaTempo(filhotes){
    for(let x in filhotes){
      filhotes[x].tempo +=30;
    }
  }
  function getTotal(filhotes){
    let qtd =0;
    for( let x in filhotes){
      qtd += filhotes[x].qtd;
    }
    return qtd;
  }
  function tempoCobertura(gestante, tempo){
    for( let x in gestante){
      if( gestante[x].tempo >= tempo){
        return true;
      }
    }
  }
  function tempoLactacao(filhotes, faseLactacao){
    for( let x in filhotes){
      if( filhotes[x].tempo >= faseLactacao){
        return true;
      }
    }
  }
  function tempoTerminacao(terminacao, acabamento){
    for( let x in terminacao){
      if( terminacao[x].tempo >= acabamento){
        return true;
      }
    }
  }
  function tempoRegrica(borrego, tempo){
    for( let x in borrego){
      if( borrego[x].tempo >= tempo ){
        return true;
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cobertura',
        backgroundColor: 'blue',
        borderColor: 'blue',
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
        borderColor: 'green',
        fill: false,
        data: filhotes
      },
      {
        label: 'Borregos',
        backgroundColor: 'orange',
        borderColor: 'orange',
        fill: false,
        data: borregos
      },
      {
        label: 'Terminação',
        backgroundColor: 'red',
        borderColor: 'red',
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
    aspectRatio: 1,
    legend: {
      position: 'top',
    },
    onClick: (e, item) => {
      e.stopPropagation();
    }
  }

  const handleInfoClick = (e) => {
    setShowInfo(true);
    e.stopPropagation();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {/* <h2>Line Example</h2> */}
        <Line
          data={data}
          width={800}
          // height={300}
          options={options}
        />
          <IconButton className={classes.btn} color="primary" aria-label="add to shopping cart" onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
      </Grid>
      <InfoDialog open={showInfo} setOpen={setShowInfo} info={infoPiquete} />
    </Grid>
  );
}