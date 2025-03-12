import React from "react";
import { Layout, theme, Typography} from "antd";
import { AuthLeftMenu } from "~/components/AuthLeftMenu";
import { AuthRightMenu} from "~/components/AuthRightMenu";
import { UnAuthRIghtMenu } from "~/components/UnauthRightMenu";
import {useAuth} from "~/context/AuthContext";
import {useLocation} from "react-router";

const { Title } = Typography;

interface LayoutInterface {
    header?: React.ReactElement<any>;
}

const { Header, Content } = Layout;

export const MainLayout: React.FunctionComponent<LayoutInterface> = (props) => {
    const {isAuthenticated, currentUser} = useAuth();
    const location = useLocation()

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { children, header } = props;

    return (
        <Layout style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header style={{ background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Title level={2} style={{ margin: 0 }}>PicShare</Title>
                    {isAuthenticated ? <AuthLeftMenu location={location} /> : null}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {isAuthenticated ? <AuthRightMenu username={currentUser || ''} /> : <UnAuthRIghtMenu />}
                </div>
            </Header>
            <Content style={{ flex: 1, padding: '48px', display: "flex", flexDirection: "column" }}>
                {children}
            </Content>
        </Layout>
    );
};
