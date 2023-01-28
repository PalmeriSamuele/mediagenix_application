import React , { useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Input } from "antd";
import CreateEvent from './components/CreateEvent';
import Header from './components/Header';


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
  ]);

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


  const handleFilter = (e) => {
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
        <main className='container '>
          <div className='d-flex justify-content-evenly'>
            <Search
              placeholder="input search text"
              allowClear
              style={{ width: 200 }}
              // onSearch={{(e) => handleFilter(e)}}
              onChange={(e) => handleFilter(e)}
            />
            <CreateEvent />
            </div>

            <Table loading={loading} columns={columns} dataSource={filteredData}  pagination={{ pageSize: 5 }}/>
          </main>
      </section>

    )
  );
}

export default App;
