import "./signup.css";
import { useState, useEffect } from 'react'  
import { Link, useNavigate } from "react-router-dom"  
import api from '../../api/axiosConfig'; 
import Header from "../header/Header";

const Signup = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userAge, setUserAge] = useState("");
    const [userLanguage, setUserLanguage] = useState("");
    
    const trysignup = async () => {
      if (userName === '') {
        alert('Please enter your username');
      } 
      else if (userPwd === '') {
        alert('Please enter your password');
      } 
      else if (userEmail === '') {
        alert('Please enter your email');
      }
      else if (userGender === '') {
        alert('Please enter your gender');
      }
      else if (userAge === '') {
        alert('Please enter your age');
      }
      else if (userLanguage === '') {
        alert('Please enter your language');
      }
      else {
          try{
            debugger
            const response = await api.post('/api/v1/signup', { userName, userPwd,userEmail,userGender, userAge,userLanguage });
            setUserName('');
            setUserPwd('');
            setUserEmail('');
            setUserGender('');
            setUserAge('');
            setUserLanguage('');
            navigate(`/signup`);
          
            // bmfzkkw
            // UK#f405m#&
          }
          catch(err){
              console.log(err);
              alert('Server Disconnected');
          }
      }
    };

    return (
      <div>
      <Header/>
      <div className="background" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_52683-66117.jpg?w=996&t=st=1700201506~exp=1700202106~hmac=584b782e34941423408c68320c1a6cc5302e221bfaa19892876307aba99a814e")` }}>

      <section className="signupform cf">
              <section className="signupform_2 cf">
                  
                  <label className="signuplabel" htmlFor="username" >Username</label>
                  <input className="signupinput" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}  />
                  
                  <label htmlFor="password" className="label">Password</label>
                  <input className="signupinput" type="password" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />

                  <label className="signuplabel" htmlFor="email" >Email</label>
                  <input className="signupinput" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}  />
                  
                  <label className="signuplabel" htmlFor="gender" >Gender</label>
                  <select className="signupinput" value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                  </select>
                  
                  <label className="signuplabel" htmlFor="age" >Age</label>
                  <input className="signupinput" type="number" value={userAge} onChange={(e) => setUserAge(e.target.value)}  />
                  
                  <label className="label" htmlFor="language">Language</label>
                  <select className="signupinput" value={userLanguage} onChange={(e) => setUserLanguage(e.target.value)}>
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="french">Italian</option>
                  </select>
                  
                  
              </section>
              <section className="signupbuttons cf">
            
                  <section>
                    <button type="submit" className="signupform_5 cf" onClick={() => trysignup()}>Sign Up
                    </button>
                  </section>
              </section>
              

          </section>
      </div>
      </div>
    );
};

export default Signup;
