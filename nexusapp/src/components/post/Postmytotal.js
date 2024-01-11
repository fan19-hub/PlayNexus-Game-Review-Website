import "./Post.css";
import { useEffect, useRef, useState } from 'react';
import api from "../../api/axiosConfig.js"
import React from 'react'
import Header from "../header/Header.js";
const Postmytotal = () => {
    const itemsPerPage = 5;
    const [recpost,setpost] = useState([]);
    // debugger
    const getPost =  async () =>{
      try{
        // Makes an API request to fetch a list of games and updates the games state variable with the response data.
        // debugger
        const userkey = localStorage.getItem("userkey");
        const response = await api.get('/api/v1/postmytotal',{
          headers: {
            Authorization: `Bearer ${userkey}`,
          }
        });
        debugger
        setpost(response.data);
        // usergame=response.data;
      }
      catch(err){
        console.log(err);
      }
    }
    useEffect(() => {getPost();},[])
    

    debugger
    return (
      <div>
        <Header/>
          <h1>My posts</h1>
          {recpost?.map((item) => ( 
          <section className="postinform cf"> 
              <label className="label" htmlFor="username" >{item.Username}</label> 
              <span className="timestamp">{new Date(item.time).toLocaleString()}</span>
              <h2>{item.PostContent}</h2> 
              <span>Likes: {item.Likes}</span>       
          </section> 
         ))} 
      </div>
    );
};
export default Postmytotal


