import { NavComp } from "./Components/NavComp"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer"

export function Layout() {
    return (
        <>
            <NavComp />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    )
}