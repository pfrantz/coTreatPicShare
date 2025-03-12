import React, {useEffect, useState} from "react";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from "react-router";

interface AuthLeftMenuInterface {
    location: Location | null;
}

type MenuItem = Required<MenuProps>['items'][number];

export const AuthLeftMenu: React.FunctionComponent<AuthLeftMenuInterface> = (props) => {
    const { location } = props;
    const l = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location?.pathname || '/');

    useEffect(()=>{
        setCurrent(location?.pathname || '/');
    }, [location])

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    const items: MenuItem[] = [
        {
            key: "/",
            label: "Home",
        },
        {
            key: "/favourites",
            label: "Favorite",
        },
    ];

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
