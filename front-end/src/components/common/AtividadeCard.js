import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { grey, blue } from '@material-ui/core/colors';

import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AtividadeModal from '../fazenda/AtividadeModal';
import VerAtividadesModal from './VerAtividadesModal';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 300,
        // width: "100%"
        // width:'100%',   
        // height:'100%'
        // display: 'block',
        // width: '30vw',
        // transitionDuration: '0.3s',
        height: '150px'
    },
    removeBottomPadding: {
        paddingBottom: "0px",
        paddingTop: "0px"
    },
    hoje: {
        maxWidth: 300,
        height: '150px',
        border: 1, borderColor: 'blue', borderStyle: 'solid',
        background: "#D3D3D3",
    },
    mesNaoCorrete: {
        backgroundColor: grey[500],
    },
    mesCorrete: {
        backgroundColor: blue[500],
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    }
}));
export default function AtividadeCard(props) {
    const { dia, mes, producao, today, month, ultimoDia } = props;
    const classes = useStyles();
    const [descricao, setDescricao] = useState('');
    const [qtdAtividade, setQtdAtividade] = useState(0);
    const [arrAtividade, setArrAtividade]= useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openVerAtividadeModal, setOpenVerAtividadeModal] = React.useState(false);
    
    const [menu, setMenu] = useState([
        [1, 'Criar Atividade']
    ]);

    const [anchorEl, setAnchorEl] = useState();

    useEffect(() => {
        let txt = '';
        let qtd = 0;
        for (let item in producao) {
            let atividades = producao[item].dados.atividades;
            for (let a in atividades) {
                let at = atividades[a];
                if( typeof at.tempo !== 'object'){
                    if (at.tempo >= 30) {
                        if (at.tipo === 'D') {
                            if ((dia === 1 || dia === ultimoDia) && mes % (at.tempo / 30) === 0) {
                                txt += txt.length > 0 ? ", " + at.nome : at.nome;
                                qtd++;
                            }
                        }
                    }
                }else{
                    let menosDia = at.tempo.inicio;
                    if( (dia-menosDia) % at.tempo.aCadaDia === 0 ){
                        txt += txt.length > 0 ? ", " + at.nome : at.nome;
                        qtd++;
                    }
                }
            }
        }
        let arrMenu=[];
        arrMenu.push(['criarAtiv', 'Criar Atividade']);

        txt = txt.length > 100 ? txt.substr(0, 100) + "..." : txt;
        setDescricao(txt);
        setQtdAtividade(qtd);
        if( qtd > 0){
            arrMenu.push(['verAtiv', 'Ver Atividade'] );
        }
        setMenu(arrMenu);
    }, [producao, dia, mes, ultimoDia])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAction = (e, acao) => {
        setAnchorEl(null);
        console.log(acao);
        if( acao[0] === 'criarAtiv' ){
            setOpenModal(true);
        }else if( acao[0] === 'verAtiv'){
            setOpenVerAtividadeModal(true);
            let arr = [];
            for (let item in producao) {
                let atividades = producao[item].dados.atividades;
                for (let a in atividades) {
                    let at = atividades[a];
                    if( typeof at.tempo !== 'object'){
                        if (at.tempo >= 30) {
                            if (at.tipo === 'D') {
                                if ((dia === 1 || dia === ultimoDia) && mes % (at.tempo / 30) === 0) {
                                    arr.push(at);
                                }
                            }
                        } else {
    
                        }
                    }else{
                        if( at.tempo.aCadaDia < 30){
                            let menosDia = at.tempo.inicio;
                            if( (dia-menosDia) % at.tempo.aCadaDia === 0 ){
                                arr.push(at);
                            }
                        }
                    }
                }
            }
            console.log( arr );
            setArrAtividade(arr);            
        }
    };

    return (
        <Card 
            className={dia === today && mes === month ? classes.hoje : classes.root}
            variant="outlined" >
            <CardHeader 
                avatar={
                    <Avatar aria-label="recipe" className={mes === month ? classes.mesCorrete : classes.mesNaoCorrete}>
                        {dia}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                // title='Sem atividade'
                subheader={qtdAtividade > 0 ? qtdAtividade + " atividades" : ""}
            />
            <CardContent className={classes.removeBottomPadding}>
                <Typography variant="caption" display="block" gutterBottom>
                    {descricao}
                </Typography>
            </CardContent>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAction}
            >
                {
                    menu.map((m, index) =>(
                        <MenuItem onClick={(e)=>handleAction(e, m)} key={ index }>{m[1]}</MenuItem>
                    ))
                }
            </Menu>
            <AtividadeModal 
                open={openModal} 
                setOpen={setOpenModal} 
                producao={producao}
                dia={dia}
            />
            <VerAtividadesModal
                open={openVerAtividadeModal} 
                setOpen={setOpenVerAtividadeModal} 
                producao={producao}
                dia={dia}
                mes={mes}
                atividades={arrAtividade}
            />
            
        </Card>
    );
}
