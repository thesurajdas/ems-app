import Image from 'next/image';
import { useState } from 'react';
import { IoMdArrowDown } from "react-icons/io";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const {data: session}= useSession();
    console.log(session)
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <div className="flex justify-between items-center w-full m-2">
                <div className="flex-initial w-80"></div>
                <div onClick={(e) => setDropdown(!dropdown)} className="flex-none h-fit shadow bg-slate-200 dark:bg-gray-700 cursor-pointer rounded-xl">
                    <span className="flex items-center p-4">
                        <Image src="/avatar.jpg" alt="avatar" width={24} height={24} className="mr-2 rounded-full" />
                        <span className="text-sm">{session?.user?.name}</span>
                        <IoMdArrowDown className="ml-2" width={24} height={24} />
                    </span>
                    {dropdown && (
                        <div className="absolute bg-slate-200 dark:bg-gray-700 w-fit">
                            <div className="bg-slate-200 dark:bg-gray-700 dark:text-white py-2 px-4">My Profile</div>
                            <Link href="/dashboard/admit"> <div className="bg-slate-200 dark:bg-gray-700 dark:text-white py-2 px-4">My Admit</div></Link>
                            <div className="bg-slate-200 dark:bg-gray-700 dark:text-white py-2 px-4">Settings</div>
                            <div onClick={()=>signOut()} className="bg-slate-200 dark:bg-gray-700 dark:text-white py-2 px-4">Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
