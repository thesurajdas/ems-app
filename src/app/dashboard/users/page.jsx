import Table from "@/components/Table";
import Link from "next/link";

export default function users() {
  return (
    <>
      <h1 className="ml-4">Users</h1>
      <div className="container">
        <div className="flex justify-between w-full items-center">
          <p className="py-2 px-4">Filter</p>
          <Link href="/dashboard/users/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-2xl">Create Users</button>
          </Link>
        </div>
        <Table />
      </div>
    </>
  )
}
