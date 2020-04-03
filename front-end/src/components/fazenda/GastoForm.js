
import React from 'react';
import { Container, IconButton, Grid, TextField, InputAdornment, InputLabel, Input, FormControl,
    MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function GastoForm(props) {
    const {addGasto} = props;
    const classes = useStyles();
    const [gasto, setGasto] = React.useState({
        nome: '',
        tipo: 'Mensal',
        valor: 0,
        descricao: ''
    });
    
    const handleChange = (event) => {
        let valor = event.target.value;
        let nome = event.target.name;
        if( nome === 'valor') valor = parseFloat(valor);
        setGasto({ ...gasto, [nome]: valor });
    };

    const handleIncluir=(e)=>{
        addGasto(gasto);
        setGasto({
            nome: '',
            tipo: 'Mensal',
            valor: 0,
            descricao: ''
        });
    }
    return (
        <Container component="main" maxWidth="xl">
            <form noValidate >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField name="nome" label="Gasto" fullWidth 
                        onChange={handleChange} value={gasto.nome}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name="tipo"
                            select
                            label="Periodicidade"
                            value={gasto.tipo}
                            onChange={handleChange}
                            fullWidth >
                            {["Mensal", "Bimestral", "Semestral", "Anual"].map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={2} >
                    <FormControl fullWidth >
                        <InputLabel htmlFor="standard-adornment-amount">Valor</InputLabel>
                        <Input
                            name="valor"
                            label="Valor"
                            type="number"
                            onChange={handleChange}
                            value={gasto.valor}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <Grid container alignItems="flex-start" justify="flex-end">
                            <IconButton color="primary" aria-label="info" onClick={handleIncluir}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="descricao"
                            label="Descrição do gasto"
                            multiline
                            rows="4"
                            onChange={handleChange}
                            value={gasto.descricao}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default GastoForm;