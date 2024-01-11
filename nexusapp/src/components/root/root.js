import React from 'react'; 
import { useState, useEffect } from 'react'         //This imports the useState and useEffect hooks from the React library.
import api from '../../api/axiosConfig';                //This assigns the export of axiosConfig.js to variable "api"
const Root = () => {

  //const [state, setSate] =  useState(initial_value)
  //state is used to hold the values. like the variable
  //setState is a function to set the values of state
  const [games, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //Execute automatically when app starts
  useEffect(() => {
    fetchRecords();
  }, []);

  //Define CRUD functions
  const fetchRecords = async () => {
    const response = await api.get('/api/v1/games');
    setRecords(response.data);
    console.log(response.data);
    // response.data[0]["GameID"]
  };

  const createRecord = async () => {
    await api.post('/api/v1/games', { name, description });
    fetchRecords(); //update games to the newest when the databse is changed
    setName('');    //empty the Name and Description
    setDescription('');
  };

  const updateRecord = async (id) => {
    await api.put(`/api/v1/games/${id}`, { name, description });
    fetchRecords();
    setName('');
    setDescription('');
  };

  const deleteRecord = async (id) => {
    await api.delete(`/api/v1/games/${id}`);
    fetchRecords();
  };

  //JSX for UI design 兼容HTML
  return (
    <div>
      <h1 className='hello'>Nexus</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createRecord}>Create</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {games.map((record) => (
            <tr key={record.id}>
              <td>{record.GameName}</td>
              <td>{record.DetailedDescription}</td>
              <td>
                <button onClick={() => updateRecord(record.GameID)}>Update</button>
                <button onClick={() => deleteRecord(record.GameID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Root;



