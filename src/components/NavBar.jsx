import Image from 'next/image';
import { IoMdArrowDown } from "react-icons/io";

export default function NavBar() {
    return (
        <>
            <div className="flex justify-between items-center ">
                <div className="flex-1 p-4">
                    <input className="shadow py-3 px-4 text-black bg-slate-200 dark:bg-gray-700 dark:text-white rounded-xl w-full outline-none" type="search" name="keyword" id="keyword" placeholder="Search..." />
                </div>
                <div className="flex-initial w-80"></div>
                <div className="flex-none rounded-xl p-4 h-fit shadow bg-slate-200 dark:bg-gray-700">
                    <span className="flex items-center">
                        <Image src="/avatar.jpg" alt="avatar" width={24} height={24} className="mr-2 rounded-full" />
                        Suraj Das
                        <IoMdArrowDown className="ml-2" width={24} height={24} />
                    </span>
                </div>
            </div>
        </>
    )
}
