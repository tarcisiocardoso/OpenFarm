import React, {useRef} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableGastos from './TableGastos';

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

export default function ListaFazendaPanel(props) {
    const classes = useStyles();
    const { arrFarm } = props;
    const [expanded, setExpanded] = React.useState(false);
    const mapFazenda = useRef(new Map());
    const [fazenda, setFazenda] = React.useState();

    const handleChange = (panel) => (event, isExpanded) => {
        console.log('>>>handleChange<<<', panel);
        setExpanded(isExpanded ? panel : false);
        if( isExpanded) getFazenda(panel).then(data => {
            console.log('>>>setFazenda<<<', data )
            setFazenda(data); 
        });

    };

    async function getFazenda(panel){
        const id = panel.split('_')[1];
        if( !mapFazenda.current.get(id)){
            console.log('>>>buscando do servidor<<<')
            let response = await fetch('/api/farm/'+id);
            let data = await response.json();
            mapFazenda.current.set(id, data);
            return data;
        }else{
            // console.log('>>>mapFazenda.current.get(id)<<<', mapFazenda.current.get(id) );
            return new Promise((resolve) =>( resolve(mapFazenda.current.get(id)) ) );
        }
    }

    return (
        <div className={classes.root}>
            {
                arrFarm && arrFarm.map((farm, index) => (
                    <ExpansionPanel key={index} expanded={expanded === 'panel_'+farm.id} onChange={handleChange('panel_'+farm.id)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Painel de controle</Typography>
                            <Typography className={classes.secondaryHeading}>{farm.identificacao.nome}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <TableGastos fazenda={fazenda}/>
                            {/* { fazenda && fazenda.gastos && fazenda.gastos.map(gasto =>(
                                <Typography>
                                    {gasto.nome}
                                </Typography>
                            ))} */}
                            
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            }

        </div>
    );
}