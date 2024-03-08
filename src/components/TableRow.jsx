import Image from 'next/image';
import { LuCheck } from 'react-icons/lu';

export default function TableRow({ users }) {
    return (
        <>
            {
                users.map((user) => (
                    <tr key={user._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                <span>{user.reg_no}</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                                <Image className="object-cover rounded-full" src={"/" + user.profile_pic} alt="" height={32} width={32} />
                                <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user.name}</h2>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{user.email}</p>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                <LuCheck />
                                <h2 className="text-sm font-normal">{user.status}</h2>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.role}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.createdAt}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">MCA</td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                    Edit
                                </button>
                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    View
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
        </>
    )
}