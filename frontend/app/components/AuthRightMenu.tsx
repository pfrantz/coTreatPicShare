import React from "react";
import {Button,  Typography} from "antd";
import {useNavigate} from "react-router";
import {useAuth} from "~/context/AuthContext";

const { Text } = Typography;

interface AuthHeaderRightProps {
    username: string;
}

export const AuthRightMenu: React.FunctionComponent<AuthHeaderRightProps> = ({ username }) => {
    const navigate = useNavigate();
    const { logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <>
            <Button type="primary" style={{ marginRight: 10 }}>Share Pic</Button>
            <Text style={{ marginRight: 10 }}>{username}</Text>
            <a onClick={handleLogout} style={{ marginRight: 10 }}>Log out</a>
        </>
    );
};
