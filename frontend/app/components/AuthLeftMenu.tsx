import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from "react-router";

interface AuthLeftMenuInterface {
    location: Location | null;
    items: MenuProps['items'];
}

export const AuthLeftMenu: React.FunctionComponent<AuthLeftMenuInterface> = (props) => {
    const { location, items } = props;
    const l = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location?.pathname || '/');

    useEffect(() => {
        setCurrent(location?.pathname || '/');
    }, [location]);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <Menu
            mode="horizontal"
            style={{ flex: 1, minWidth: 200 }}
            items={items}
            onClick={onClick}
            selectedKeys={[current]}
        />
    );
};
