import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Grid, Typography, 
    ExpansionPanel, 
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PiqueteForm from './PiqueteForm';
import PiqueteDimensaoForm from './PiqueteDimensaoForm';
import { findAllByDisplayValue } from '@testing-library/react';

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
            //   textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        canvas: {
            border: '2px solid #d3d3d3'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            
          },
    }),
);
let piquetes = [];
let indexPiqueteOver=-1;
let indexPiqueteClick=-1;
let resize = {
    fg:false
};
let drag=false;
let mouse={};

const FRAMES_PER_SECOND = 10;
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
var lastFrameTime = 0;

function PiquetePanel(props) {
    const classes = useStyles();
    const location = useLocation();
    const ref = useRef(null);
    const [piqueteEdit, setPiqueteEdit] = useState();
    const { producao } = props;

    let dimensalBase={
        baseMetro:function(px){
            const cv = document.getElementById("canvas");
            const base = Math.sqrt(producao.dados.producao.areaProducaoEmHE)*100;//em metros
            return (base * px)/cv.width;
        },
        alturaMetro: function(px){
            const cv = document.getElementById("canvas");
            const base = Math.sqrt(producao.dados.producao.areaProducaoEmHE)*100;//em metros
            return (base * px)/cv.height;
        }
    }

    useEffect(() => {
        console.log('>>>PiquetePanel<<<', producao );
        
        requestAnimationFrame(draw)
    }, [producao]);

    function draw(time){
        if(time-lastFrameTime < FRAME_MIN_TIME){ 
            requestAnimationFrame(draw);
            return;
        }
        lastFrameTime = time; // remember the time of the rendered frame

        if( !limpa()) return;
        if (piquetes.length == 0) {
            montaPiquetes();
        }else{
            desenhaPiquetes();
        }
        drawPiqueteEscolhido();
        drawMouseOver();
        drawDragW();
        requestAnimationFrame(draw);
    }
    function drawPiqueteEscolhido(){
        const canvas = ref.current;
        if( indexPiqueteClick >= 0 ){
            const p = piquetes[indexPiqueteClick];
            const ctx = ref.current.getContext("2d");
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.w, p.h);
            ctx.strokeStyle = "red";
            ctx.lineWidth = "4";
            ctx.stroke();
            // ctx.fill();
        }
    }
    function drawDragW(){
        indexPiqueteOver = mouseDentroPiquete(mouse);
        if( drag && resize.fg && indexPiqueteOver >=0 ){
            const p = piquetes[indexPiqueteOver?indexPiqueteOver:indexPiqueteClick];
            
            const canvas = ref.current;
            
            const ctx = ref.current.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(mouse.x, p.y);
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = "2";
            ctx.lineTo(mouse.x, p.h+p.y);
            ctx.stroke();
        }
    }
    function drawMouseOver(){
        const canvas = ref.current;
        if( indexPiqueteOver >= 0 ){
            if( indexPiqueteClick === indexPiqueteOver ) return;
            const p = piquetes[indexPiqueteOver];
            if( !resize.fg) canvas.style.cursor = 'pointer';
            const ctx = ref.current.getContext("2d");
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.w, p.h);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = "1";
            ctx.stroke();
        }else{
            canvas.style.cursor = 'default';
        }
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const canvas = ref.current;

        var mouse = getMousePos(canvas, e);
        document.getElementById("info_debug").innerHTML = "[" + mouse.x + ", " + mouse.y + "]"

        indexPiqueteOver = mouseDentroPiquete(mouse);

        mouseResize(canvas, mouse);
    }
    const handleMouseDown=(e)=>{
        drag=true;
        console.log('>>>handleMouseDown<<<');
        
    }
    const handleMouseUp=(e)=>{

        indexPiqueteOver = mouseDentroPiquete(mouse);
        // console.log('>>>handleMouseUp<<<' );
        
        if( indexPiqueteOver>=0 && resize.fg){
            let p = piquetes[indexPiqueteOver];
            // console.log('>>>handleMouseUp', resize, mouse, indexPiqueteOver, p );
            if(resize.fim){
                if( p.x+p.w > mouse.x){
                    p.w = p.w - Math.abs( p.w+p.x - mouse.x);
                }else{
                    p.w = p.w + Math.abs( p.w+p.x - mouse.x);
                }
            }else{
                
                // p.x = mouse.x;
                // p.w = p.w - (mouse.x - p.w);
                
                if( p.x < mouse.x){
                    p.w = p.w - (mouse.x - p.x);
                }else{
                    p.w = p.w + (p.x - mouse.x);
                }
                p.x = mouse.x;
            }
            console.log(p);
            setPiqueteEdit(p);
        } 
        drag=false;
        resize.fg = false;
    }
    const handleClick=(e)=>{
        // e.preventDefault();
        // e.stopPropagation();
        console.log('>>>handleClick<<<', piquetes[indexPiqueteOver] );
        const canvas = ref.current;

        var mouse = getMousePos(canvas, e);
        let clickAnterior = indexPiqueteClick;
        indexPiqueteClick = mouseDentroPiquete(mouse);
        // if( clickAnterior == indexPiqueteClick ){
        //     // indexPiqueteClick = -1;
        //     // setPiqueteEdit();
        // }
        // console.log('>>>handleClick<<<', indexPiqueteClick, piquetes[indexPiqueteOver]);

        setPiqueteEdit({...piquetes[indexPiqueteOver]});
    }
    const handleMouseLeave =(e)=>{
        indexPiqueteOver=-1;
    }
    function limpa(){
        if( !ref || !ref.current) return false;
        var cv = document.getElementById("canvas");
        const ctx = ref.current.getContext("2d");

        const qtd = producao.dados.pasto.piquetes;

        var matriz = getMatriz(qtd);

        //limpa
        ctx.beginPath();
        ctx.rect(0, 0, cv.width, cv.height);
        ctx.fillStyle = "white"
        ctx.fill();
        return true;
    }
    function desenhaPiquetes(){
        for(let id in piquetes){
            let pq = piquetes[id];
            printPiquete(pq.x, pq.y, pq.w, pq.h);
        }
    }
    function montaPiquetes() {
        var cv = document.getElementById("canvas");
        const qtd = producao.dados.pasto.piquetes;

        var matriz = getMatriz(qtd);

        var bw = cv.width / matriz[0];
        var bh = cv.height / matriz[1];

        var incX = 0;
        var incY = 0;
        var i = 0;
        for (i = 0; i < qtd; i++) {
            var x = incX++ * bw;
            if (parseInt(x + bw) > cv.width) {
                x = 0;
                incX = 1;
                incY++;
            }
            var y = incY * bh;
            printPiquete(x, y, bw, bh);

            piquetes.push({
                    x: x,
                    y: y,
                    w: bw,
                    h: bh
                }
            );
        }
    }
    function mouseResize(canvas, mouse){
        // let index = -1;
        if( drag && resize.fg) return;
        if( indexPiqueteOver >= 0 ){
            let pq = piquetes[indexPiqueteOver];
            if(mouse.x-5 <= pq.x ){
                canvas.style.cursor = 'col-resize';
                resize.fg=true;
                resize.tp='w';
                resize.fim=false;
            }else if(mouse.x > (pq.x+pq.w)-5 ){
                canvas.style.cursor = 'col-resize';
                resize.fg=true;
                resize.tp='w';
                resize.fim=true;
            }else{
                resize.fg=false;
            }
        }else{
            resize.fg = false;
        }
    }
    function dividirHorizontal(){
        if( indexPiqueteClick>=0 ){
            let pq = piquetes[indexPiqueteClick];
            pq.h = pq.h/2;
            piquetes.push({
                x: pq.x,
                y: pq.y+pq.h,
                w: pq.w,
                h: pq.h
            });
        }
    }
    function dividirVertical(){
        if( indexPiqueteClick>=0 ){
            let pq = piquetes[indexPiqueteClick];
            pq.w = pq.w/2;
            piquetes.push({
                x: pq.x+pq.w,
                y: pq.y,
                w: pq.w,
                h: pq.h
            });
        }
    }
    function mouseDentroPiquete(mouse){
        if( drag ) return indexPiqueteOver;

        let index = -1;
        for( let i in piquetes){
            let pq = piquetes[i];
            let x=pq.x;
            let y=pq.y;
            let w=pq.w+x;
            let h=pq.h+y;
            if( mouse.x >= pq.x && mouse.x <= pq.x+pq.w && 
                mouse.y >= pq.y && mouse.y <= pq.y+pq.h
                ){
                index = i;
                break;
            }
        }
        return index;
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        mouse= {
            x: parseInt(evt.clientX - rect.left),
            y: parseInt(evt.clientY - rect.top)
        };
        return mouse;
    }

    function getMatriz(qtd) {
        var valor = qtd;
        if (isPrimo(valor)) valor++;

        var linha = 2;
        var coluna = [];
        while ((valor / linha) >= 2) {
            if (!isPrimo(valor) && valor % linha !== 0) {
                linha++;
                continue;
            }
            coluna.push(linha);
            valor = valor / linha;
            if (isPrimo(valor)) {
                linha = parseInt(valor);
                break;
            }
        }
        var i = 0;
        var col = 1;
        for (i = 0; i < coluna.length; i++) {
            col *= coluna[i];
        }
        return [linha, col];

    }
    function isPrimo(vl) {
        if (vl == 2) return false;
        var i = 0;
        for (i = 2; i < vl / 2; i++) {
            if (vl % i === 0) return false;
        }
        return true;
    }
    function printPiquete(l, c, bl, bc) {
        const ctx = ref.current.getContext("2d");
        ctx.beginPath();
        ctx.rect(l + 1, c + 1, bl - 1, bc - 1);
        ctx.fillStyle = "green";
        ctx.fill();
    }

    return (
        <Container maxWidth="xl" >
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <Typography component="h1" variant="h5" align='center'>
                        Definição de piquetes
                    </Typography>
                    <Grid item xs={1}>
                        <Typography variant="caption" display="block" gutterBottom>
                            <div id="info_debug"></div>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <div style={{
                        maxHeight: '660px', 
                        maxWidth:'820px', 
                        overflow: 'scroll'
                    }}>
                    <canvas ref={ref} 
                        className={classes.canvas} 
                        id="canvas" 
                        width='800' 
                        height='600' 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} >Informações do pasto</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <PiqueteForm 
                            piquete={piqueteEdit} 
                            dividirVertical={dividirVertical}
                            dividirHorizontal={dividirHorizontal}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                { piqueteEdit &&
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading} >Dimensionamento do pequite</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <PiqueteDimensaoForm 
                                piquete={piqueteEdit} 
                                producao={producao}
                                setPiquete={setPiqueteEdit}
                                dimensalBase={dimensalBase}
                                dividirVertical={dividirVertical}
                                dividirHorizontal={dividirHorizontal}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                }
                </Grid>
            </Grid>
        </Container>
    );


}

export default PiquetePanel;