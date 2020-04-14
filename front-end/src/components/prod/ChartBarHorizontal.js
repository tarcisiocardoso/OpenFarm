import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';


export default function ChartBarHorizontal(props) {

  const { titulo, dados, labels, label, monetario } = props;
  const optionsMonetario = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'top',
      // labels: {
      //   boxWidth: 10
      // }
    },
    scales: {
      xAxes: [{
          ticks: {
              beginAtZero:true,
              callback: function(value, index, values) {
                  return value.toLocaleString('pt-br', {minimumFractionDigits: 2});
              }
          }
      }]
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem, chart){
            // var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            // return datasetLabel + ': $ ' + tooltipItem.yLabel;
            return "R$: "+tooltipItem.xLabel.toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
      }
    },
    onClick: (e, item) => {
      e.stopPropagation();
    }
  }
  const options = {
    title: {
      display: true,
      text: {titulo}
    },
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'top',
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
      <HorizontalBar 
      data={data} 
      options={monetario?optionsMonetario:options} 
      width={500}
      height={220}
      />
    </div>
  );
}