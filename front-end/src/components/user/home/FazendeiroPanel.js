import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../../../server/UseFetch';
import Calendario from '../../common/calendario/Calendario';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function FazendeiroPanel(props) {
  const {user, setWait} = props;

  const classes = useStyles();

  const [producao, producaoLoading] = useFetch("/api/userProduction/userId/"+user.id);

  return (
    <div className={classes.root}>
      { !producaoLoading && 
        <Calendario producao={producao} setWait={setWait} />
      }
      {/* <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <Calendario/>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Expansion Panel 2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  );
}
