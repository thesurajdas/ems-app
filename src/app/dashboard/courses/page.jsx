"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function CoursesPage() {
  const [courses, setCourses] = useState([{
    loading: true,
    data: [],
    error: null
  }]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/courses');
      const data = await response.json();
      console.log(data.courses)
      setCourses({
        ...courses,
        loading: false,
        data: data.courses
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-4">Users</h1>
      <div className="container">
        <div className="flex justify-end w-full items-center">
          <Link href="/dashboard/courses/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-2xl">Create Courses</button>
          </Link>
        </div>
        {!courses.loading && (
          <div className="w-full mx-auto border rounded">
            <DataTable value={courses.data} paginator rows={5} showGridlines tableStyle={{ minWidth: '50rem' }}>
              <Column className='border p-2' field="name" header="Name"></Column>
              <Column className='border p-2' field="code" header="Code"></Column>
              <Column className='border p-2' field="degree" header="Degree"></Column>
              <Column className='border p-2' field="type" header="Type"></Column>
              <Column className='border p-2' field="duration" header="Semester"></Column>
              <Column className='border p-2' field="subjects" header="Subjects"></Column>
            </DataTable>
          </div>
        )}
      </div>
    </>
  )
}