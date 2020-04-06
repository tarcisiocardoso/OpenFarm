import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    canvas: {
        border: '2px solid #d3d3d3'
    }
  }),
);

function PiquetePanel(props) {
    const classes = useStyles();
    const location = useLocation();
    const ref = useRef(null);
    const {producao} = props;

    useEffect(() => {
        console.log("--->PiquetePanel", producao);
        desenhaPiquetes();
    });

    const handleMouseMove = (e)=>{
        var mouse = getMousePos(ref.current, e);
        document.getElementById("info_debug").innerHTML = "["+mouse.x+", "+mouse.y+"]"
    }

    return (
        <Container maxWidth="xl" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" align='center'>
                        Definição de piquetes
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="caption" display="block" gutterBottom>
                        <div id="info_debug"></div>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <canvas ref={ref} className={classes.canvas} id="canvas" width={800} height={600} onMouseMove={handleMouseMove}/>
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
            </Grid>
        </Container>
            );
    
    function desenhaPiquetes(){
        var cv = document.getElementById("canvas");
        const ctx = ref.current.getContext("2d");
        
        const qtd = producao.dados.pasto.piquetes;
        
        var matriz = getMatriz(qtd);

            //limpa
            ctx.beginPath();
            ctx.rect(0, 0, cv.width, cv.height);
            ctx.fillStyle = "white"
            ctx.fill();

            var bw = cv.width/matriz[0];
            var bh = cv.height/matriz[1];
        
            var incX=0;
            var incY=0;
            var i=0;
            for(i=0; i< qtd; i++ ){
                var x = incX++ * bw;
                if( parseInt(x+bw) > cv.width){
                    x = 0;
                    incX=1;
                    incY++;
                }
                var y =incY * bh;
                printPiquete(x, y, bw, bh);
            }
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: parseInt( evt.clientX - rect.left),
          y: parseInt(evt.clientY - rect.top)
        };
      }
        
      function getMatriz(qtd){
        var valor = qtd;
        if( isPrimo(valor)) valor++;
    
        var linha=2;
        var coluna=[];
        while( (valor / linha) >= 2){
            if( !isPrimo(valor) && valor % linha !== 0){
                linha++; 
                continue;
            }
            coluna.push(linha);
            valor = valor/linha;
            if( isPrimo(valor) ){
                linha = parseInt(valor);
                break;
            }
        }
        var i=0;
        var col = 1;
        for(i=0; i< coluna.length; i++){
            col *=coluna[i];
        }
        return [linha, col];
    
    }       
    function isPrimo(vl){
        if( vl == 2) return false;
        var i=0;
        for(i=2; i< vl/2; i++){
            if( vl % i === 0 )return false;
        }
        return true;
    }
    function printPiquete(l, c, bl, bc){
        const ctx = ref.current.getContext("2d");
         ctx.beginPath();
         ctx.rect(l+8, c+8, bl-10, bc-10);
         ctx.fillStyle = "green";
         ctx.fill();
     }

}

export default PiquetePanel;