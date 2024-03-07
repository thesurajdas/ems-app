import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const Layout = ({ children }) => {

    return (
        <div className="flex">
            <header className="">
                <SideBar />
            </header>
            <main className="m-8 flex-1">
                <NavBar />
                {children}
            </main>
            <footer>
            </footer>
        </div>
    );
};

export default Layout;