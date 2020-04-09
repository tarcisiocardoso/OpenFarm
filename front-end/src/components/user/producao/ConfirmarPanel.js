import React from 'react';
import { Container, Paper} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
  
export default function ConfirmarPanel(props) {
    const {dado, producao} = props;

    function montaSuplemento(){
        let ret = "";
        let has = false;
        if( dado.suplemento.feno){
            ret+= " feno";
            has = true;
        }
        if( dado.suplemento.silo ){
            ret += has?", ":"";
            ret+= "silo ";
            has = true
        }
        if( dado.suplemento.capineira ){
            ret += has?" e ":"";
            ret+= " capineira";
        }
        return ret;
    }
    return (
        <Paper >
        <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Confirma soliclitação de produção
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sistema de produção {producao.nome}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Sistema de produção assistida para criação de {producao.nome} será criada com uma área de pastejo de <b>{dado.area} hectare</b> com tota de <b>{dado.qtd} animais</b> adultos.
        </Typography>
        {dado.piquete && dado.piquete > 0 &&
            <Typography variant="body1" gutterBottom>
                A área de pasto possue um sistema rotacionado com <b>{dado.piquete} piquetes </b> distibuidos ao longo da propriedade permitindo 
                com isso aumentar a taxa de lotação animal.
            </Typography>
        }
        {
            (dado.suplemento && (dado.suplemento.feno || dado.suplemento.silo || dado.suplemento.capineira)) &&
            <Typography variant="body1" gutterBottom>
                Tambem é fornecido aos animais <b>{montaSuplemento()}</b> como forma de complementar a alimentação.
            </Typography>
        }   
        <Alert severity="info">
            Ao concluir será montado um sistema de produção assistida que guiará e auxiliará a administração e tomadas de decisões. 
        </Alert>
      </Container>
      </Paper>
    );
  
}
