import React from "react";
import {Favourites} from "~/screens/Favourites";
import {useAuth} from "~/context/AuthContext";
import {  Navigate } from "react-router";

export default function FavouritesRoute() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {(isAuthenticated) ? <Favourites/> : <Navigate to="/login"/>}
        </>
    )
}
