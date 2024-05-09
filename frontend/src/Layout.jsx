import { NavComp } from "./Components/NavComp"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer"
import './Layout.css'

export function Layout() {
    return (
        <>
        <main>
            <NavComp />
            <Outlet/>
            <Footer />
        </main>
        </>
    )
}