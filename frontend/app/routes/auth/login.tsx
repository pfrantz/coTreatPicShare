import React, { useState } from 'react';
import { Button, Input, Typography, Form, theme } from 'antd';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

export default function Login() {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogin = () => {
        // Replace 'dummyToken' with actual token logic
        login(username, 'dummyToken');
        navigate('/');
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
