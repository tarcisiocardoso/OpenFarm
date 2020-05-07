import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import PainelControleProducaoPanel from './PainelControleProducaoPanel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";

export default function MainProducao(props) {
    const { producao, fazenda, updateProducao, setShowConfirm, showSave } = props;

    const [dashboardNome, setDashBoardNome] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory();

    useEffect(() => {
        console.log('>>>MAINPRODUCAO<<<', fazenda);
        if (fazenda) setDashBoardNome(fazenda.identificacao.nome + " - " + producao.nomeProducao + " - " + producao.dados.producao.qtdAdulto + " matrizes");
    }, [fazenda, producao]);


    const handleClick = (event) => {
        console.log('>>>handlClici<<<', event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log('>>>handleClose<<<')
        setAnchorEl(null);
    };
    const handleReprodutorForm = () => {
        handleClose();
        history.push("/dashboard/" + producao.id + "/reprodutor");
    }
    const handleMatrizForm = () => {
        handleClose();
        history.push("/dashboard/" + producao.id + "/matriz");
    }
    const handlePiquete =() => {
        handleClose();
        history.push("/prod/ovido/piquete?id=" + producao.id );
    }

    const handleSalva = (e) => {
        console.log(producao);
        setShowConfirm(true);
    }
    function update(prod) {
        setDashBoardNome(fazenda.identificacao.nome + " - " + prod.nomeProducao + " - " + prod.dados.producao.qtdAdulto + " matrizes");
        updateProducao(prod)
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={10}>
                {dashboardNome &&
                    <Typography variant="h6" align='center'>{dashboardNome}</Typography>
                }
            </Grid>
            <Grid item xs={2} align='right'>
                {showSave &&
                    <Button variant="outlined" color="primary" onClick={handleSalva}>
                        Salvar
                        </Button>
                }
                <IconButton color="primary"
                    aria-label="Mais atividade"
                    aria-controls="action-menu"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleReprodutorForm}>Reprodutor</MenuItem>
                    <MenuItem onClick={handleMatrizForm}>Matriz</MenuItem>
                    <MenuItem onClick={handlePiquete}>Pasto</MenuItem>
                    <MenuItem onClick={handleClose}>Sal</MenuItem>
                    <MenuItem onClick={handleClose}>Fornecimento de volumoso</MenuItem>
                </Menu>
            </Grid>
            <Grid item xs={12}>
                <PainelControleProducaoPanel fazenda={fazenda} producao={producao} update={update} />
            </Grid>
        </Grid>
    )
}