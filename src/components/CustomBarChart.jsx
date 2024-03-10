
'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';
// import { useClient } from 'next/amp';

const CustomBarChart = () => {
  // useClient();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
        labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
        datasets: [
            {
                label: 'Semeterwise Percentage',
                data: [40, 50, 70, 80],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false 
    };

    setChartData(data);
    setChartOptions(options);
}, []);

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
             <div className="card h-[300px]" >
            <Chart type="bar" data={chartData} options={chartOptions} height='300px' />
        </div>
        </div>
  );
};

export default CustomBarChart ;

