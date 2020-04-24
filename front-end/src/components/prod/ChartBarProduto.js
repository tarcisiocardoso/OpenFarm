import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function ChartBarProduto(props) {
    const {labels, dados, titulo} = props;

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Valor médio unitário',
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
            <Bar
                data={data}
                width={100}
                height={200}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};