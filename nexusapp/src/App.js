import './App.css'; //This imports a CSS file to style the app.
import Header from './components/header/Header';
import api from './api/axiosConfig'; //This imports an API instance from the axiosConfig.js file in the api directory.
import {useState, useEffect} from 'react'; //This imports the useState and useEffect hooks from the React library.
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import Trailer from './components/trailer/Trailer';
import Notfound from './components/notfound/Notfound';
import Reviews from './components/reviews/Reviews';
import Root from './components/root/root.js';
import Test from './components/test/test.js';
import Search from "./components/search/search.js";
import Signup from "./components/signup/signup.js";
import History from "./components/history/history.js";
import Post from "./components/post/Post.js";
import Post2 from "./components/post/Post2.js";
import Mepost from "./components/post/Mepost.js";
import Postmytotal from "./components/post/Postmytotal.js";
import Profile from "./components/profile/profile.js";
global.loginkey = '';

function App() {
  //This is the main component of the web app

  // Initialize the login token
  sessionStorage.setItem("userkey", "");

  //Define state variables using the useState hook
  const [games,setGames] = useState([]);

  //Define a function called getMovies. "async" is a keyword in this code snippet. It is used to define an asynchronous function, which allows the function to use the "await" keyword to wait for promises to be resolved before continuing execution.
  const getMovies =  async () =>{
    try{
      // Makes an API request to fetch a list of games and updates the games state variable with the response data.
      
      const response = await api.get("/api/v1/recommend");
      // Assuming you have the local file path stored in a variable

      setGames(response.data)
    }
    catch(err){
      console.log(err);
    }
  }

  // The useEffect hook is used to call the getMovies function once when the component is mounted.
  useEffect(() => {getMovies();},[])

  return (
    <div className="App">
        <Routes>
          <Route path="/search/:initialkeywords" element={<Search/>}></Route>
          <Route path="/test" element={<Test/>}></Route>
          <Route path="/root" element={<Root/>}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/" element={<Home games={games}/>}></Route>
          <Route path="*" element={<Notfound/>}></Route>
          <Route path="/Reviews/:GameID" element ={<Reviews />}></Route>
          <Route path="/login" element ={<Login />}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/history" element={<History/>}></Route>
          <Route path="/popular_post" element ={<Post/>}></Route>
          <Route path="/latest_post" element ={<Post2/>}></Route>
          <Route path="/write_a_post" element ={<Mepost/>}></Route>
          <Route path="/my_total_post" element ={<Postmytotal/>}></Route>
          <Route path="/profile" element ={<Profile/>}></Route>
        </Routes>
    </div>
  );
}

export default App;




