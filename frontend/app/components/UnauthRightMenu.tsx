import React from "react";
import { Button } from "antd";
import {useNavigate} from "react-router";

export const UnAuthRIghtMenu: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Button type="primary" onClick={handleLogin}>Login</Button>
    );
};
