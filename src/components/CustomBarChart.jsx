
'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import 'chart.js/auto';

const CustomBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const cdata = data;
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    };

    setChartData(cdata);
    setChartOptions(options);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} className='h-96' />
      </div>
    </div>
  );
};

export default CustomBarChart;

