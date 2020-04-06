import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function ChartBarProduto(props) {

    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Valor médio unitário',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: props.dados
            }
        ]
    };

    return (
        <div>
            <h2>{props.titulo}</h2>
            <Bar
                data={data}
                width={100}
                height={150}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};