import React, { useState } from 'react';
import {Button, Divider, Form, Input, Modal, Typography} from 'antd';

export interface SharePicDialogProps {
    isModalOpen: boolean;
    handleOk: (url: string, title: string) => void;
    handleCancel: () => void;
}

export const SharePicDialog : React.FC<SharePicDialogProps> = ({ isModalOpen, handleOk, handleCancel }) => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    const handleShare = (url:string, title:string) => {
        handleOk(url, title);
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
