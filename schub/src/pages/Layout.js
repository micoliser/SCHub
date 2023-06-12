import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
        <header>
            <h2>SC Hub</h2>
            <p>API {'{ }'}</p>
        </header>
        <Outlet />
        </>
    )
}

export default Layout