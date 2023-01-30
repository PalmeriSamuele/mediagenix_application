/* 

react component use for display the create event button and display the modal 

*/
import React, { useState } from 'react';
import { Modal } from 'antd';
import DynamicForm from './DynamicForm';

const CreateEvent = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      <button className='createevent-btn rounded' style={{color: 'white', backgroundColor: 'rgba(31, 30, 30, 0.909) '}} onClick={showModal}>
        create event
      </button>
      <Modal
        title="Create a new event"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel} 
      >
      <DynamicForm counter={props.counter} setcounter={props.setcounter} schema={props.schema}/>
 
      </Modal>
    </>
  );
};

export default CreateEvent;