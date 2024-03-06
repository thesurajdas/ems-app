import Link from 'next/link';

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