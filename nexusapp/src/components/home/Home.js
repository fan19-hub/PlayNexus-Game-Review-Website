import "./Home.css"
import Carousel from "react-material-ui-carousel"
import {Paper} from "@mui/material"
import React, { useEffect, useState } from 'react'
import { Button, Row,Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import api from '../../api/axiosConfig'; 
import Header from "../header/Header"


const Home = ({games}) => {
  
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn]=useState(0);
    const [personalRecommends, setPersonalRecommends]=useState([]);
    const get_recommends =  async () =>{
        try{
          // Makes an API request to fetch a list of games and updates the games state variable with the response data.
          const userkey = localStorage.getItem("userkey");
          const response0 = await api.get('/checklogin', {
            headers: {
              Authorization: `Bearer ${userkey}`,
            },
          });
          setLoggedIn(response0.data["loggedin"]);
          debugger
          if(response0.data["loggedin"]){
              const response1 = await api.get('/api/v1/personalrecommend', {
                headers: {
                  Authorization: `Bearer ${userkey}`,
                },
              });
              setPersonalRecommends(response1.data);
          }
        }
        catch(err){
          console.log(err);
        }
    }

    function gotoReviews(gameId)
    {
        navigate(`/Reviews/${gameId}`);
    }

    useEffect(() => {get_recommends();},[])
    return (
        <div>
            <Header/>
            <Carousel className="homesection1">
            {
                games?.map((game) => {
                    return(
                        <Paper key={game.GameID}>
                            {/* Each child in a list should have a unique "key" prop */}
                            <div className="game-card-container" style={{"box-shadow":"rgb(0,0,0,0)"}}>
                                <div className="game-card" style={{ backgroundImage: `url(${game.BackgroundImage})` }}>
                                    {/* game Card Background */}
                                    <div className="game-detail">
                                        <div className="game-poster">
                                            {/* Picture Discription */}
                                            <img src={game.PosterImage} alt="" />
                                        </div>
                                        {/* <div className="game-title">
                                            {/* Text Discription */}
                                            {/* <h4>{game.GameName}</h4> */}
                                            {/* <img src={game.PosterImage} alt="" /> */}
                                        {/* </div>  */}
                                        <div className="game-review-button-container">
                                            <h4>{game.GameName}</h4>
                                            <Button variant ="info" onClick={() => gotoReviews(game.GameID)} >Reviews</Button>
                                        </div> 
                                    </div>
                                </div>
                            </div>  
                        </Paper>
                    )
                })
            }
            </Carousel>

        {loggedIn?
        <section className="homesection2">
            <h2 style={{"padding-bottom":"10px"}}>Games On Sale For You!</h2>
            <Row className="recgame-list">
                {personalRecommends?.map((game) => (
                    <Col className="recgame">
                        <Row>
                        <a className="recgame_a" href={`/Reviews/${game.GameID}`}>
                            <img className="recgame_img" src={game.PosterImage} alt="No Recommendation For Now"/>
                        </a>
                        </Row>
                        <Row>
                            <a style={{"text-decoration":"none","color":"black"}} href={`/Reviews/${game.GameID}`}>
                            <h5 className="recgame_title">{game.GameName}</h5>
                            </a>
                        </Row>

                    </Col>
                ))}
            </Row>
        </section>
        :
        <div/>
        }

        </div>

    )
}

export default Home

