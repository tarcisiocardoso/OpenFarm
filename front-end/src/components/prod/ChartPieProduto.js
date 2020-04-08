import React from 'react';
import { Pie } from 'react-chartjs-2';



export default function ChartPieProduto(props) {
	const { dados, labels, titulo, color } = props;

	const bgColor = color ? color : [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
	];
	const options = {
		maintainAspectRatio: false,
		responsive: false,
		legend: {
		  position: 'right',
		  labels: {
			boxWidth: 10
		  }
		},
		tooltips: {
			enabled: false
	   	},
		onClick: (e, item) => {
			// console.log(`Item with text ${item[0]._index} and index ${item[0]._datasetIndex} clicked`);
			e.stopPropagation();
		}
	  }
	  
	const data = {
		labels: labels,
		
		datasets: [{
			label: '# of Votes',

			data: dados,
			backgroundColor: bgColor,
			// hoverBackgroundColor: [
			// 	'#FF6384',
			// 	'#36A2EB',
			// 	'#FFCE56'
			// ]
		}]
	};

	return (
		<div>
			<h4>{titulo}</h4>
			<Pie data={data} height={150} options={options}/>
		</div>
	);
};