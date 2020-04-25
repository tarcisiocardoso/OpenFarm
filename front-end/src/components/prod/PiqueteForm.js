import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
    Box, Button,
    TextField, Select, InputLabel
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TwoFields from '../../util/TwoFields';

export default function PiqueteForm(props) {
    const { piquete, dividirVertical, dividirHorizontal } = props;

    useEffect(() => {
        console.log('>>>PiqueteForm<<<', piquete);
    }
    )
    const handleClick = () => {
        dividirVertical();
    }
    const handleClickH = () => {
        dividirHorizontal();
    }
    const handlePrecipitacao = (e) => {
        console.log(e);
    }
    return (
        <div >
            <TextField
                name="materiaSeca"
                helperText="Produção de volumoso em tonelada/hectare/ano"
                label="Capacidade"
                fullWidth
                // value={matriz.peso[0]}
                // onChange={handleChange}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="end">To</InputAdornment>,
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            /><br /><br />
            <TwoFields
                setValor={handlePrecipitacao}
                label='Exigencia pluviometrica'
                helper='Teor proteico da planta'
                adornment='mm'
            />
            <TwoFields
                setValor={handlePrecipitacao}
                label='Indice proteico'
                helper='Teor proteico da planta'
                adornment='%'
            />
            <Box>
                {/* <FormControl className={classes.formControl}> */}
                <InputLabel htmlFor="age-native-simple">Tolerancia Frio/Seca</InputLabel>
                {/* <Select
                    fullWidth
                    // value={state.age}
                    // onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Boa</option>
                    <option value={20}>Média</option>
                    <option value={30}>Baixa</option>
                </Select> */}
                {/* </FormControl> */}
            </Box>
        </div>
    )
}