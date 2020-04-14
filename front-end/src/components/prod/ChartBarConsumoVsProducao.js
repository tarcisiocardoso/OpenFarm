import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function ChartBarConsumoVsProducao(props) {

  const {producao, consumo, reserva, labels} = props;

    const data= {
        labels: labels, //["1900", "1950", "1999", "2050"],
        datasets: [
          {
            label: "Producao",
            backgroundColor: "green",
            data: producao, //[133,221,783,2478]
          },{
            label: "Reserva",
            backgroundColor: "yellow",
            data: reserva, //[133,221,783,2478]
          }, {
            label: "Consumo",
            backgroundColor: "red",
            data: consumo //[408,547,675,734]
          }
        ]
      };
    const options= {
        title: {
          display: true,
          text: 'Producao vs Consumo Pasto'
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

    return (
        <div>
            <Bar
                data={data}
                width={380}
                height={220}
                options={options}
            />
        </div>
    );
};