import React, {useState, useEffect} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {TextField} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    underline: {
        "&&&:before": {
          borderBottom: "none"
        },
        "&&:after": {
          borderBottom: "none"
        }
      }
  }),
);

export default function SearchField(props) {
  const classes = useStyles();
  const {name, placeholder, onChange, value, listaDados} = props;
  const [text, setText] = useState(value);

  useEffect(()=>{
    console.log('>>>SearchField<<<', value, text);

  });

  const handleChange = (e, newValue)=>{
      console.log(name+": "+newValue );
      setText(newValue);
      onChange(newValue);
  }

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Autocomplete
            freeSolo
            className={classes.input}
            disableClearable
            options={listaDados.map(option => option)}
            onChange={handleChange}
            name={name} 
            id={name}
            value={value}
            renderInput={params => (
            <TextField
                {...params}
                placeholder={placeholder}
                className={classes.underline}
                value={value}
                InputProps={{ ...params.InputProps, 
                    type: 'search', 
                    'aria-label': placeholder, 
                    className: classes.underline }}
            />
            )}
        />
        
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
