import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
    title: string,
    children: React.ReactNode;
    status: boolean;
    onClose: () => void;
}

export const ModalComponent = ({ children, title, status, onClose }: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal show={status} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            {/* <Modal.Footer> */}
            {/*     <Button variant="primary" onClick={onCreate} disabled={disabled}> */}
            {/*         {btnText} */}
            {/*     </Button> */}
            {/* </Modal.Footer> */}
        </Modal>
    );
};