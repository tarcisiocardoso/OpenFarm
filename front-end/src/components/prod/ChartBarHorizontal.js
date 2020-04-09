import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';


export default function ChartBarHorizontal(props) {

  const { titulo, dados, labels, label } = props;
  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'top',
      // labels: {
      //   boxWidth: 10
      // }
    },
    tooltips: {
      enabled: true
    },
    onClick: (e, item) => {
      // console.log(`Item with text ${item[0]._index} and index ${item[0]._datasetIndex} clicked`);
      e.stopPropagation();
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dados
      }
    ]
  };

  return (
    <div>
      <h2>{titulo}</h2>
      <HorizontalBar data={data} options={options} width={500}/>
    </div>
  );
}