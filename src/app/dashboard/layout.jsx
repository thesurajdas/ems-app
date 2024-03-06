import SideBar from "@/components/SideBar";

const Layout = ({ children }) => {

    // Add your layout logic here

    return (
        <div className="flex">
            <header>
                {/* Add your header content here */}
                <SideBar />
            </header>
            <main className="m-7">
                {children}
            </main>
            <footer>
                {/* Add your footer content here */}
            </footer>
        </div>
    );
};

export default Layout;