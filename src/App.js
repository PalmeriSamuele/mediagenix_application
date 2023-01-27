import React , { useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Input } from "antd";
import CreateEvent from './components/CreateEvent';

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
}, []);

  const onSearch = (value) => {
    setSearchInput(value);
    setColumns(prevState => {
      return prevState.map(col => {
        if(col.title === 'Title') {
          return {...col, filteredValue: [value]};
        }
        return col;
      });
    });
  }
  return (
    loading ? (
      'Loading'
    ) : (
      <div className='container p-3 mb-3'>
        <div className='d-flex justify-content-evenly'>
          <Search
            placeholder="input search text"
            allowClear
            style={{ width: 200 }}
            onSearch={value => setSearchInput(value)}
          />
          <CreateEvent />
        </div>

        <Table loading={loading} columns={columns} dataSource={dataSource}  pagination={{ pageSize: 10 }}/>
      </div>
    )
  );
}

export default App;
