import {theme} from "antd";
import {AuthHome} from "~/screens/AuthHome";
import {UnAuthHome} from "~/screens/UnAuthHome";
import React from "react";

export default function Favourites() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (<div
        style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            flex: 1
        }}
    >
        <h1>Favourite</h1>
    </div>);
}
