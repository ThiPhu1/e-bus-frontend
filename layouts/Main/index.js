import NavBar from "components/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className={"container"}>
            <NavBar />
            {children}
        </div>
    );
}