'use client';
import CommonCard from "@/components/Card";
import CustomPieChart from "@/components/CustomPieChart";
import dynamic from 'next/dynamic';

const CustomBarChart = dynamic(() => import('@/components/CustomBarChart'), { ssr: false });

export default function Dashboard() {

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
          <CustomBarChart />
          <CustomPieChart />
        </section>
      </div>
    </>
  )
}
