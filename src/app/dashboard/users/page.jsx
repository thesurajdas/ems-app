import Table from "@/components/Table";
import Link from "next/link";

export default function users() {
  return (
    <>
      <h1 className="m-3 text-bold text-2xl">Users</h1>
      <div className="dark:bg-gray-700 bg-slate-100 p-4 rounded-lg shadow w-full">
        <div className="flex justify-end w-full">
          <Link href="/dashboard/users/create">
            <button className="bg-blue-600 py-2 px-4 m-4 rounded-2xl">Create Users</button>
          </Link>
        </div>
        <Table />
      </div>
    </>
  )
}
