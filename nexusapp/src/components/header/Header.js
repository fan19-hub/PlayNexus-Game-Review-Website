import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserCircle  } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"
import { useState, useMemo, useCallback, useEffect} from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import DataListInput from 'react-datalist-input';
import api from '../../api/axiosConfig'; 
import 'react-datalist-input/dist/styles.css'
import "./Header.css"

const Header = () => {
    const [keywords, setKeywords] = useState("");
    const [profile, setProfile] = useState("");
    const [loggedIn, setLoggedIn]=useState(0);
    const navigate = useNavigate();
    const options = [
        { name: 'MineCraft' },
        { name: 'Star War' },
        { name: 'GTA' },
        { name: 'One Piece' },
        { name: 'It Takes Two' },
        { name: 'OverCooked' }
      ];   
    
    const getUser =  async () =>{
      try{
        // Makes an API request to fetch a list of games and updates the games state variable with the response data.
        const userkey = localStorage.getItem("userkey");
        const response0 = await api.get('/checklogin', {
          headers: {
            Authorization: `Bearer ${userkey}`,
          },
        });
        setLoggedIn(response0.data["loggedin"]);
        if(response0.data["loggedin"]){
            const response1 = await api.get('/user', {
              headers: {
                Authorization: `Bearer ${userkey}`,
              },
            });
            setProfile(response1.data[0]);
        }
      }
      catch(err){
        console.log(err);
      }
    }

    // Function Definition
    function gotoLogin(){ navigate(`/login`);}
    function searchInput(event){
        if (event.key === 'Enter') {
            navigate(`/search/${keywords}`);
            console.log(keywords);
        }
    }
    
    const onSelectHistory = useCallback((selectedItem) => {   // The onSelect callback function is called if the user selects one option out of the search history.
      debugger
      console.log('selectedItem', selectedItem);
      setKeywords(selectedItem.value)
      debugger
    }, []);
  
    const searchHistory = useMemo(
      () =>
        options.map((option) => ({
          id: option.name,
          value: option.name,
        })),
      [],
    );
    
    function onSelectItem(event) {
      console.log(`Selected item: ${event.target.value}`);
    }
    useEffect(() => {getUser();},[])

    return (
    <Navbar bg="black" variant="dark" expand="lg">

        <Container fluid>
            <Navbar.Brand href="/" >
                <img src={"https://raw.githubusercontent.com/fan19-hub/fa23-cs411-team026-LADYS/main/icon.png"} alt="PlayNexus" style={{ height: '60px', marginRight: '5px' }} />
            </Navbar.Brand>

             <DataListInput className="search-bar" placeholder="Search games!" items={searchHistory}  onSelect={onSelectHistory} onKeyDown={searchInput} onChange={(e) => setKeywords(e.target.value)} />
            

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px' }}
                    navbarScroll>
                </Nav>
                <NavLink className ="nav-link home" to="/" style={{"color":'lightgrey'}}>Home</NavLink>
                <NavLink className ="nav-link home" to="/popular_post" style={{"color":'lightgrey'}}>Popular posts</NavLink>
                <NavLink className ="nav-link home" to="/latest_post" style={{"color":'lightgrey'}}>Latest posts</NavLink>
                {profile["active_user"]? <img src="https://p.kindpng.com/picc/s/701-7014873_transparent-vip-png-vip-icon-png-png-download.png" alt="" style={{"width":"40px","height":"40px","border-radius":"100%"}}/> 
                :<div/>
                }
                {(loggedIn)?  <div/>
                :
                <div className="login-button-container">
                    <Button className="mx-2" onClick={() => gotoLogin()} style={{ backgroundColor: "black", color: "white", border: "none" }}> Login </Button>
                </div>
                }   
            </Navbar.Collapse>
            {loggedIn?
                <Dropdown onChange={onSelectItem}>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{"background-color":"transparent", "border":"0px"}}>
                    {( profile["Photo"]!=null)? 
                      <img src={profile["Photo"]} alt="" style={{"width":"50px","height":"50px","border-radius":"100%"}}/> 
                    :
                      <FontAwesomeIcon className="fa-2x mx-2" icon={faUserCircle} color="white" style={{"width":"50px","height":"50px"}} />
                    }
                    </Dropdown.Toggle>
            
                    <Dropdown.Menu>
                    <Dropdown.Item href="/profile" style={{"text-decoration":"none"}}>Profile</Dropdown.Item>
                    <Dropdown.Item href="/history" style={{"text-decoration":"none"}}>History</Dropdown.Item>
                    <Dropdown.Item href="/my_total_post" style={{"text-decoration":"none"}}>My Posts</Dropdown.Item>
                    <Dropdown.Item href="/write_a_post" style={{"text-decoration":"none"}}>Write a Post</Dropdown.Item>
                    <Dropdown.Item href="/login" style={{"text-decoration":"none"}}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            : 
                <FontAwesomeIcon className="fa-2x mx-2" icon={faUserCircle} color="white" style={{"width":"50px","height":"50px"}} />
            }
        </Container>
    </Navbar>
  );
}

export default Header

{/* <FaSearch id="fasearch-sign"/> */}
// import { FaSearch } from "react-icons/fa";
// faBars,faUserFriends, faVideoSlash
