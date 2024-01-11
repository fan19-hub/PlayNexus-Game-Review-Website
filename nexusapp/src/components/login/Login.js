import "./Login.css";
import { useState, useEffect } from 'react'  
import { Link, useNavigate } from "react-router-dom"  
import api from '../../api/axiosConfig'; 
import Header from "../header/Header.js";

const Login = () => {
    // To resignin, remove the old user token used
    localStorage.setItem("userkey", "");


    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const tryLogin = async () => {
      if (userName === '') {
        alert('Please enter your username');
      } 
      else if (userPwd === '') {
        alert('Please enter your password');
      } 
      else {
          try{
            debugger
            const response = await api.post('/api/v1/login', { "userName":userName, userPwd });
            if("key" in response.data){
              localStorage.setItem("userkey", response.data["key"]);
              setUserName('');
              setUserPwd('');
              navigate(`/`);
            }
            else{
              alert(response.data["msg"]);
            }
            // bmfzkkw
            // UK#f405m#&
          }
          catch(err){
              console.log(err);
              alert('Server Disconnected');
          }
      }
    };
    const ToSignup =async ()=>{
      navigate(`/signup`);
    }

    return (
      <div>
      <Header/>
      <div className="background" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_52683-66117.jpg?w=996&t=st=1700201506~exp=1700202106~hmac=584b782e34941423408c68320c1a6cc5302e221bfaa19892876307aba99a814e")` }}>
          <section className="board" >
            {/* <img src={require('./3206784.jpg')} alt="logo"></img> */}
            <img src="https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg?w=740" className="round1" />
          
            <section className="loginform">
                <h2 className="signintitle">Sign In </h2>

            
                <section className="loginform_2">
                    <label className="label" htmlFor="username" >Username</label>
                    <input className="inputbar" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}  />
                    <label htmlFor="password" className="label">Password</label>
                    <input className="inputbar" type="password" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
                </section>
                <section className="buttons">
                    <section>
                      <button type="submit" className="loginbutton"  onClick={() => tryLogin()}>Login
                      </button>
                    </section>
                    <section>
                      <button type="submit" className="signupbutton" onClick={() => ToSignup()}>Sign Up
                      </button>
                    </section>
                </section>
                

            </section>
          </section>
      </div>
      </div>
    );
};

export default Login;
