import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Container, Backdrop, CircularProgress} from '@material-ui/core';
import { useCurrentUser } from "../server/UseCurrentUser";
import FazendeiroPanel from "./user/home/FazendeiroPanel";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "margin-top": "15px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function Home() {
    let [user, loading] = useCurrentUser();
    const classes = useStyles();
    const [wait, setWait] = useState(false);

    

    function isPerfilFazendeiro(){
        return user && user.perfis && user.perfis.find(item => item === 'fazenda');
    }

    return (
    <Container maxWidth='xl' className={classes.root}>
        {
            console.log(user)
        }
  
        { !loading &&
            isPerfilFazendeiro()?<FazendeiroPanel user={user} setWait={setWait}/>:<div>Perfil sem tela home</div>
        }

      <Backdrop className={classes.backdrop} open={loading || wait}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </Container>
    )
  }

export default Home;
