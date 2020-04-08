import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import ChartPieProduto from '../../prod/ChartPieProduto';
import ChartBarHorizontal from '../../prod/ChartBarHorizontal';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);
const DIA = 365;
let dados = {};

export default function PainelControleProducaoPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [lucroBruto, setLucroBruto] = useState(0);

  const [animaisProduzido, setAnimaisProduzido] = useState(0);
  const [mortalidade, setMortalidade] = useState(0);
  const [custoProdutivo, setCustoProdutivo] = useState(0);
  const [gastoRacao, setGastoRacao] = useState([]);
  const [barGasto, setBarGasto] = useState();

  const {fazenda, producao} = props;
  
  useEffect(()=>{
      console.log('>>>PainelControleProducaoPanel gastoRacao <<', gastoRacao);
      let arrL = [];
      let arrD = []
      gastoRacao.forEach(item =>{
        arrL.push(item.fase);
        arrD.push(item.gasto);
      })

      setBarGasto([arrL, arrD]);
  }, [gastoRacao])

  useEffect(()=>{
    console.log('>>>PainelControleProducaoPanel<<');
    if( fazenda && producao){
      montaDash();
    }
})
  const handleChange = (panel) => (event, isExpanded) => {
    console.log( panel, event.target )
    setExpanded(isExpanded ? panel : false);
  };

  function montaDash(){
      if( Object.keys(dados).length > 1) return;
      console.log( fazenda, producao);
      dados.precocidade = (producao.dados.reprodutor.precoce[0] + producao.dados.reprodutor.precoce[1])/2;
      dados.mortalidade = (producao.dados.reprodutor.mortalidade[0] + producao.dados.reprodutor.mortalidade[1])/2;
      dados.intervaloEntreParto = (producao.dados.matriz.intervaloEntreParto[0] + producao.dados.matriz.intervaloEntreParto[1])/2;
      dados.prolificidade = (producao.dados.matriz.prolificidade[0] + producao.dados.matriz.prolificidade[1])/2;
      dados.qtdAnimais = producao.dados.producao.qtdAdulto;
      dados.valorCarne = (producao.dados.producao.carnePesoVivo[0] + producao.dados.producao.carnePesoVivo[1])/2

      dados.qtdBorrego = dados.qtdAnimais * dados.prolificidade * (12/dados.intervaloEntreParto);
      dados.qtdMortaliadePorAno = dados.qtdBorrego * (dados.mortalidade/100);
      dados.lucroBruto = (dados.qtdBorrego - dados.qtdMortaliadePorAno) * 30 * dados.valorCarne;

      dados.gasto = calculoCusto();

      setAnimaisProduzido(dados.qtdBorrego - dados.qtdMortaliadePorAno);
      setMortalidade( parseInt(dados.qtdMortaliadePorAno));

      // setLucroBruto( "R$ "+dados.lucroBruto .toLocaleString('pt-br', {minimumFractionDigits: 2}) );
      // setCustoProdutivo("R$ "+dados.gasto.toLocaleString('pt-br', {minimumFractionDigits: 2}) );
      setLucroBruto( dados.lucroBruto);
      setCustoProdutivo(dados.gasto);

      console.log( ">>>>dados<<<<", dados)

  }
  function calculoCusto(){
    let arrRacao = [];
    let pasto= (producao.dados.custoProdutivoUnitario.pasto.manutencao)*1000;
    pasto= pasto * producao.dados.producao.areaProducaoEmHE;
    //sal mineral
    let sal = (producao.dados.consumo.salMineral[0]+producao.dados.consumo.salMineral[1])/2;
    sal = (((sal/1000) * dados.qtdAnimais * DIA)/10) * ((producao.dados.custoProdutivoUnitario.salMineral[0]+producao.dados.custoProdutivoUnitario.salMineral[1])/2); 
    console.log( "========SAL=========", sal );

    let racao = 0;
    // let racao = (producao.dados.consumo.concentrado.normal[0] + producao.dados.consumo.concentrado.normal[0])/2;
    // racao = ((racao * dados.qtdAnimais * DIA) / 40) * producao.dados.custoProdutivoUnitario.racao.manutencao;

    // let intervaloEntreParto = (producao.dados.matriz.intervaloEntreParto[0]+producao.dados.matriz.intervaloEntreParto[1])/2;

    let qtdRacaoComum = (producao.dados.consumo.concentrado.normal[0] + producao.dados.consumo.concentrado.normal[1])/2
    let vlRacaoManutencao = producao.dados.custoProdutivoUnitario.racao.manutencao;

    let qtdGestacao = getOvelhasPrenhaPorAno();
    let qtRacao = producao.dados.consumo.concentrado.gestacao?(producao.dados.consumo.concentrado.gestacao[0]+producao.dados.consumo.concentrado.gestacao[1])/2:qtdRacaoComum
    let custoRacaoGestacao = producao.dados.fases.gestacao * qtRacao* qtdGestacao;
    
    custoRacaoGestacao = (custoRacaoGestacao/ 40) * ( producao.dados.custoProdutivoUnitario.racao.gestacao?producao.dados.custoProdutivoUnitario.racao.gestacao:vlRacaoManutencao );

    arrRacao.push({
      fase:'Gestação: R$'+custoRacaoGestacao.toLocaleString('pt-br', {minimumFractionDigits: 2}),
      qtd: qtdGestacao,
      gasto: custoRacaoGestacao
    })
    racao = custoRacaoGestacao;
    console.log( qtdGestacao, qtRacao, custoRacaoGestacao );

    let prolificidade = (producao.dados.matriz.prolificidade[0]+producao.dados.matriz.prolificidade[1])/2;

    let qtdFilhote = dados.qtdAnimais * prolificidade;

    let greepfeed = (qtdFilhote * producao.dados.fases.lactacao * (
        producao.dados.consumo.concentrado.filhotes?(producao.dados.consumo.concentrado.filhotes[0]+producao.dados.consumo.concentrado.filhotes[1])/2:qtdRacaoComum
      ))/40 * producao.dados.custoProdutivoUnitario.racao.greepfeed;

    arrRacao.push({
      fase: 'Greepfeed: R$'+greepfeed.toLocaleString('pt-br', {minimumFractionDigits: 2}),
      qtd:qtdFilhote,
      gasto: greepfeed
    });
    racao += greepfeed;

    let acabamento = producao.dados.fases.acabamento?producao.dados.fases.acabamento:0;
    let precoce = (producao.dados.reprodutor.precoce[0] +producao.dados.reprodutor.precoce[1])/2;
    precoce = precoce * 30;

    let faseRegria = Math.abs(producao.dados.fases.lactacao - precoce);
    if( faseRegria > 0 && faseRegria < acabamento ){
      let val = ((qtdFilhote * faseRegria * qtdRacaoComum)/40)*vlRacaoManutencao;
      arrRacao.push({
        fase: 'Recria: R$'+qtdFilhote.toLocaleString('pt-br', {minimumFractionDigits: 2}),
        qtd: qtdFilhote,
        gasto: val
      });
      racao += val;
    }
    if (  acabamento > 0 ){
      let val = ((qtdFilhote * acabamento * qtdRacaoComum)/40)* (
        producao.dados.custoProdutivoUnitario.racao.engorda?producao.dados.custoProdutivoUnitario.racao.engorda: vlRacaoManutencao);
      arrRacao.push({
        fase: 'Acabamento: R$'+val.toLocaleString('pt-br', {minimumFractionDigits: 2}),
        qtd: qtdFilhote,
        gasto: val
      });
      racao += val;
    }
    setGastoRacao(arrRacao);

    return pasto+sal+racao;
  }

  function getOvelhasPrenhaPorAno(){
    let intervaloEntreParto = (producao.dados.matriz.intervaloEntreParto[0]+producao.dados.matriz.intervaloEntreParto[1])/2;
    intervaloEntreParto = 12/intervaloEntreParto;

    let qtdGestacao = dados.qtdAnimais * intervaloEntreParto;


    return qtdGestacao;
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon  />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
            <Grid container>
              <Grid item xs={6}>
                <ChartPieProduto 
                titulo={'Resumo da produção'} 
                labels={[
                  'Bruto: R$'+lucroBruto.toLocaleString('pt-br', {minimumFractionDigits: 2}), 
                  'Custo: R$'+custoProdutivo.toLocaleString('pt-br', {minimumFractionDigits: 2}), 
                  'Lucro: R$'+(lucroBruto-custoProdutivo).toLocaleString('pt-br', {minimumFractionDigits: 2}) 
                ]} 
                color={['green', 'red', 'blue']}
                dados={[lucroBruto, custoProdutivo, lucroBruto-custoProdutivo]}
                />
              </Grid>
              <Grid item xs={6}>
                { barGasto && 
                  <ChartBarHorizontal
                    labels={barGasto[0]}
                    dados={barGasto[1]}
                    titulo='Gastos anuais'
                    label='Ração'
                  />
                }
              </Grid>
                
            </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
