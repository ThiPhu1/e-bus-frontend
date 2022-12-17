import NavBar from "components/NavBar";

export default function MainLayout({ children }) {
    return (
        <div className={"container"}>
            <NavBar />
            {children}
        </div>
    );
}