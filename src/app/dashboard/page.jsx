'use client';
import CommonCard from "@/components/Card";
import CustomPieChart from "@/components/CustomPieChart";
import dynamic from 'next/dynamic';

const CustomBarChart = dynamic(() => import('@/components/CustomBarChart'), { ssr: false });

export default function Dashboard() {
  const data = {
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
    datasets: [
      {
        label: 'Marks',
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
  return (
    <>
      <h1 className="text-gray-800 dark:text-gray-100 ml-4">Dashboard</h1>
      <div className="container rounded-lg w-full">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
          <CommonCard title={"No of Students"} cardValue={10} />
          <CommonCard title={"Student Performance"} cardValue={"40%"} />
          <CommonCard title={"Attendance Percentage"} cardValue={"10%"} />
        </section>
        <section className="m-4 grid grid-cols-2 gap-4">
          <CustomBarChart data={data} />
          <CustomPieChart />
        </section>
      </div>
    </>
  )
}
