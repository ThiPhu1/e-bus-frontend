import Navbar from "components/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className={"container"}>
            <Navbar />
            {children}
        </div>
    );
}