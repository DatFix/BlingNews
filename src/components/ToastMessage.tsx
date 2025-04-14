import React from 'react';
import { Button, message } from 'antd';

const ToastMessage: React.FC = ({ content }: any) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.success(content);
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={success}>
                Display normal message
            </Button>
        </>
    );
};

export default ToastMessage;