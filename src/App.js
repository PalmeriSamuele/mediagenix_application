import React , { useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Input } from "antd";
import CreateEvent from './components/CreateEvent';
import Header from './components/Header';
import ConfigPlanning from './components/ConfigPlanning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

const { Search } = Input;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [schema, setSchema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventCounter, setEventCounter] = useState(0);
  const [columns, setColumns] = useState([
    {
      title: 'ID',
      dataIndex: "id",
    },
    {
      title:'Title',
      dataIndex:'title',
      filteredValue: [],
      onFilter:(value, record)=>{
        if (value)
        return record.title.includes(value);
      }
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Start date',
      dataIndex:'startDate'
    },
    {
      title:'End date',
      dataIndex:'endDate'
    },
    {
      title:'Description',
      dataIndex:'description'
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (_, record) => {
        return (
          <>
            
            <FontAwesomeIcon icon={faXmark} 
              onClick={() => {

                // we trigger the delete function  
                deleteEvent(record.id);
              }}
              style={{ fontSize: "15px", cursor:'pointer' }}/>
 
          </>
  
          

          
        );
      }

      
      
      
    },
  ]);



  // get the data for the table  using axios get method
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get('http://localhost:3000/data');
          const data = res.data.map(row => ({
              key: row.id,
              id: row.id, 
              title: row.title, 
              type: row.type, 
              startDate: row.startDate, 
              endDate: row.endDate,
              description: row.description
          }));        
          
          setDataSource(data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };
  
    fetchData();
}, [eventCounter]);
  


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

    // delete function using axios delete function 
  const deleteEvent = (id) => {
    axios.delete(`http://localhost:3000/data/${id}`)
    .then(response => {
      setEventCounter(eventCounter+1);
      alert('Event correctement supprimé !');
    })
    .catch(error => {
      console.log(error);
    });

  }

  // set the value of the input to the setter, that it can be use to filter the data, when we use dataBase to do the Table
  const searchFunction = (e) => {
    let searchInput = e;
    searchInput == '' ? setSearchInput('') : setSearchInput(searchInput);
  }

  return (
    loading ? (
      'Loading'
    ) : (
      <section>
        <Header />
        <ConfigPlanning />
        <main className='container '>
          <div className='d-flex justify-content-between p-3'>

            <Search 
            className='enterButton'
            placeholder="Tape a title or a description..." 
            onSearch={(e) => searchFunction(e)}
            onChange={(e) => searchFunction(e)}
            enterButton
            allowClear
            style={{ width: '25%' }} />

            <CreateEvent counter={eventCounter} setcounter={setEventCounter} schema={schema}/>
            </div>

            <Table loading={loading} columns={columns} 
            dataSource= { 
              dataSource.filter((value) => {
                let toSearch = value.title;
                if (value.title && value.description ){
                  toSearch =  value.title+value.description;
                }
              
                if (toSearch && searchInput && typeof value.title === "string" && typeof searchInput === "string") {
                    return toSearch.toLowerCase().includes(searchInput.toLowerCase())
                }
                return value;
            })}  
            pagination={{ pageSize: 5 }} />

  
          </main>
      </section>

    )
  );
}

export default App;
