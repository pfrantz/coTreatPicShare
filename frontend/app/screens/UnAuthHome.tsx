import React from "react";
import { theme, Typography } from "antd";
import { Link } from "react-router";
import {CardList} from "~/components/CardList";

const { Text } = Typography;


export const UnAuthHome = () => {
    const {
        token: { colorBgContainerDisabled },
    } = theme.useToken();

    const prompt = (
        <div style={{
            marginTop: 20,
            marginBottom: 20,
            padding: 20,
            borderRadius: 8,
            backgroundColor: colorBgContainerDisabled,
            textAlign: "center",
        }}>
            <Text>
                <Link to="/login">login</Link> to start sharing your favourite pictures with others
            </Text>
        </div>
    );

    return (
        <div>
            <CardList prompt={prompt}/>
        </div>
    );
};
