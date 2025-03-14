import React from "react";
import {Layout, theme, Typography} from "antd";
import { AuthLeftMenu } from "~/components/AuthLeftMenu";
import { AuthRightMenu} from "~/components/AuthRightMenu";
import { UnAuthRIghtMenu } from "~/components/UnauthRightMenu";
import { SharePicDialog } from "~/components/SharePicDialog";
import { useAuth } from "~/context/AuthContext";
import {useLocation, useNavigate} from "react-router";
import {useModal} from "~/hooks/useModal";
import type {DataType} from "~/types/dataType";

const { Title } = Typography;

interface LayoutInterface {
}

const { Header, Content } = Layout;

const items = [
    {
        key: "/",
        label: "Home",
    },
    {
        key: "/favourites",
        label: "Favorite",
    },
];

export const MainLayout: React.FunctionComponent<LayoutInterface> = (props) => {
    const {isAuthenticated, currentUser} = useAuth();

    const location = useLocation()
    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { isModalOpen, openModal, closeModal, modalContent } = useModal();

    const { children } = props;

    const sharePicHandlerOk = (data: DataType) => {
        closeModal();

        // TODO: this is a hack - we really need to send a message to the card list to refresh itself
        // we need a pub / sub model here to save a trip to the server.
        if (location.pathname === '/'){
            navigate(0);
        }
    }

    const sharePicHandler = () => {
        openModal(<SharePicDialog
            isModalOpen={true}
            handleOk={sharePicHandlerOk}
            handleCancel={closeModal}
        />)

    }
    return (
        <Layout style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: "100vh" }}>
            <Header style={{ background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 1, width:'100%' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Title level={2} style={{ margin: 0 }}>PicShare</Title>
                    {isAuthenticated ? <AuthLeftMenu location={location as Location}  items={items}/> : null}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {isAuthenticated ? <AuthRightMenu username={currentUser || ''} sharePicHandler={sharePicHandler}/> : <UnAuthRIghtMenu />}
                </div>
            </Header>
            <Content style={{ flex: 1, padding: '48px', display: "flex", flexDirection: "column" }}>
                {children}
                {modalContent}
            </Content>
        </Layout>
    );
};
