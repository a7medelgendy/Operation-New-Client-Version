import React, { useState, useEffect } from "react";
import Layout from "./components/Layout.js";
import Login from "./components/Login";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");

  /*   useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []); */

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/message",
      params: {
        foo: "bar",
      },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then((res) => {
      setMessage(res.data.message);
    });
  });

  return (
    <div className="App">
      <Layout />
      <h1>{message}</h1>
      <Login />
    </div>
  );
}
