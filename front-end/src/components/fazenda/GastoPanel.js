import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Typography, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from '../../util/InfoDialog';
import {useFetch} from '../../server/UseFetch';
import GastoForm from './GastoForm';
import GastoTable from './GastoTable';

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
    }
  },
  expanded: {},
})(MuiExpansionPanel);
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  toRigth: {
    float: theme.right
  }
}));

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

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  }
}))(MuiExpansionPanelDetails);

export default function GastoPanel(props) {
  const {fazenda, setFazenda, commit, isEdit, setEdit } = props;

  const [ openInfo, setOpenInfo] = React.useState(false);
  const [expanded, setExpanded] = React.useState({
    panel1:false,
    panel2:true,
    panel3:false
  });
  const [info, loading] = useFetch("/api/info");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded({...expanded, [panel]: newExpanded} );
  };
  const handleOpenInfo=(e)=>{
    setOpenInfo(true);
    setExpanded({...expanded} );
  }
  const handleAddGasto=( gasto)=>{
    setEdit(true);

    let arr =[];
    if( fazenda.gastos && fazenda.gastos.length > 0 ){
      arr = [...fazenda.gastos];
    }
    arr.push( gasto);
    setFazenda({...fazenda, gastos:arr});
  }

  return (
    <div>
      <ExpansionPanel square expanded={expanded.panel1} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography >
            Cadastro de gastos fixos da propriedade.
            <IconButton color="primary" aria-label="info" onClick={handleOpenInfo}>
              <InfoIcon />
            </IconButton>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GastoForm addGasto={handleAddGasto}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded.panel2} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Tabelas dos gasto</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GastoTable gastos={fazenda.gastos}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel square expanded={expanded.panel3} onChange={handleChange('panel3')}>
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
      </ExpansionPanel>
      { !loading &&
        <InfoDialog open={openInfo} setOpen={setOpenInfo} info={info.cadGastoFixo}/>
      }
    </div>
  );
}
