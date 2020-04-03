import React from 'react';
import {Line} from 'react-chartjs-2';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      width: '100%',
      font: 12,
    },
  });

export default function ChuvaChart(props) {
    const classes = useStyles();

    const {meses, matriz} = props;
    const data = {
        labels: meses,
        datasets: [
          {
            label: 'Chuma em mm por hectare ao mes',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: matriz.chuva
          }
        ]
      };

    return ( 
      <Container maxWidth="xl">
        <Line data={data} height={50} />
      </Container>
    );
};