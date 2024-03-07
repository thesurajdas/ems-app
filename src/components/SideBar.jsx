import Link from 'next/link';
import { LuLayoutDashboard } from "react-icons/lu";
const SideBar = () => {
    const links = [
        { name: 'Dashboard', url: '/dashboard' },
        { name: 'Users', url: '/dashboard/users' },
        { name: 'Admit', url: '/dashboard/admit' },
        { name: 'Result', url: '/dashboard/results' },
        { name: 'Profile', url: '/dashboard/profile' },
        { name: 'Settings', url: '/dashboard/settings' },
    ];

    return (
        <div className="bg-slate-200 dark:bg-gray-600 w-64 h-screen overflow-auto">
            <h2 className="p-4 text-center">EMS</h2>
            <ul className="p-6">
                {links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <Link href={link.url} className="px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-slate-500">
                            <span className="flex items-center">
                                <LuLayoutDashboard className="mr-2" />
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