
export default function Dashboard() {
  return (
    <>
      <h1 className="text-gray-800 dark:text-gray-100 ml-4">Dashboard</h1>
      <div className="container rounded-lg w-full">
        <section className="grid grid-cols-4 gap-4 m-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100 my-2">Total Students</h2>
            <p className="text-5xl font-semibold text-gray-800 dark:text-gray-100 flex justify-end">10</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100 my-2">Student Performance</h2>
            <p className="text-5xl font-semibold text-gray-800 dark:text-gray-100 flex justify-end">20%</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100 my-2">Student Attendance</h2>
            <p className="text-5xl font-semibold text-gray-800 dark:text-gray-100 flex justify-end">30%</p>
          </div>
        </section>
        <section className="m-4 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Graph 1</h2>
            <div className="h-64">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Graph 2</h2>
            <div className="h-64">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
