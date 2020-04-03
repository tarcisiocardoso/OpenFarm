import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import {Button, Grid, FormControl, Input, InputLabel, FormHelperText, Icon} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function RegraFormPanel(props) {
  const classes = useStyles();
  const { regra, setRegra, erroRegra, handleAdd, handleShow, expanded, setExpanded } = props;
  const inputRef = useRef(null);
  useEffect(() => {
    console.log('>>>userEffect RegraFormPanel<<<' );

    if( expanded){
        console.log('....inputRef.current.focus();....');
        inputRef.current.focus();
    }
  },[expanded]);
    const handleChange = e => {
        setRegra({...regra, [e.target.name]: e.target.value} );
    };
    const handleCancel = e => {
        setRegra({index:-1, nome:'', regra:''});
        setExpanded(false);
    };
    
    const handleExpand = e => {
        setExpanded(!expanded);
        console.log( inputRef.current );
    };
    const handleSaveClick = e => {
        handleAdd(e);
        
    }
  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded} onChange={handleExpand}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Regra</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Cadastro e edição de regras</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Regra
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControl error={erroRegra.nome.erro} fullWidth required>
                        <InputLabel htmlFor="nome">Nome</InputLabel>
                        <Input
                            name="nome"
                            inputRef={inputRef} 
                            aria-describedby="nome-erro"
                            value={regra.nome}
                            autoFocus={true}
                            onChange={handleChange}
                        />
                        <FormHelperText id="nome-erro">{erroRegra.nome.msg}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={9}>
                    <FormControl error={erroRegra.regra.erro} fullWidth required>
                        <InputLabel htmlFor="regra">Regra</InputLabel>
                        <Input
                            name="regra"
                            aria-describedby="regra-erro"
                            multiline
                            rows="10"
                            value={regra.regra}
                            onChange={handleChange}
                        />
                        <FormHelperText id="regra-erro">{erroRegra.regra.msg}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={1} align="left">
                    {/* <Button color="primary" onClick={handleAdd}>
                        <Icon color="primary">add_circle</Icon>
                    </Button> */}
                    {
                        regra.regra && regra.regra.length > 0 &&
                        <Button color="primary" onClick={handleShow}>
                            <Icon color="primary">pageview</Icon>
                        </Button>
                    }
                    
                </Grid>
            </Grid>
        </form>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={handleCancel}>Cancel</Button>
          <Button size="small" color="primary" onClick={handleSaveClick}>
            Salvar
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
