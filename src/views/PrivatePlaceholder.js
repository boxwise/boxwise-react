import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    useLocation,
  } from "react-router-dom";
  

function Placeholder({authObject}) {
  const [data, setData] = useState('')

  useEffect(() => {
    async function fetchData(){
      // Auth0 is pretty full-service, so we only have to worry about sending the auth token, and it will take care of the rest
      // no refresh token cookie needed
    const result = await axios(
      'http://localhost:5000/api/private',
      {
        headers: {
          Authorization: `Bearer ${authObject.access_token}`
        }
      }
    );
    setData(result.data);
  }
  fetchData();
  }, [authObject]);



    let { pathname } = useLocation();
  
  
    return (
      <div>
        <h2>I am a private placeholder page for </h2>
        <p>{ pathname }</p>
        <p>Here is some private data:</p>
        <p>{data.message}</p>
      </div>
    )
  }
  
  export default Placeholder;
  