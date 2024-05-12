"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard, LuFileSpreadsheet, LuFileCheck, LuSettings, LuUser2, LuUsers, LuFileBarChart2, LuBook, LuBookPlus } from "react-icons/lu";
import { useSession } from "next-auth/react";

const SideBar = () => {
    const { data: session } = useSession();
    console.log(session)

    const pathname = usePathname();
    const isActive = (url) => {
        return pathname === url ? 'bg-slate-600 text-white' : '';
    }
    let links = [];
    if (session?.user?.role === 'admin') {
        links = [
            { name: 'Dashboard', url: '/dashboard', icon: <LuLayoutDashboard /> },
            { name: 'Users', url: '/dashboard/users', icon: <LuUsers /> },
            { name: 'Courses', url: '/dashboard/courses', icon: <LuBook /> },
            { name: 'Exams', url: '/dashboard/exams', icon: <LuBookPlus /> },
            { name: 'Admit', url: '/dashboard/admit', icon: <LuFileCheck /> },
            { name: 'Result', url: '/dashboard/result', icon: <LuFileSpreadsheet /> },
            { name: 'Result Analysis', url: '/dashboard/analysis', icon: <LuFileBarChart2 /> },
            { name: 'Profile', url: '/dashboard/profile', icon: <LuUser2 /> },
            // { name: 'Settings', url: '/dashboard/settings', icon: <LuSettings /> },
        ];
    }
    else if (session?.user?.role === 'teacher') {
        links = [
            { name: 'Dashboard', url: '/dashboard', icon: <LuLayoutDashboard /> },
            { name: 'Courses', url: '/dashboard/courses', icon: <LuBook /> },
            { name: 'Exams', url: '/dashboard/exams', icon: <LuBookPlus /> },
            { name: 'Result', url: '/dashboard/result', icon: <LuFileSpreadsheet /> },
            { name: 'Result Analysis', url: '/dashboard/analysis', icon: <LuFileBarChart2 /> },
            { name: 'Profile', url: '/dashboard/profile', icon: <LuUser2 /> },
            // { name: 'Settings', url: '/dashboard/settings', icon: <LuSettings /> },
        ];
    }
    else if (session?.user?.role === 'student') {
        links = [
            { name: 'Dashboard', url: '/dashboard', icon: <LuLayoutDashboard /> },
            { name: 'Admit', url: '/dashboard/admit', icon: <LuFileCheck /> },
            { name: 'Result', url: '/dashboard/result', icon: <LuFileSpreadsheet /> },
            { name: 'Profile', url: '/dashboard/profile', icon: <LuUser2 /> },
            // { name: 'Settings', url: '/dashboard/settings', icon: <LuSettings /> },
        ];
    }

    return (
        <div className="bg-slate-200 dark:bg-gray-800 h-screen overflow-auto">
            <Link href="/"><h2 className="p-4 text-center">EM System</h2></Link>
            <ul className="p-6">
                {links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <Link href={link.url} className={isActive(link.url) + " px-4 py-3 flex items-center space-x-4 gap-2 rounded-md group hover:bg-slate-500 hover:text-white"}>
                            {link.icon}
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;