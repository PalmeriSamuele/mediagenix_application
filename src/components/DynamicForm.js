/* 

react component use for generating a dynamic form using ant design from a json file

*/
import React from 'react';
import {Form, Button } from "antd";
import FormItem from './FormItem';
import axios from 'axios';
const DynamicForm = (props) => {
   
    
    Date .prototype.getFullMonth = function() {
        const month = this.getMonth()+1
        return month < 10 ? '0'+month : month
    }
     // if date single diget add a 0
    Date.prototype.getFullDate = function(){  
       
        if (this.getDate() < 10) {
           return '0' + this.getDate();
        }/* w w w  .  j a  v a2 s. c  om*/
        return this.getDate();
     };

    const createEvent = (values) => {
        let startDate_day = new Date(values.startDate['endDate'][0]).getFullDate()
        let startDate_month = new Date(values.startDate['endDate'][0]).getFullMonth()
        let startDate_year = new Date(values.startDate['endDate'][0]).getFullYear()
        let endDate_day = new Date(values.startDate['endDate'][1]).getFullDate()
        let endDate_month = new Date(values.startDate['endDate'][1]).getFullMonth()
        let endDate_year = new Date(values.startDate['endDate'][1]).getFullYear()
        // manipulate the data that they can be use for the database
        values = {
            title: values.title,
            type: values.type,
            startDate: startDate_year+'-'+startDate_month+'-'+startDate_day,
            endDate: endDate_year+'-'+endDate_month+'-'+endDate_day,
            description: values.description

        }
        axios.post('http://localhost:3000/data', values)
        .then(response => {
            props.setcounter(props.counter+1); // event encoutner to make the database call and get the new data
            alert('Saved !')
            // props.setdata({...props.data,...response.data});
            // props.setfilter({...props.filter, ...response.data});
        })
        .catch(error => {
            console.log(error);
        });
        console.log(values);
  
      }
      

    return (
        <Form layout='vertical' onFinish={createEvent}>
            {
            props.schema.map((form)=> (
              <FormItem {...form}  />
            ))

            }
            <Button htmlType='submit' type='primary' onClick={createEvent}>
                create
            </Button>
          
        </Form>
    );
};

export default DynamicForm;