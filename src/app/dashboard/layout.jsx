import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const Layout = ({ children }) => {

    return (
        <div className="flex h-screen">
            <header className="">
                <SideBar />
            </header>
            <main className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
                <NavBar />
                {children}
            </main>
            <footer>
            </footer>
        </div>
    );
};

export default Layout;