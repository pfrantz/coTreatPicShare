import React, { useState } from 'react';
import {Divider, Form, Input, Modal, notification, Typography} from 'antd';
import { useAuth } from '~/context/AuthContext';

import type {DataType} from "~/types/dataType";

export interface SharePicDialogProps {
    isModalOpen: boolean;
    handleOk: (data: DataType) => void;
    handleCancel: () => void;
}

export const SharePicDialog : React.FC<SharePicDialogProps> = ({ isModalOpen, handleOk, handleCancel }) => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const {fetchWithAuth} = useAuth();

    const handleShare = async (url:string, title:string) => {
        try {
            const response = await fetchWithAuth('/api/v1/media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, title }),
            });

            handleOk(response);
        } catch (error) {
            notification.error({message:'Failed to share picture', description: error.message});
            console.error(error.stack);
        }

    }

    const [form] = Form.useForm();

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
               setUrl(values.url);
               setTitle(values.title);
               handleShare(values.url, values.title)
               form.resetFields();
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const FormGuts: React.FC<any> = ()=> {
        return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <Form form={form} style={{ marginTop: '20px', width: '80%' }}>
                <Form.Item name="url" rules={[{ required: true, message: 'Please enter a valid picture URL' }]}>
                    <Input
                        placeholder="New Picture URL"
                        value={url}

                    />
                </Form.Item>
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter a title for your picture' }]}>
                    <Input
                        placeholder="Title"
                        value={title}

                    />
                </Form.Item>
            </Form>
        </div> );
    }

    return (
        <>
            <Modal
                title="Share A New Picture"
                open={isModalOpen}
                onOk={handleCreate}
                okText="Share"
                onCancel={handleCancel}
                centered={true}
            >
              <Divider/>
                 <FormGuts/>
              <Divider/>
            </Modal>
        </>
    );
};
