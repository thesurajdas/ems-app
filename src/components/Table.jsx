"use client";
import { useState, useEffect } from 'react';
import { LuFilter } from 'react-icons/lu';
import TableRow from './TableRow';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';

export default function Table() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const limit = 5;
    const totalPage = Math.ceil(totalData / limit);
    useEffect(() => {
        const fetchData = async (search, page) => {
            const response = await fetch(`/api/users?q=${search}&page=${page}&limit=${limit}`, { cache: 'no-store' });
            const result = await response.json();
            setData(result);
            setLoading(true);
            setTotalData(result.length);
        }
        fetchData(search, page);
    }, [search, page]);
    return (
        <>
            {/* component */}
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Reg ID</span>
                                                        <LuFilter />
                                                    </button>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Name
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Role
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Registration Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Course
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="dark:bg-gray-700 bg-gray-200 rounded-xl py-2 px-4 outline-none w-full" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-auto">
                                        {!loading ? Array(limit).fill(0).map((e, id) => (
                                            <tr key={id} className="transition animate-pulse">
                                                {Array(8).fill(0).map((e, id) => (
                                                    <td key={id} className="p-2"><div className="bg-slate-300 m-2 w-full h-7 rounded-full"></div></td>
                                                ))}
                                            </tr>
                                        )) : (
                                            <TableRow users={data.users} />
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Total Users: {totalData}
                    </p>
                    <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                </div>
            </section >
        </>
    )
}
