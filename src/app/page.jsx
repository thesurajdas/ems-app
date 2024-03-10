import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>Home Page</h1>
        <Link href="/dashboard">
          <button className="py-4 px-8 bg-blue-600 text-white">Go to Admin Dashboard</button>
        </Link>
      </div>
    </>
  );
}
