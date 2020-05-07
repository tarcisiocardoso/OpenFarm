import React, {useEffect, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Container } from '@material-ui/core';
import ChartPieProduto from '../../prod/ChartPieProduto';
import ChartBarHorizontal from '../../prod/ChartBarHorizontal';
import ChartCicloProdutivo from '../../prod/ChartCicloProdutivo';
import AlimentacaoTable from './AlimentacaoTable';
import FormGastosPanel from '../../prod/FormGastosPanel';
import FormProducaoPanel from '../../prod/FormProducaoPanel';
import NecessidadeCustoPanel from './NecessidadeCustoPanel';

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
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export default function PainelControleProducaoPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [lucroBruto, setLucroBruto] = useState(0);

  // const [animaisProduzido, setAnimaisProduzido] = useState(0);
  // const [mortalidade, setMortalidade] = useState(0);
  const [custoProdutivo, setCustoProdutivo] = useState(0);
  const [gastoAlimentacao, setGastoAlimentacao] = useState([]);
  const [barGasto, setBarGasto] = useState();

  const {fazenda, producao, update} = props;
  
  useEffect(()=>{
      let arrL = [];
      let arrD = []
      gastoAlimentacao.forEach(item =>{
        arrL.push(item.fase);
        arrD.push(item.gasto);
      })

      setBarGasto([arrL, arrD]);
  }, [gastoAlimentacao])

  useEffect(()=>{
    function montaDash(){
      console.log( '>>>MONTA DASH<<<', dados );
        
      function calculoCusto(){
        const faseLactacao = parseInt(producao.dados.fases.lactacao);
        const faseAcabamento = parseInt(producao.dados.fases.acabamento);
        let arrGasto = [];
        let qtdGestacao = getOvelhasPrenhaPorAno();
    
        let pasto= (producao.dados.custoProdutivoUnitario.pasto.manutencao)*1000;
        pasto= pasto * producao.dados.producao.areaProducaoEmHE;
        
        arrGasto.push({
          fase:'Pasto',
          qtd: producao.dados.producao.areaProducaoEmHE,
          tipo: 'hectare',
          gasto: pasto
        });
    
        //sal mineral
        let sal = ((producao.dados.consumo.salMineral[0]+producao.dados.consumo.salMineral[1])/2)/1000;
        let sacoSal = parseInt(((sal * qtdGestacao * DIA)/20));
        sal = sacoSal * ((producao.dados.custoProdutivoUnitario.salMineral[0]+producao.dados.custoProdutivoUnitario.salMineral[1])/2); 
    
        arrGasto.push({
          fase:'Sal',
          tipo: 'saco 20kg',
          qtd: sacoSal,
          gasto: sal
        });
    
        let qtdRacaoComum = (producao.dados.consumo.concentrado.padrao[0] + producao.dados.consumo.concentrado.padrao[1])/2;
        let qtdRacaoRecria = (producao.dados.consumo.concentrado.borrego[0] + producao.dados.consumo.concentrado.borrego[1])/2;
        let vlRacaoManutencao = producao.dados.custoProdutivoUnitario.racao.manutencao;
    
        
        let qtRacao = producao.dados.consumo.concentrado.gestacao?(producao.dados.consumo.concentrado.gestacao[0]+producao.dados.consumo.concentrado.gestacao[1])/2:qtdRacaoComum
        let custoRacaoGestacao = producao.dados.fases.gestacao * qtRacao* qtdGestacao;
        
        custoRacaoGestacao = (custoRacaoGestacao/ 40) * ( producao.dados.custoProdutivoUnitario.racao.gestacao?producao.dados.custoProdutivoUnitario.racao.gestacao:vlRacaoManutencao );
    
        arrGasto.push({
          fase:'Gestação',
          qtd: qtdGestacao,
          tipo: 'gestante/'+producao.dados.fases.gestacao+" dias",
          gasto: custoRacaoGestacao
        })
    
        qtRacao = producao.dados.consumo.concentrado.gestacao?(producao.dados.consumo.concentrado.lactacao[0]+producao.dados.consumo.concentrado.lactacao[1])/2:qtdRacaoComum
        let custoLactacao = faseLactacao * qtRacao * qtdGestacao;
        custoLactacao = (custoLactacao/40) * ( producao.dados.custoProdutivoUnitario.racao.lactacao?producao.dados.custoProdutivoUnitario.racao.lactacao:vlRacaoManutencao );
        arrGasto.push({
          fase:'Lactação',
          qtd: qtdGestacao,
          tipo: 'lactante/'+faseLactacao+" dias",
          gasto: custoLactacao
        })
    
        let prolificidade = (producao.dados.matriz.prolificidade[0]+producao.dados.matriz.prolificidade[1])/2;
    
        let qtdFilhote = dados.qtdAnimais * prolificidade;
    
        let greepfeed = (qtdFilhote * faseLactacao * (
            producao.dados.consumo.concentrado.filhotes?(producao.dados.consumo.concentrado.filhotes[0]+producao.dados.consumo.concentrado.filhotes[1])/2:qtdRacaoComum
          ))/40 * producao.dados.custoProdutivoUnitario.racao.greepfeed;
    
        arrGasto.push({
          fase: 'Greepfeed',
          qtd:qtdFilhote,
          tipo: "filhostes/"+faseLactacao+" dias",
          gasto: greepfeed
        });
        // racao += greepfeed;
    
        let acabamento = faseAcabamento?faseAcabamento:0;
        let precoce = (producao.dados.reprodutor.precoce[0] +producao.dados.reprodutor.precoce[1])/2;
        precoce = precoce * 30;
    
        let faseRegria = precoce - (faseLactacao + faseAcabamento);
        if( faseRegria > 0 && producao.dados.custoProdutivoUnitario.racao.cordeiro ){
          let val = ((qtdFilhote * faseRegria * qtdRacaoRecria)/40)*producao.dados.custoProdutivoUnitario.racao.cordeiro;
          arrGasto.push({
            fase: 'Recria',
            qtd: qtdFilhote, //Math.abs(faseRegria - acabamento),
            tipo: 'crias/'+faseRegria+" dias",
            gasto: val
          });
          // racao += val;
        }
        if (  acabamento > 0 ){
          let borregos = qtdFilhote/2; //metade é femea
          let val = ((borregos * acabamento * qtdRacaoComum)/40)* (
            producao.dados.custoProdutivoUnitario.racao.engorda?producao.dados.custoProdutivoUnitario.racao.engorda: vlRacaoManutencao);
          arrGasto.push({
            fase: 'Acabamento',
            qtd: qtdFilhote,
            tipo: "borregos/"+acabamento+" dias",
            gasto: val
          });
          // racao += val;
        }
        setGastoAlimentacao(arrGasto);
        let gasto = 0;
        arrGasto.forEach(r => gasto+=r.gasto);
        
        return gasto;
      }
    
      function getOvelhasPrenhaPorAno(){
        let intervaloEntreParto = (producao.dados.matriz.intervaloEntreParto[0]+producao.dados.matriz.intervaloEntreParto[1])/2;
        intervaloEntreParto = 12/intervaloEntreParto;
    
        let qtdGestacao = dados.qtdAnimais * intervaloEntreParto;
    
    
        return parseInt(qtdGestacao);
      }
      
      // if( Object.keys(dados).length > 1) return;
  
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
  
        // setAnimaisProduzido(dados.qtdBorrego - dados.qtdMortaliadePorAno);
        // setMortalidade( parseInt(dados.qtdMortaliadePorAno));
  
        setLucroBruto( dados.lucroBruto);
        setCustoProdutivo(dados.gasto);
    }
    if( fazenda && producao){
      montaDash();
    }
  }, [fazenda, producao])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  function atualicaCharts(prod){
    dados = {};
    update(prod);
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
              <Grid item xs={3}>
                <ChartPieProduto 
                titulo={'Resumo da produção'} 
                labels={[
                  ((lucroBruto-custoProdutivo)< 0) ?
                  'Prejuizo: R$'+(lucroBruto-custoProdutivo).toLocaleString('pt-br', {minimumFractionDigits: 2}):
                    'Lucro: R$'+(lucroBruto-custoProdutivo).toLocaleString('pt-br', {minimumFractionDigits: 2}),
                  'Bruto: R$'+lucroBruto.toLocaleString('pt-br', {minimumFractionDigits: 2}), 
                  'Custo: R$'+custoProdutivo.toLocaleString('pt-br', {minimumFractionDigits: 2})
                ]} 
                color={[((lucroBruto-custoProdutivo)< 0)?'red':'blue', 'green', 'DarkRed']}
                dados={[lucroBruto-custoProdutivo, lucroBruto, custoProdutivo]}
                />
              </Grid>
              <Grid item xs={5} align='center'>
                { barGasto && 
                  <ChartBarHorizontal
                    labels={barGasto[0]}
                    dados={barGasto[1]}
                    titulo='Gastos anuais'
                    label='Alimentação'
                    monetario={true}
                  />
                }
              </Grid>
              <Grid item xs={4} align='right'>
                <NecessidadeCustoPanel fazenda={fazenda} producao={producao}/>
              </Grid>
                
            </Grid>
        </ExpansionPanelSummary>
        { producao &&
          <ExpansionPanelDetails>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <AlimentacaoTable arrAlimentacao={gastoAlimentacao} producao={producao}/>
              </Grid>
              <Grid item xs={6}>
                <FormGastosPanel producao={producao} update={atualicaCharts} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        }
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
              <ChartCicloProdutivo 
                fazenda={fazenda}
                producao={producao}
                meses={meses}
              />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container fixed align='center'>
            <FormProducaoPanel 
              producao={producao}
              update={atualicaCharts}
              meses={meses}
            />
          </Container>
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
