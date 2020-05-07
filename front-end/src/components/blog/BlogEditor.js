
import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory} from "react-router-dom";
import { Container, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useFetch} from '../../server/UseFetch';
import { useCurrentUser } from "../../server/UseCurrentUser";

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
      },
  }));

function BlogEditor () {
    const classes = useStyles();
    const [blog, setBlog] = React.useState({});
    const [assunto, setAssunto] = React.useState('');
    const [cat, setCat] = React.useState('');
    let [profile] = useCurrentUser();    
    const [descInfo, setDescInfo] = React.useState('');
    const [descCat, setDescCat] = React.useState('');
    const history = useHistory();
    

    const [blogCategori, loading] = useFetch("/api/post/category");
    const [blogSubCategori, setBlogCategori] = React.useState();

    const handleInputInfo = event => {
        blog['assunto'] = event.target.value;
        setAssunto(event.target.value);
        setBlog(blog);
        setDescInfo();
        setDescCat();
        setDescInfo();

        var ret = blogCategori.find(f => f.id === blog['assunto']);
        console.log( ret );
        if( ret ){
            setDescInfo( ret.dc);
            setBlogCategori(ret.categoria);
        }
        // blogCategori.forEach( b => {
        //     console.log( b );
        // });
    }
    const handleInputCat = event => {
        blog['categoria'] = event.target.value;
        setCat(event.target.value);
        setBlog(blog);

        var ret = blogSubCategori.find(f => f.id === blog['categoria']);
        console.log( ret );
        if( ret ){
            setDescCat( ret.dc);
        }
    }
    const handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        if( name ){
            blog[name]=value;
        }
        setBlog(blog);
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log( blog );
        blog['criador'] = profile.id;// login ou id ????

        fetch('/api/post' + ((blog.id) ? '/' + blog.id.toString() : ''), {
            method: (blog.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog),
            credentials: 'include'
          }).then( response =>{
            console.log( response );
            history.push('/home');
          }).catch( error => {
            console.log(">>ERRO<<", error );
          });
    }
    
        return (
            <Container component="main" maxWidth="lg">
                <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <center><h2>Local para gerar cognição na plataforma. TODO: colocar explicação da funcionalidade</h2></center>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="blog">Informação</InputLabel>
                            <Select
                            labelId="blog"
                            id="assunto"
                            onChange={handleInputInfo}
                            value={assunto}
                            >
                                { loading? ("carregando..."): (
                                    blogCategori.map( (b, index) => (
                                        <MenuItem value={b.id} key={index} >{b.tl}</MenuItem>
                                    )))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="cat">Categoria</InputLabel>
                            <Select
                            labelId="cat"
                            id="assunto"
                            onChange={handleInputCat}
                            value={cat}
                            >

                                { !blogSubCategori? ("carregando..."): (
                                    blogSubCategori.map( (b, index) => (
                                        <MenuItem value={b.id} key={index} >{b.tl}</MenuItem>
                                    )))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="titulo"
                        label="titulo"
                        name="Titulo"
                        autoComplete="titulo"
                        autoFocus onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                blog.conteudo = data;
                                setBlog(blog);
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <center>
                            {
                                !descInfo ? (""): (
                                    <p>{ descInfo }</p>
                                )
                            }
                            {
                                !descCat ? (""): (
                                    <p>{ descCat }</p>
                                )
                            }
                        </center>
                    </Grid>
                    <Grid item xs={6}>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Incluir
                        </Button>
                    </Grid>
                    <Grid item xs={6}>                        
                        <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                            cancelar
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Container>
        );
    
}

export default BlogEditor;