import React, { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import ListaFazendaPanel from './ListaFazendaPanel';
import TableGastos from './TableGastos';
import ListaProducoes from './ListaProducoes';

export default function PainelControleFazendeiro(props) {
    const {user} = props;
    const [arrFarm, setArrFar] = React.useState();
    const [error, setError] = React.useState();
    const [fazenda, setFazenda] = React.useState();

    useEffect(()=>{
        console.log('>>>PainelControleFazendeiro<<<', user);

        fetch('/api/farm/user/'+user.id)
          .then(response => response.json())
          .then(data => {
              setArrFar(data);
              if( data && data.length === 1){
                buscaFazenda(data[0].id);
              }
            })
          .catch(error => setError(error));
        

    }, [user] );

    const buscaFazenda = (id) => {
        fetch('/api/farm/'+id)
          .then(response => response.json())
          .then(data => setFazenda(data))
          .catch(error => setError(error));
        
      };

    return (
        <div>
            {
              arrFarm && arrFarm.length > 1 &&
              <ListaFazendaPanel arrFarm={arrFarm}/>
            }
            {
              fazenda && 
              <div>
                <h2>{fazenda.identificacao.nome}</h2>
                <TableGastos fazenda={fazenda}/>
                <ListaProducoes fazenda={fazenda} setError={setError}/>
              </div>
            }
            { error && 
              <Alert severity="error">{error}</Alert>
            }
        </div>
    )
};

