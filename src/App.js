import React , { useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Input } from "antd";
import CreateEvent from './components/CreateEvent';
import Header from './components/Header';
import ConfigPlanning from './components/ConfigPlanning';
import {DeleteOutlined} from '@ant-design/icons'

const { Search } = Input;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
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
              onClick={() => {
                // we trigger the delete function  
                deleteEvent(record.id);
                // we update the data in our application
                setDataSource((pre) => {
                  return pre.filter(event => event.id != record.id)
                })
                setFiltred((pre) => {
                  return pre.filter(event => event.id != record.id)
                })
              }}
              style={{ color: "red", fontSize: "15px" }}
            />
          </>
        );
      }

      
      
      
    },
  ]);
  // delete function using axios delete function 
  const deleteEvent = (id) => {
    axios.delete(`http://localhost:3000/data/${id}`)
    .then(response => {
        alert('Deleted!');
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
}

  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFiltred] = useState([]);
  
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
}, []);

  // const onSearch = (value) => {
  //   setSearchInput(value);
  //   console.log(value);
  //   const filteredData = dataSource.filter((data) => {
  //     return data.title.toLowerCase().includes(searchInput.toLowerCase())
  //   })
  //   console.log(filteredData);
    
  // }


  const searchFunction = (e) => {
    console.log(e);
    let searchInput = e.target.value;
    setSearchInput(searchInput); //  set the value of the search in the setter searchInput 
    const newFilter = dataSource.filter((value) => {
      if (value.title && searchInput && typeof value.title === "string" && typeof searchInput === "string") {
          return value.title.toLowerCase().includes(searchInput.toLowerCase());
      }
      return false;
  });
    // if the searchbar is empty we set all the data else we do the search with the filtered data
    if (searchInput === "") {
      setFiltred(dataSource);
    } else {
      setFiltred(newFilter);
    }
  };


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
            onChange={(e) => searchFunction(e)}
            enterButton
            style={{ width: '25%' }} />

            <CreateEvent setdata={setDataSource} setfilter={setFiltred} data={dataSource} filter={filteredData}/>
            </div>

            <Table loading={loading} columns={columns} dataSource={filteredData}  pagination={{ pageSize: 5 }}/>
          </main>
      </section>

    )
  );
}

export default App;
