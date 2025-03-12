import {useAuth} from "~/context/AuthContext";
import {theme} from "antd";
import React from "react";
import {AuthHome} from "~/screens/AuthHome";
import {UnAuthHome} from "~/screens/UnAuthHome";

export default function Home() {
    const {isAuthenticated} = useAuth();

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return(
        <>
            {isAuthenticated ? <AuthHome/> : <UnAuthHome/>}
        </>
    );

}
