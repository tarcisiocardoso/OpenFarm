import React, { useState } from 'react';
import {
    Typography, Grid,
    TextField
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        help: {
            marginTop: '-50px'
        }
    }),
);

export default function TwoFields(props) {
    const classes = useStyles();

    const { setValor, label, helper, adornment } = props;

    const [val, setVal] = useState({
        min: '',
        max: ''
    });

    const handleChange = (e) => {
        let v = { ...val };
        v[e.target.name] = e.target.value;
        setVal(v);
        setValor(v);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField
                    name="min"
                    // helperText="De"
                    label={label}
                    fullWidth
                    value={val.min}
                    onChange={handleChange}
                    type="number"
                    InputProps={{
                    endAdornment: <InputAdornment position="end"> {adornment} </InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br /><br />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name="max"
                    // helperText="Quantidade de chuva em mm/hectare/ano"
                    label="Até"
                    value={val.max}
                    onChange={handleChange}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} >
                <Typography className={classes.help} variant="caption" display="block" gutterBottom>
                    {helper}
                </Typography>
            </Grid>
        </Grid>
    )
}