"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { LuMenu } from 'react-icons/lu';

const Layout = ({ children }) => {
    const toggleSidebar = () => {
        document.querySelector('header').classList.toggle('hidden');
    };

    return (
        <div className="flex h-screen">
            <header className={`w-64 z-10 hidden lg:block`}>
                <SideBar />
            </header>
            <main className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
                <div className="flex items-center">
                    <button type="button" onClick={toggleSidebar}><LuMenu className="text-2xl" /></button>
                    <NavBar />
                </div>
                {children}
            </main>
            <footer>
            </footer>
        </div>
    );
};

export default Layout;