import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

export default function EscolhaProducaoPanel(props) {
  const classes = useStyles();
  const { listaProducao, setDisable, producao, setProducao, fazenda, arrFarm } = props;

  const handleChange = (event) => {
    console.log('>>>>>>>>>>>>>>>>>>>>handleChange<<<<<<<<<<<<<<<<<<<<<<,')
    setProducao(event.target.value);
    setDisable(false);
  };

  return (
    <Paper className={classes.root}>
      <CardHeader
        title="Passos minimos para iniciar um sistema produtivo"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Colocar aqui informações que dê indicação do que será feito e instruções básicas para iniciar um controle de produção assistido.
          </Typography>
      </CardContent>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {
            arrFarm && arrFarm.length > 1 &&
            <FormControl>
              <InputLabel id="idarrfar">Fazenda</InputLabel>
              <Select
                labelId="idarrfar"
                id="demo-simple-select"
                value={producao}
                onChange={handleChange}
              >{arrFarm.map(f => (
                <MenuItem key={f.id} value={f}>{f.nome}</MenuItem>
              ))
                }
              </Select>
              <FormHelperText id="my-helper-text">Escolha a fazenda que ficará a produção</FormHelperText>
            </FormControl>
          }
          {
            arrFarm && arrFarm.length === 1 &&
            <Typography gutterBottom variant="h5" component="h2">
              Fazenda {fazenda.nome}
            </Typography>
          }
        </Grid>
        <Grid item xs={6}>
          { producao && listaProducao && listaProducao.length > 0 &&
          <FormControl>
            <InputLabel id="demo-simple-select-label">Produção</InputLabel>
            <Select

              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={producao}
              onChange={handleChange}
            >{listaProducao && listaProducao.map(p => (
              <MenuItem key={p.id} value={p}>{p.nome}</MenuItem>
            ))
              }
            </Select>
            <FormHelperText id="my-helper-text">Escolha o sistema de produção que será assistido</FormHelperText>

          </FormControl>
          }
        </Grid>

      </Grid>
    </Paper>
  );
}
