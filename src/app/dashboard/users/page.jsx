import Table from "@/components/Table";

export default function users() {
  return (
    <>
      <h1 className="m-3 text-bold text-2xl">Users</h1>
      <div className="dark:bg-gray-700 bg-slate-100 p-4 rounded-lg shadow w-full">
        <Table />
      </div>
    </>
  )
}
