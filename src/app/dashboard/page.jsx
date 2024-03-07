
export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h1>
      <div className="container my-4 dark:bg-gray-700 bg-slate-100 p-4 rounded-lg shadow w-full">
        <section className="grid grid-cols-3 gap-4 m-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Total Students</h2>
            <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">10</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Student Performance</h2>
            <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">20%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Student Attendance</h2>
            <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">30%</p>
          </div>
        </section>
        <section className="m-4 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">Graph 1</h2>
            <div className="h-64">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
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
