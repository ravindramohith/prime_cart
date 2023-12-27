import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ salesData }) => {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const labels = salesData?.map(sale => sale?.date)

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: salesData?.map(sale => sale?.sales),
                borderColor: '#198753',
                backgroundColor: 'rgba(42, 117, 133, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Orders',
                data: salesData?.map(sale=>sale?.numOrders),
                borderColor: 'rgb(220, 52, 69)',
                backgroundColor: 'rgba(201, 68, 82, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };
    return <Line options={options} data={data} />;
}

export default SalesChart;
