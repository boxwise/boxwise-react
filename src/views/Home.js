import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Home({authObject}) {
  const [data, setData] = useState({})

  useEffect(() => {
    async function fetchData(){
    const result = await axios(
      'http://localhost:5000/api/public',
    );
    setData(result.data);
  }
  fetchData();
  }, []);

  return (
    <div>
      <h2 className ='w-screen flex justify-center p-2 bg-blue-500' >Welcome to boxwise!</h2>
      <p>{data.message}</p>
      <h2>The following links are private, so you must be logged in to see them:</h2>
      <Link to='/org/abc'>Org ABC</Link>
      <br />
      <Link to='/org/abc/base/base1'>Org ABC, Base 1</Link>
      <br />
      <Link to='/org/abc/base/base1/find-box'>Org ABC, Base 1, scan a box</Link>
    </div>
  )
}

export default Home;
