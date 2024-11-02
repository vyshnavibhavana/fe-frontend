import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import Sidebar from "./Sidebar";

export const Layout = (props) => {
    const history = useNavigate();
    const { pathname } = useLocation();

    React.useEffect(() => {
        let tmp = JSON.parse(localStorage.getItem('user')) || {};
        if (!tmp.token) {
            history("/auth/login")
        }
        // if (pathname != '/' && pathname != '/dashboard') {

        //     if (!checkPageAccess(pathname, globalData)) {
        // history("/auth/login")
        //     }
        // }
    }, [pathname])
    return (
        <div style={{ width: '100%', display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10px', width: '100%' }}>
                {props.children}
            </div>
        </div>
    )
}