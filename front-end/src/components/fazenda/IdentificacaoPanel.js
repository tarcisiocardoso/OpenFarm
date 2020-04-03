import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Grid, FormControl, Input, InputLabel, FormHelperText,
    Button, Icon, Select, MenuItem, Card, CardContent, Typography, CardHeader,
    InputAdornment
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },


    rootCard: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function IdentificacaoPanel(props) {
    const classes = useStyles();
    const [error, setError] = useState({
        nome: { erro: false, msg: '' },
        descricao: { erro: false, msg: '' },
    })
    const { fazenda, setFazenda, commit, isEdit, setEdit } = props;

    // const [isEdit, setEdit] = useState(false);

    const handleChange = (e) => {
        console.log('>>>handleChange<<<');

        let identificacao = {...fazenda.identificacao};

        identificacao[e.target.name]= e.target.value;

        setFazenda({...fazenda, identificacao:identificacao});

        setEdit(true);
    }

    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="on">
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <FormControl error={error.nome.erro} fullWidth required>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <Input
                                name="nome"
                                aria-describedby="nome-erro"
                                value={fazenda.identificacao.nome}
                                onChange={handleChange}
                            />
                            <FormHelperText id="nome-erro">{error.nome.msg}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl error={error.nome.erro} fullWidth required>
                            <InputLabel htmlFor="nome">Tamanho em hectare</InputLabel>
                            <Input
                                name="tamanho"
                                aria-describedby="nome-erro"
                                value={fazenda.identificacao.tamanho}
                                onChange={handleChange}
                            />
                            <FormHelperText id="nome-erro">{error.nome.msg}</FormHelperText>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="nome">CEP</InputLabel>
                            <Input
                                name="cep"
                                aria-describedby="cep-erro"
                                value={fazenda.identificacao.cep}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="nome">Endereço</InputLabel>
                            <Input
                                name="endereco"
                                value={fazenda.identificacao.endereco}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="nome">Cidade</InputLabel>
                            <Input
                                name="cidade"
                                value={fazenda.identificacao.cidade}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="nome">Estado</InputLabel>
                            <Input
                                name="estado"
                                value={fazenda.identificacao.estado}
                            onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl error={error.nome.erro} fullWidth required>
                            <InputLabel htmlFor="nome">UF</InputLabel>
                            <Select
                                name="uf"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                            >
                                <MenuItem >
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="GO">Goias</MenuItem>
                                <MenuItem value="DF">Brasilia</MenuItem>
                            </Select>

                            <FormHelperText id="nome-erro">{error.nome.msg}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="telefone">Telefone</InputLabel>
                            <Input
                                name="telefone"
                                value={fazenda.identificacao.telefone}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                name="email"
                                value={fazenda.identificacao.email}
                            // value={regra.nome}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="nome">Responsável</InputLabel>
                            <Input
                                name="responsavel"
                                value={fazenda.identificacao.responsavel}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.rootCard} variant="outlined">
                            <CardHeader
                                title="Clima da região"
                                subheader="Temperatura e indice pluviometrico anual"
                            />
                            <CardContent>
                                <Grid container className={classes.root} spacing={8}>
                                    <Grid item >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Precipitação média anual
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            <FormControl>
                                                <Input
                                                    name="chuva"
                                                    endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                                                    aria-describedby="mediaChuvaAnual-help"
                                                    value={fazenda.identificacao.chuva}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                    }}
                                                />
                                                <FormHelperText id="mediaChuvaAnual-help">milimitro por hectare</FormHelperText>
                                            </FormControl>
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Temperatura média anual
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            <FormControl>
                                                <Input
                                                    name="temperatura"
                                                    endAdornment={<InputAdornment position="end">&#8451;</InputAdornment>}
                                                    value={fazenda.identificacao.temperatura}
                                                    onChange={handleChange}
                                                    aria-describedby="mediaChuvaAnual-help"
                                                    
                                                />
                                                <FormHelperText id="mediaChuvaAnual-help">temperatura média anual</FormHelperText>
                                            </FormControl>
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Periodo de estiagem
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                                <Input name="estiagemInicio"
                                                value={fazenda.identificacao.estiagemInicio}
                                                onChange={handleChange}
                                                /> até 
                                                <Input name="estiagemFim" 
                                                value={fazenda.identificacao.estiagemFim}
                                                onChange={handleChange}
                                                />
                                                <FormHelperText id="mediaChuvaAnual-help">Meriodo de estiagem</FormHelperText>
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
