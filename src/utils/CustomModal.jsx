// CustomModal.js
import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({ isOpen, title, children, onOk, onCancel, okText = "Đồng ý", cancelText = "Hủy" }) => {
    return (
        <Modal 
            title={"Xác nhận"} 
            open={isOpen} 
            onOk={onOk} 
            onCancel={onCancel} 
            centered 
            okText={okText} 
            cancelText={cancelText}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
