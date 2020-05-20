import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Paper, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        painel: {

            display: 'flex',
            '& > *': {
                margin: theme.spacing(0),
                width: '100%',
                //height: theme.spacing(16),
            },
        },

    }),
);

export default function ListaProducoes(props) {
    const classes = useStyles();
    const { fazenda, setError } = props;
    const [listaProducao, setListaProducao] = useState();
    const history = useHistory();

    useEffect(() => {
        fetch('/api/userProduction/farmId/' + fazenda.id)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                    setError(response.statusText);
                    return '';
                }
            })
            .then(data => {
                setListaProducao(data)
            })
            .catch(error => setError(error));

    }, [fazenda]);

    function formataData(dt){
        const data = new Date(dt)
        console.log( dt, data, typeof data );

        let dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    const handleListItemClick = (event,producao) => {
        console.log( producao );

        history.push("/dashboard/"+producao.id);

    };

    return (
        <div className={classes.painel}>
            <Paper>
                <Typography variant="h6" gutterBottom align='center'>
                    Lista de Produções
            </Typography>
                <List className={classes.root}>
                    {listaProducao && listaProducao.map((producao, index) =>(
                        <ListItem key={index}
                            button
                            onClick={(event) => handleListItemClick(event, producao)}
                        >
                            <ListItemAvatar>
                                { producao.nomeProducao === 'Ovino'? 
                                    <Avatar alt="Remy Sharp" src="/images/ovino.jpg" />:
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={producao.nomeProducao} secondary={formataData(producao.dtCriacao)} />
                        </ListItem>
                    ))}
                    
                </List>
            </Paper>
        </div>
    );
}
