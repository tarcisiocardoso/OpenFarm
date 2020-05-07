import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table, Container, Grid, Typography, Button, InputLabel, Input, FormHelperText,
    FormControl, ButtonGroup
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import ShowRegrasModal from './ShowRegrasModal';
import RegraFormPanel from './RegraFormPanel';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    paper: {
        // padding: theme.spacing(1)
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
}));

export default function CadastroProducao(props) {
    const classes = useStyles();

    const [producao, setProducao] = useState({
        nome: '',
        descricao: '',
        regras: []
    });
    const [isEdit, setIsEdit] = useState(false);
    const [editRegra, setEditRegra] = useState({index:-1, nome:'', regra:''});
    const [expanded, setExpanded] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [regra, setRegra] = useState(false);

    const [modalTitle, setModalTitle] = useState();

    // const [listaRegras, setListaRegra] = useState([]);

    
    const [error, setError] = useState({
        nome: { erro: false, msg: '' },
        descricao: { erro: false, msg: '' },
    })

    const [erroRegra, setErroRegra] = useState({
        nome: { erro: false, msg: '' },
        regra: { erro: false, msg: '' },
    })

    useEffect(() => {
        console.log('>>>userEffect producao<<<' );
        if( !producao.id ){
            if( props && props.match && Object.entries( props.match.params).length > 0){
                fetch('/api/producao/'+props.match.params.id)
                .then(response => response.json())
                .then(data => setProducao(data))
                .catch(error => setError(error));
            }
        }
      });
    const handleShow =(e) => {
        console.log('>>>handleShow<<<');
        setModalTitle( editRegra.nome );
        // const js = JSON.parse( editRegra.regra);
        // console.log( js );

        // let format = JSON.stringify(json, null, "\t");
                // format = JSON.stringify(format, null, 4);
                // console.log(format);

        setRegra( editRegra.regra );
        setShowModal(true);
    }
    const handleAdd = (e) => {
        e.preventDefault();
        const index = editRegra.index;
        const nome = editRegra.nome;//document.getElementsByName("nomeRegra")[0].value;
        const regra = editRegra.regra; //document.getElementsByName("regra")[0].value;
        let r = {
            nome: { erro: false, msg: "" },
            regra: { erro: false, msg: "" }
        }

        if (!nome || nome.length === 0) {
            r.nome.erro = true;
            r.nome.msg = 'Obrigatorio';
            setErroRegra(r);
        }
        if (!regra || regra.length === 0) {
            r.regra.erro = true;
            r.regra.msg = "Obrigatorio";
            setErroRegra(r);
        } else {
            console.log(">>add<<", nome, regra);
            try {
                const json = JSON.parse(regra);
                if(Object.entries(json).length === 0 ){
                    r.regra.erro = true;
                    r.regra.msg = "Regra não pode ser vazia";
                    setErroRegra(r);
                    return;
                }
                // let format = JSON.stringify(json, null, "\t");
                // format = JSON.stringify(format, null, 4);
                // console.log(format);

                // setListaRegra([...listaRegras, {
                //     nome:nome, regra:format
                // }]);
                let rs = [...producao.regras];
                if( index < 0 ){
                    rs.push({ nome:nome, regra:regra});
                }else{
                    rs[index] = { nome:nome, regra:regra};
                }
                setProducao( {...producao, regras:rs } );
                setEditRegra({index:-1, nome:'', regra:''});

                setIsEdit(true);
                setErroRegra(r);
                setExpanded(false);
            } catch (error) {
                console.log(error);
                r.regra.erro = true;
                r.regra.msg = error.message;
                setErroRegra(r);
            }
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEdit(false);

        let r = {
            nome: { erro: false, msg: "" },
            descricao: { erro: false, msg: "" }
        }

        if (producao.nome.length === 0) {
            r.nome.erro = true;
            r.nome.msg = 'Obrigatorio';
        }
        if (producao.descricao.length === 0) {
            r.descricao.erro = true;
            r.descricao.msg = 'Obrigatorio';
        }
        setError(r);

        if( !r.nome.erro && !r.descricao.erro){
            let pro = {...producao} ;
            fetch('/api/producao', {
                method: (pro.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pro),
                credentials: 'include'
            }).then( response => response.json())
            .then(data => setProducao ( data ) )
            .catch( error => {
                console.log(">>ERRO<<", error );
            });
        }
    }
    const editarRegra = (regra, index)=> {
        setEditRegra({...regra, index:index} );
        setExpanded(true);
    }
    const removerRegra = (index) =>{
        let rs = [...producao.regras];
        rs.splice(index,1);
        setProducao( {...producao, regras:rs } );
        setIsEdit(true);
    }

    return (
        <Container maxWidth="xl">
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={9}>
                    <Typography component="h1" variant="h5">
                        Cadastro de produção
            </Typography>
                </Grid>
                <Grid item xs={3} align="left">
                    {isEdit &&
                        <Button color="primary" onClick={handleSubmit}>Salvar</Button>
                    }
                </Grid>
            </Grid>
            <Grid item xw={12}>
                <Cadastro producao={producao} setProducao={setProducao} error={error} setIsEdit={setIsEdit} />
            </Grid>
            <Grid item xw={12}>
                <Paper className={classes.paper} elevation={3} >
                    <RegraFormPanel erroRegra={erroRegra} handleAdd={handleAdd} regra={editRegra} setRegra={setEditRegra} handleShow={handleShow} expanded={expanded} setExpanded={setExpanded}/>
                </Paper> 
                {/* <Paper className={classes.paper} elevation={3} >
                    <Regras erroRegra={erroRegra} handleAdd={handleAdd} regra={editRegra} setRegra={setEditRegra} handleShow={handleShow}/>
                </Paper> */}
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell size='medium'>Regra</StyledTableCell>
                            <StyledTableCell align="center" size='small'>Ação</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {producao.regras.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{row.nome}</StyledTableCell>
                                <StyledTableCell>
                                     {row.regra}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button onClick={e => editarRegra(row, index) }><Icon color="primary">edit</Icon></Button>
                                    <Button onClick={e => removerRegra(index) }><Icon color="primary">remove</Icon></Button>
                                </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ShowRegrasModal open={showModal} setOpen={setShowModal} title={modalTitle} regra={regra}/>
        </Container>
    );
}

function Cadastro(props) {

    const classes = useStyles();
    const { producao, setProducao, error, setIsEdit } = props;

    const handleChange = e => {
        console.log('>>>>', producao);
        // setName(event.target.value);
        setIsEdit(true);
        setProducao({ ...producao, [e.target.name]: e.target.value });
    };
    
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={3}>
                    <FormControl error={error.nome.erro} fullWidth required>
                        <InputLabel htmlFor="nome">Nome</InputLabel>
                        <Input
                            name="nome"
                            value={producao.nome}
                            onChange={handleChange}
                            aria-describedby="nome-erro"
                        />
                        <FormHelperText id="nome-erro">{error.nome.msg}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={9}>
                    <FormControl error={false} fullWidth required>
                        <InputLabel htmlFor="descricao">Descricao</InputLabel>
                        <Input
                            name="descricao"
                            value={producao.descricao}
                            onChange={handleChange}
                            aria-describedby="descricao-erro"
                        />
                        <FormHelperText id="descricao-erro"></FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}
