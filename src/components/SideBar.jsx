import React from 'react';
import Link from 'next/link';

const SideBar = () => {
    const links = [
        { name: 'Dashboard', url: '/dashboard' },
        { name: 'Users', url: '/dashboard/users' },
        { name: 'Settings', url: '/dashboard/settings' },
        { name: 'Profile', url: '/dashboard/profile' },
    ];

    return (
        <div className="bg-slate-200 w-64 min-h-screen">
            <ul className="p-8">
                {links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <Link href={link.url}>
                            <span className="text-gray-900 p-4">
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