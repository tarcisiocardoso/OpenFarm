import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  btn: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

}));

export default function AtividadeModal(props) {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { open, setOpen, producao, dia } = props;
  const [tipo, setTipo] = React.useState('');
  const [prod, setProd] = React.useState();
  const [error, setError] = React.useState(false);
  const [diaInicio, setDiaInicio] = React.useState('');
  const [dias, setDias] = React.useState('');

  useEffect(() => {
    if (producao) setProd(producao[0]);

    setDiaInicio(dia);
  }, [producao, dia]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    console.log('lalalal', event.target.value);
    setTipo(event.target.value);
  };

  const handleSalve = (e) => {

    let dias = parseInt(document.getElementById("dias").value);
    let inicio = parseInt(document.getElementById('diaInicio').value);
    let tp = tipo === 1 ? 'D' : 'C';

    const atividade = {
      nome: document.getElementById("nome").value,
      tipo: tp,
      tempo: {
        aCadaDia: dias,
        inicio: inicio
      },
      descricao: document.getElementById('descricao').value
    }

    let pro = {...prod} ;
    pro.dados.atividades.push( atividade );

    console.log('lalalal', pro);

    fetch('/api/userProduction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pro),
      credentials: 'include'
    }).then(response => response.json())
      .then(data => atualizaProducao(data))
      .catch(error => setError(error));

  }
  function atualizaProducao(dado){
    console.log('>>>nao implmentenaod<<<');
    setOpen(false);
  }
  const handleCancelar = (e) => {
    console.log('lalalal', e.target.value);
    setOpen(false);
  }

  const DataFixaPanel = () => {
    return (
      <div>
        <TextField type="number" id="dias" label="Dias:" variant="outlined" 
          value={dias}
          onChange={e => setDias(e.target.value)}
        />
        <TextField type="number" id="diaInicio" label="Inicio:" variant="outlined"
          value={diaInicio}
          onChange={(e) => setDiaInicio( e.target.value )}
        />
      </div>
    )
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Cadastro de atividade</h2>
          <form className={classes.form} noValidate autoComplete="off">
            {prod &&
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="prod-label"
                  id="prod"
                  value={prod.id}
                  onChange={handleChange}
                  label="Producao"
                >
                  {producao.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.nomeProducao}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            }
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Periodicidade</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={tipo}
                onChange={handleChange}
                label="Periodicidade"
              >
                <MenuItem value={1}>A cada</MenuItem>
                <MenuItem value={2}>Diareamente</MenuItem>
              </Select>
            </FormControl>
            {
              tipo === 1 && <DataFixaPanel />
            }

            <TextField id="nome" label="Nome:" variant="outlined" />
            <TextField
              id="descricao"
              label="Descrição da atividade"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />

            <div className={classes.btn} align="center">
              <Button variant="outlined" color="primary" onClick={handleSalve}>
                Salvar
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancelar}>
                Cancelar
              </Button>
            </div>

          </form>
        </div>
        
      </Modal>
      { error && 
          <Alert severity="error">{error}</Alert>
      }
    </div>
  );
}
