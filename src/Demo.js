import React, { useState } from 'react';
import axios from 'axios';
import 'animate.css';
import './Demo.css';

function Demo() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  const handlePost = () => {
    axios.post("http://localhost:5000/data", { field1, field2 })
      .then(() => {
        alert("Data added successfully");
        setField1('');
        setField2('');
        handleGet();
      })
      .catch((err) => {
        alert(`Failed to add data: ${err}`);
      });
  };

  const handleGet = () => {
    axios.get("http://localhost:5000/data")
      .then((res) => {
        setDatas(res.data);
      })
      .catch(() => {
        alert("Failed to fetch data");
      });
  };

  const handleEdit = (data) => {
    setEdit(true);
    setField1(data.field1);
    setField2(data.field2);
    setId(data.id);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/data`, { id, field1, field2 })
      .then(() => {
        alert("Data updated successfully");
        setField1('');
        setField2('');
        setEdit(false);
        handleGet();
      })
      .catch((err) => {
        alert(`Failed to update data: ${err}`);
      });
  };

  const handleDelete = (userid) => {
    axios.delete(`http://localhost:5000/data?id=${userid}`)
      .then(() => {
        alert("Data deleted successfully");
        handleGet();
      })
      .catch(() => {
        alert("Failed to delete data");
      });
  };

  return (
    <div>
      <h1 className="head1 animate__animated animate__fadeInDown">Data Manager</h1>
      <form>
        <div id='label_input'>
  <label htmlFor="field1">Field1:</label>
  <input
    id="field1"
    type="text"
    placeholder="Enter Field 1"
    value={field1}
    onChange={(e) => setField1(e.target.value)}
  />
  </div>

  <div id='label_input'>
  <label htmlFor="field2">Field2:</label>
  <input
    id="field2"
    type="text"
    placeholder="Enter Field 2"
    value={field2}
    onChange={(e) => setField2(e.target.value)}
  />
  </div>
  <button type="button" onClick={edit ? handleUpdate : handlePost}>
    {edit ? 'Update' : 'Add'}
  </button>
</form>

      <button onClick={handleGet}>Show Data</button>
      <ul>
        {datas.map((data, index) => (
          <li key={index}>
            {data.field1} - {data.field2}
            <button onClick={() => handleEdit(data)}>Edit</button>
            <button onClick={() => handleDelete(data.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Demo;
