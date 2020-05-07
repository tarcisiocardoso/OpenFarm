import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ClimaTable from './ClimaTable';
import ChuvaChart from './ChuvaChart';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
function montaMatriz(fazenda){
  console.log('>>>montaMatriz<<<');
  let tMedia = [];
  let tMinima=[];
  let tMaxima=[];
  let chuva=[];
  let deltaMes = 12 - (fazenda.identificacao.estiagemFim - fazenda.identificacao.estiagemInicio);
  for(let i=0; i< 12; i++){
    tMedia.push(fazenda.identificacao.temperatura);
    tMinima.push(fazenda.identificacao.temperatura);
    tMaxima.push(fazenda.identificacao.temperatura);
    if( i+1 < fazenda.identificacao.estiagemInicio || i+1 > fazenda.identificacao.estiagemFim ){
      chuva.push( parseInt(fazenda.identificacao.chuva / deltaMes) );
    }else if( i+1 === fazenda.identificacao.estiagemInicio || i+1 === fazenda.identificacao.estiagemFim ){ 
      chuva.push( parseInt(fazenda.identificacao.chuva / deltaMes)/2 );
    }else{
      chuva.push( 0 );
    }
  }
  return {tMedia:tMedia, tMinima:tMinima, tMaxima:tMaxima, chuva:chuva};
}
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abri', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Otubro', 'Novembro', 'Dezembro'];

export default function ClimaPanel(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const {fazenda, setFazenda, setEdit } = props;
  

  useEffect(() => {
    if( !fazenda.matrizClima ){
      const matriz = montaMatriz(fazenda);
      setFazenda({...fazenda, matrizClima:matriz});
    }
  });

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  function updateMatriz (matriz){
    setFazenda({...fazenda, matrizClima:matriz});
    setEdit(true);
  }

  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Dado climatológico {fazenda.identificacao.nome}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <ClimaTable  matriz={fazenda.matrizClima} updateMatriz={updateMatriz} meses={meses}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      { fazenda.matrizClima &&
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Grafico distribuição da chuva ao longo dos meses</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <ChuvaChart meses={meses} matriz={fazenda.matrizClima} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      }


{/* 
      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  );
}
