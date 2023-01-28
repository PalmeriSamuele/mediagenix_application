import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import DynamicForm from './DynamicForm';

const CreateEvent = (props) => {
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
      <button className='createevent-btn rounded' style={{color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.83)'}} onClick={showModal}>
        create event
      </button>
      <Modal
        title="Create a new event"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      <DynamicForm setdata={props.setdata} setfilter={props.setfilter} data={props.data} filter={props.filter}/>
 
      </Modal>
    </>
  );
};

export default CreateEvent;