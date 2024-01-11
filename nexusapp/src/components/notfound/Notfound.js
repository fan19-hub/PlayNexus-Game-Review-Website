import React, { useEffect } from 'react'
import "./Notfound.css"
import Header from "../header/Header.js";

const Notfound = () => {
  return (
    <div>
    <Header/>
    <div className="msg-board">
      <h1>404</h1>
      <p>Oops! The page you're looking for could not be found.</p>
      <p>Go back to <a href="/">homepage</a>.</p>
    </div>
    </div>
  )
}

export default Notfound