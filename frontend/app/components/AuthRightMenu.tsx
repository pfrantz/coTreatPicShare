import React from "react";
import {Button,  Typography} from "antd";
import {useNavigate} from "react-router";
import {useAuth} from "~/context/AuthContext";

const { Text } = Typography;

interface AuthHeaderRightProps {
    username: string;
    sharePicHandler: () => void;
}

export const AuthRightMenu: React.FunctionComponent<AuthHeaderRightProps> = ({ username, sharePicHandler }) => {
    const navigate = useNavigate();
    const { logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSharePic = () => {
        if (sharePicHandler)
            sharePicHandler();
    }

    return (
        <>
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleSharePic}>Share Pic</Button>
            <Text style={{ marginRight: 10 }}>{username}</Text>
            <a onClick={handleLogout} style={{ marginRight: 10 }}>Log out</a>
        </>
    );
};
