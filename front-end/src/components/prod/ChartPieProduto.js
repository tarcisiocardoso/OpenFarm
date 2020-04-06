import React from 'react';
import {Pie} from 'react-chartjs-2';



export default function ChartPieProduto(props) {
	const data = {
		labels: props.labels,
		datasets: [{
			data: props.dados,
			backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			]
		}]
	};
    return (
      <div>
        <h2>{props.titulo}</h2>
        <Pie data={data} height={150} />
      </div>
    );
};