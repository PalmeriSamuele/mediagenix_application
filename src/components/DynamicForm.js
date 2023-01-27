import React , { useEffect, useState} from 'react';
import {Form, Button } from "antd";
import FormItem from './FormItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const DynamicForm = (props) => {
    const [schema, setSchema] = useState([]);
    
    useEffect(() => {
        const url = 'http://localhost:3000/schema';

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
               
                setSchema(json);
            
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);
    Date.prototype.getFullMonth = function() {
        const month = this.getMonth()+1
        return month < 10 ? '0'+month : month
    }
    Date.prototype.getFullDate = function(){  // if date single diget add a 0
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
        values = {
            title: values.title,
            type: values.type,
            startDate: startDate_year+'-'+startDate_month+'-'+startDate_day,
            endDate: endDate_year+'-'+endDate_month+'-'+endDate_day,
            description: values.description

        }
        axios.post('http://localhost:3000/data', values)
        .then(response => {
            alert('Saved !')
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        console.log(values);
  
      }
      

    return (
        <Form onFinish={createEvent}>
            {
            schema.map((form)=> (
              <FormItem {...form} />
            ))

            }
            <Button htmlType='submit' type="primary" onClick={createEvent}>
                create
            </Button>
          
        </Form>
    );
};

export default DynamicForm;