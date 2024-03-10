'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';


const CustomPieChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Present', 'Absent'],
            datasets: [
                {
                    data: [70, 30],
                    backgroundColor: [
                        'rgba(0, 148, 0, 0.9)',
                        'rgba(255, 0, 0, 0.8)', 
                        // documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        'rgba(0, 148, 0, 0.9)',
                        'rgba(255, 0, 0, 0.8)', 
                        // documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '70%',
            maintainAspectRatio: false,
            hoverOffset: 4
        };

        setChartData(data);
        setChartOptions(options);
    }, []);


  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
        </div>
  );
};

export default CustomPieChart ;