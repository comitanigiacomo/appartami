import React from "react";
import { NavComp } from "./Components/NavComp";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "./Components/Footer";
import './Layout.css';

export function Layout({ isLoggedIn, handleLogout }) {
    return (
        <>
        <main>
            <NavComp isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Outlet context={{ isLoggedIn }} />
            <Footer />
        </main>
        </>
    );
}
