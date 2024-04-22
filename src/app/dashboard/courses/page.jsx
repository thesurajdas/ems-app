"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/viva-dark/theme.css"

export default function CoursesPage() {
  const [courses, setCourses] = useState([{
    loading: true,
    data: [],
    error: null
  }]);

  const cols = [
    { field: 'code', header: 'Code' },
    { field: 'degree', header: 'Degree' },
    { field: 'type', header: 'Type' },
    { field: 'duration', header: 'Semester' },
    { field: 'subjects', header: 'Subjects' },
  ];

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/courses');
    const data = await response.json();
    console.log(data.courses)
    setCourses({
      ...courses,
      loading: false,
      data: data.courses,
    });
  };


  useEffect(() => {
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
              {cols.map((col, i) => (
                <Column className='' key={col.field} field={col.field} header={col.header} />
              ))}
            </DataTable>
          </div>
        )}
      </div>
    </>
  )
}