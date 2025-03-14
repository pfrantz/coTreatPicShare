import {useAuth} from "~/context/AuthContext";
import React from "react";
import {AuthHome} from "~/screens/AuthHome";
import {UnAuthHome} from "~/screens/UnAuthHome";

export default function HomeRoute() {
    const {isAuthenticated} = useAuth();

    return(
        <>
            {isAuthenticated ? <AuthHome/> : <UnAuthHome/>}
        </>
    );

}
