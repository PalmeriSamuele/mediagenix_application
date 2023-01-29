import React , { useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Input } from "antd";
import CreateEvent from './components/CreateEvent';
import Header from './components/Header';
import ConfigPlanning from './components/ConfigPlanning';
import {DeleteOutlined} from '@ant-design/icons'


import { Toast } from 'bootstrap';

const { Search } = Input;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFiltred] = useState([]);
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
            <DeleteOutlined
              id= "liveToastBtn"
              onClick={() => {
         
                // we trigger the delete function  
                deleteEvent(record.id);
              }}
              style={{ color: "red", fontSize: "15px" }}
            />
 
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
          setFiltred(data);
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
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  }

// search function , take the input value trought the event and filter the data using  fitler and includes
  const searchFunction = (e) => {
    let searchInput = e;
    setSearchInput(searchInput); //  set the value of the search in the setter searchInput 
    const newFilter = dataSource.filter((value) => {
      if (value.title && searchInput && typeof value.title === "string" && typeof searchInput === "string") {
          return value.title.toLowerCase().includes(searchInput.toLowerCase());
      }
      return false;
    });
    // if the searchbar is empty we set all the data, else we do the search with the filtered data
    if (searchInput === "") {
      setFiltred(dataSource);
    } else {
      setFiltred(newFilter);
    }
  };

  // we check if the search bar is empty
  const checkNoSearch = (e) => {
    if(e.target.value === ''){
      setSearchInput('')
    }

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
            {/* <Search
              placeholder="input search text"
              allowClear
              style={{ width: 200 }}
              // onSearch={{(e) => handleFilter(e)}}
              onChange={(e) => searchFunction(e)}
            /> */}
            <Search 
            className='enterButton'
            placeholder="input search text" 
            onSearch={(e) => searchFunction(e)}
            onChange={(e) => checkNoSearch(e)}
            enterButton
            allowClear
            style={{ width: '25%' }} />

            <CreateEvent counter={eventCounter} setcounter={setEventCounter} schema={schema}/>
            </div>

            <Table loading={loading} columns={columns} 
            dataSource= { 
              dataSource.filter((value) => {
              if (value.title && searchInput && typeof value.title === "string" && typeof searchInput === "string") {
                  return value.title.toLowerCase().includes(searchInput.toLowerCase());
              }
              return value;
            })}  
            pagination={{ pageSize: 4 }} />

  
          </main>
      </section>

    )
  );
}

export default App;
