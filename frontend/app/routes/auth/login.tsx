import React, { useState } from 'react';
import { Button, notification, Input, Typography, Form, theme, Space } from 'antd';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router';
const { Title, Text } = Typography;


export default function Login() {
    const [username, setUsername] = useState('');
    const { login, fetchWithAuth } = useAuth();
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //const [api, contextHolder] = notification.useNotification();

    const handleLogin = async () => {
        try {
            const response = await fetchWithAuth('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const { token, profile } = response;
            login(profile.username, token);
            navigate('/');
        } catch (error) {
            notification.error({message:'Login failed', description: error.message});
            console.error(error.stack);
        }
    };

    return (
        <div
            style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 164px)'
            }}
        >
            <div style={{ width: 250, textAlign: 'center' }}>
                <Title level={2}>Pic Share</Title>
                <Text style={{ padding: '10px' }}>Login in to start sharing</Text>
                <Form onFinish={handleLogin} style={{ marginTop: '20px' }}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onPressEnter={handleLogin}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
