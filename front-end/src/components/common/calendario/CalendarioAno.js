import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import VerAtividadesTable from '../VerAtividadesTable';

import './calendario.css';

const semanaArr = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
const DAYS_OF_MONTH = 31;
const qtd_colunas = 6;
const hoje = new Date();

export default function CalendarioAno(props) {

    const { data, meses, producao } = props;
    const [atividades, setAtividades]= useState();
    const [atividadePeriodo, setAtividadePeriodo] = useState();

    useEffect(() => {
        console.log('>>>CalendarioAno<<<', data, producao);
        if( producao ){
            let arr = [];
            for(let x in producao){
                for( let y in producao[x].dados.atividades){
                    arr.push( producao[x].dados.atividades[y] );
                }
            }
            setAtividades(arr);
        }
        
    }, [data, producao]);

    const handleCellAnoClick = (e, mes, dia) => {
        console.log('>>>handleCellAnoClick<<<', mes, dia);
        let arr = [];
        for(let x in producao){
            for( let y in producao[x].dados.atividades){
                let at = producao[x].dados.atividades[y]
                if( typeof at.tempo !== 'object'){
                    if (at.tempo >= 30) {
                        if (at.tipo === 'D') {
                            // if ((dia === 1 || dia === ultimoDia) && mes % (at.tempo / 30) === 0) {
                            //     arr.push( producao[x].dados.atividades[y] );
                            // }
                            if ( (mes+1) % (at.tempo / 30) === 0) {
                                arr.push( producao[x].dados.atividades[y] );
                            }
                        }
                    }
                }else{
                    // let menosDia = at.tempo.inicio;
                    // if( (dia-menosDia) % at.tempo.aCadaDia === 0 ){
                    //     arr.push( producao[x].dados.atividades[y] );
                    // }
                }
            }
        }
        setAtividadePeriodo( (dia?dia+" de ":'')+meses[mes]);
        setAtividades(arr);
    }
    const handleMesClick = (e, mes) => {
        console.log('>>>handleMesClick<<<', mes);
        handleCellAnoClick(e, mes);
    }
    return (
        < Grid container spacing={2}>
            <Grid item xs={8}>
                < Grid container spacing={2}>
                    {meses.map((m, index) =>
                        <div key={index} className="grid-container">
                            <div className='jaarkalender'>
                                <table className='calendar' >
                                    <caption className='calendar-title' title="Calendário janeiro 2019"><b>
                                        <a href="#"
                                            onClick={(e) => handleMesClick(e, index )}
                                            className='calendar-title-link'>{m}</a></b></caption>
                                    <thead>
                                        <tr>
                                            <th className="wknr" title="Número da semana">N°</th>
                                            {semanaArr.map((item, index) =>
                                                <th abbr={item} key={index} title={item}>{item.substring(0, 2)}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <MesPanel mes={index} data={data} onClick={handleCellAnoClick}/>
                                </table>
                            </div>
                        </div>
                    )}
                </ Grid>
                </Grid>
            <Grid item xs={4}>
                <h1>Atividades {atividadePeriodo && atividadePeriodo}</h1>
                <VerAtividadesTable atividades={atividades} />
            </Grid>
        </Grid>
    )
}

function MesPanel(props) {
    const {mes, data, onClick} = props;
    const [semanas, setSemanas] = useState([]);

    useEffect(()=>{
        let dt = new Date();
        dt.setMonth(mes);
        dt.setFullYear( data.getFullYear() );
        dt.setDate(1);
        console.log('>>>MesPanel<<<', dt );
        var dia = 0;
        if (dt.getDay() > 0) {
            dt.setDate(-dt.getDay() + 1);
        }
        let semanas = [];
    
        for (let x = 0; x < qtd_colunas; x++) {
            let ds = [];
            for (let y = 0; y < semanaArr.length; y++) {
                ds.push({
                    dia: dt.getDate(),
                    mes: dt.getMonth()
                });
    
                dia++;
                dt.setDate(dt.getDate() + 1);
            }
            semanas.push(ds);
            if (dia > DAYS_OF_MONTH) break;
        }
        dt.setDate(0);
        setSemanas(semanas);
    }, [data]);

    function DiaPanel(props){
        const {dia, mes, mesCorrente, onClick} = props;
        const handleDiaClick=(e)=>{
            console.log('>>>handleDiaClick<<<');
            onClick(e, mes, dia);
        }
        if( mes !== mesCorrente){
            return <td colSpan="1" className="emptycells">&nbsp;</td>;
        }else{
            if( dia === hoje.getDate() ){
                return (
                    <td className="vak">
                        <a href="#" onClick={handleDiaClick}
                            title="Confraternização Universal 2019">1</a>
                    </td>
                )
            }else{
                return <td className="wd_6" onClick={handleDiaClick}>{dia}</td>;
            }
        }
    }

    return (
        <tbody>
            {semanas.map((item, index) =>
                <tr key={index}>
                    <td className="wknr" title={"Número da semana "+(index+1)}>{index+1}</td>
                    {item.map((d,i) => 
                        <DiaPanel key={i} dia={d.dia} mes={d.mes} mesCorrente={mes} onClick={onClick}/>
                    )}
                </tr>
            )}
        </tbody>
    )
}