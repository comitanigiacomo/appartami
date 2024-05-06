import { Navbar } from "./Components/Navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "./Components/Footer"

export function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    )
}