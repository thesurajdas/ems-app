import Image from 'next/image';
import { LuCheck, LuX } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserStatus = ({ data }) => {
    if (data == "active") {
        return (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                <LuCheck />
                <span className="font-normal">{data}</span>
            </div>
        )
    }
    return (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
            <LuX />
            <span className="font-normal">{data}</span>
        </div>
    )
}
export { UserStatus };

export default function TableRow({ users }) {
    const pathname = usePathname();
    if (!users.length) {
        return (
            <tr>
                <td colSpan="8" className="text-center font-extralight text-3xl py-4 text-gray-500 dark:text-gray-300">No User Found!</td>
            </tr>
        )
    }
    return (
        <>
            {
                users.map((user) => (
                    <tr key={user._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                                {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                <span>{user._id}</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                                <Image className="object-cover rounded-full" src={"/" + user.avatar} alt="" height={32} width={32} />
                                <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user.name}</h2>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{user.email}</p>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <UserStatus data={user.status} />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.role}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.createdAt}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.course}</td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                                <Link href={pathname + "/edit/" + user._id} className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                    Edit
                                </Link>
                                <Link href={pathname + "/" + user._id} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    View
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
        </>
    )
}