import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import DynamicForm from './DynamicForm';

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };



    

  return (
    <>
      <Button type="primary" onClick={showModal}>
        create event
      </Button>
      <Modal
        title="Create a new event"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DynamicForm />
 
      </Modal>
    </>
  );
};

export default CreateEvent;