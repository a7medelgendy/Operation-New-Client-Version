import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.js';
import Login from './components/Login';
import axios from 'axios';
import { baseUrl } from './shared/staticData.js';

export default function App() {
  const [message, setMessage] = useState('');

  /*   useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []); */

  const funco = () => {
    window.alert('sal;dk;lsakd;l');
    window.alert(baseUrl + '/api/message');
    axios({
      method: 'get',
      url: 'http://10.10.6.162:8000/api/message',
      params: {
        foo: 'bar'
      },
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then((res) => {
      setMessage(res.data.message);
    });
  };
  useEffect(() => {
    funco();
  });

  return (
    <div className='App'>
      <Layout />
      <h1>{message}</h1>
      <Login />
    </div>
  );
}
