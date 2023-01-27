import React, { useState } from 'react';

const dynamic_form = () => {
    const [schema, setSchema] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:3000/schema';
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(schema);
            
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default dynamic_form;