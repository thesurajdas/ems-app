'use client';
import CommonCard from "@/components/Card";
import CustomPieChart from "@/components/CustomPieChart";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const CustomBarChart = dynamic(() => import('@/components/CustomBarChart'), { ssr: false });

export default function Dashboard() {
  const [pdata, setPdata] = useState();
  const [bdata, setBdata] = useState();
  const [cdata, setCdata] = useState({});
  useEffect(() => {
    const getPieData = async () => {
      const res = await fetch('/api/pie-chart');
      const data = await res.json();
      setPdata(data.chartData);
      // console.log(data.chartData)
    }
    const getBarData = async () => {
      const res = await fetch('/api/bar-chart?students=1');
      const data = await res.json();
      setBdata(data.chartData);
    }
    getBarData();
    getPieData();
  }, []);

  useEffect(() => {
    const getCdata = async () => {
      const res = await fetch('/api/users?role=student');
      const res2 = await fetch('/api/users?role=teacher');
      const res3 = await fetch('/api/stats?action=avg');
      const [data, data2, data3] = await Promise.all([res.json(), res2.json(), res3.json()]);
      setCdata({ students: data.users.length, teachers: data2.users.length, avgMarks: data3.averageMarks[0].average });
    }
    getCdata();
  }, [])
  return (
    <>
      <h1 className="text-gray-800 dark:text-gray-100 ml-4">Dashboard</h1>
      <div className="container rounded-lg w-full">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {cdata.students && <CommonCard title={"Total Students"} cardValue={cdata.students} />}
          {cdata.teachers && <CommonCard title={"Total Teachers"} cardValue={cdata.teachers} />}
          {cdata.avgMarks && <CommonCard title={"Average Marks"} cardValue={(cdata.avgMarks).toFixed(2) + "%"} />}
        </section>
        <section className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {bdata && <CustomBarChart data={bdata} />}
          {pdata && <CustomPieChart data={pdata} />}
        </section>
      </div>
    </>
  )
}
