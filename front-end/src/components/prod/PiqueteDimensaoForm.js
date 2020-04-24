import React, { useState, useEffect } from 'react';
import {
    Button, TextField, Typography, Grid
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function PiqueteDimensaoForm(props) {
    const { piquete, setPiquete, dividirVertical, dividirHorizontal, dimensalBase, producao } = props;
    
    const [capacidade, setCapacidade] = useState(0);
    const [base, setBase] = useState(0);
    const [altura, setAltura]= useState(0);
    useEffect(() => {
        console.log('>>>PiqueteDimensaoForm<<<', piquete);
        if( piquete && producao ){
            const bs = dimensalBase.baseMetro(piquete.w);
            const al = dimensalBase.alturaMetro(piquete.h);
            setBase(bs);

            setAltura( al );

            const animais = producao.dados.producao.qtdAdulto;
            const peso = (producao.dados.matriz.peso[0]+producao.dados.matriz.peso[1])/2;

            let ms = (producao.dados.pasto.producaoMS[0] + producao.dados.pasto.producaoMS[1])/2;
            ms = ms*1000/365;//em kg por dia
            let cp = (animais * peso * 0.03); //3% do peso vivo em to

            let prod = ((bs*al/10000)*ms); //conversaõ para hectare
            setCapacidade( Math.round(prod/cp));

        }
    }
    )
    const handleClick = () => {
        dividirVertical();
    }
    const handleClickH = () => {
        dividirHorizontal();
    }
    return (
        <Grid container spacing={3} >
            <Grid item xs={12}>
            <TextField
                id="base"
                label="Number"
                type="number"
                value={base}
                InputProps={{
                    endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="altura"
                label="Altura"
                type="number"
                value={altura}
                InputProps={{
                    endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
                Capaz de sustentar {producao.dados.producao.qtdAdulto} matrizes em {capacidade} dias
            </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" onClick={handleClickH}>Dividir piquete na horizontal</Button>
                <Button color="primary" onClick={handleClick}>Dividir piquete na vertical</Button>
            </Grid>

        </Grid>
    )
}