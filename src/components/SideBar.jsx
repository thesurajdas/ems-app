import Link from 'next/link';
import { LuLayoutDashboard, LuFileSpreadsheet, LuFileCheck, LuSettings, LuUser2, LuUsers } from "react-icons/lu";
const SideBar = () => {
    const links = [
        { name: 'Dashboard', url: '/dashboard', icon: <LuLayoutDashboard /> },
        { name: 'Users', url: '/dashboard/users', icon: <LuUsers /> },
        { name: 'Admit', url: '/dashboard/admit', icon: <LuFileCheck /> },
        { name: 'Result', url: '/dashboard/results', icon: <LuFileSpreadsheet /> },
        { name: 'Profile', url: '/dashboard/profile', icon: <LuUser2 /> },
        { name: 'Settings', url: '/dashboard/settings', icon: <LuSettings /> },
    ];

    return (
        <div className="bg-slate-200 dark:bg-gray-700 w-0 md:w-64 h-screen overflow-auto">
            <h2 className="p-4 text-center">EM System</h2>
            <ul className="p-6">
                {links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <Link href={link.url} className="px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-slate-500">
                            <span className="flex items-center gap-2">
                                {link.icon}
                                {link.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;