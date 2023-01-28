import React , { useEffect, useState} from 'react';
import { Form , Button, DatePicker , Input , Select } from "antd";

const FormItem = ({ component, label, required, name , options}) => {
    const { RangePicker } = DatePicker;

    const dateFormat = 'DD/MM/YYYY';
    const componentMapping = {
        text: Input,
        select: Select,
        textarea: Input,
        range_picker: RangePicker,
      } 
      
    const Component = componentMapping[component];
    return (
        <Form.Item label={label} name={name} required={Boolean(required)}  >
            <Component required={Boolean(required)} options={options} placeholder={name+' ...'} format={dateFormat} style={{width: '100%'}}/>
        </Form.Item>
    );
};

export default FormItem;