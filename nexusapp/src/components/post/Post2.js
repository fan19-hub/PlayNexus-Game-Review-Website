import "./Post.css";
import { useEffect, useRef, useState } from 'react';
import Pagination from "../Pagination";
import LikeButton from '../LikeButton';
import api from "../../api/axiosConfig"
import React from 'react'
import Header from "../header/Header.js";
const Post2 = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [recpost,setpost] = useState([]);
    const [likes, setLikes] = useState(0);
    const getPost =  async () =>{
      try{
        // Makes an API request to fetch a list of games and updates the games state variable with the response data.
        // debugger
        const response = await api.get('/api/v1/post2');
        // debugger
        setpost(response.data);
        // usergame=response.data;
      }
      catch(err){
        console.log(err);
      }
    }
    useEffect(() => {getPost();},[])
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = recpost.slice(startIndex, endIndex);

    function handlePageChange(pageNumber) {
      setCurrentPage(pageNumber);
  }
    // debugger
    return (

      <div>
        <Header/>
          {currentItems.map((item) => ( 
            <section className="postinform cf"> 
              <label className="label" htmlFor="username" >{item.Username}</label> 
              <span className="timestamp">{new Date(item.time).toLocaleString()}</span>
              <h2>{item.PostContent}</h2> 
              <LikeButton postId={item.PostID} initialLikes={item.Likes} />
            </section> ))} 
          <Pagination
            itemsPerPage={itemsPerPage} 
            recpost={recpost} 
            onPageChange={handlePageChange} />
      </div>
    );
};
export default Post2


