'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';


const CustomPieChart = ({ data }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const options = {
            cutout: '70%',
            maintainAspectRatio: false,
            hoverOffset: 4,
            plugins: {
                title: {
                    display: true,
                    text: 'Total Passed and Failed Students',
                    color: 'white',
                    font: {
                        size: 16
                    },
                    position: 'bottom',
                    padding: {
                        top: 30
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);


    return (
        <div className="bg-white dark:bg-gray-700 p-10 rounded-lg shadow">
            <div className="card flex justify-content-center">
                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </div>
    );
};

export default CustomPieChart;