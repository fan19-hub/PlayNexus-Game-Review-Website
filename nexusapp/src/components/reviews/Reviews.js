import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axiosConfig"
import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import Header from "../header/Header.js";
import "./Reviews.css";

const Reviews = () => {
    //Use hooks
    const [game, setGame] = useState();
    const [reviews, setReviews] = useState([]);
    const [userrating, setUserrating] = useState("");
    const [avgrating, setAvgrating]=useState();
    const GameID = useParams().GameID;
    const revText = useRef();

    //Get the game information
    const getStart = async (GameID) =>{
        const response = await api.get(`/api/v1/games/${GameID}`);
       
        setGame(response.data[0]);
        const response1=await api.get(`/api/v1/reviews/${GameID}`);
       
        setReviews(response1.data);
        const response2=await api.get(`/api/v1/averating/${GameID}`);
        setAvgrating(response2.data);
        const userkey = localStorage.getItem("userkey");
       
        const response3=await api.post('/api/v1/updateHistory',{
            headers: {
                Authorization: `Bearer ${userkey}`,
            },GameID
        });
       
            
    }

    //Post the reviews
    const postReview = async (e) =>{
        e.preventDefault();
        const textarea = revText.current;
        const userkey = localStorage.getItem("userkey");
        const response = await api.post("/api/v1/reviews",{headers: {
            Authorization: `Bearer ${userkey}`,
          },reviewBody:textarea.value,GameID:GameID,userrating:userrating});

        
        alert(response.data);
        
        const updatedReviews = [...reviews, {body:textarea.value}];

        textarea.value = "";

        setReviews(updatedReviews);
        setUserrating(0);
    
    }

    //The function to run when mounted
    useEffect(() => {getStart(GameID);},[])
    return (
        <div>
        <Header/>
        <Container style={{"margin":"20px"}}>
            <section style={{ backgroundImage: `url(${game?.BackgroundImage})` }}>
            <Row>
                <Col><h1 style={{"padding-bottom":"20px"}} className='word'>Reviews</h1></Col>
            </Row>
            <Row className="post">
                <Col>
                    <h2  className='word'>{game?.GameName}</h2>
                    <section className='poster'>
                    <img src={game?.PosterImage} alt="" />
                    </section>
                    <Row>
                            
                            {game?.PriceFinal < game?.PriceInitial ? (
                            <div>
                                <section className="post5">
                                <del><h5>Original price: ${game?.PriceInitial} </h5></del>
                                </section>
                                <section className="post6">
                                <h5> Price after discount: ${game?.PriceFinal} </h5>
                                </section>
                            </div>
                            ):(
                                <div>
                                    <section className="post5">
                                <h4>Price: ${game?.PriceInitial} No discount </h4>
                                </section>
                                </div>
                            )}
                            {game?.PurchaseLink[0]=="h" ?(
                                <div>
                                    <section className="post7">
                                    <h5>Purchase Link: {game?.PurchaseLink}</h5>
                                    </section>
                                </div>
                            ):(
                                <div>
                                    <h5 className='post7'>No available purchase link</h5>
                                </div>
                            )}
                             </Row>
                             <Row>
            <h5 className='post3'>
                Supported Languages: {game?.SupportedLanguages} 
            </h5>
            
            <h5 className='post4'>
                Release Date: {game?.ReleaseDate}
            </h5>
            <Row>
                <Col>
                <h5>Platforms:</h5>
                </Col>
                <Col>
                {game?.PlatformWindows==1?(
                    <div>
                        <h5  className='word'>Windows</h5>
                    </div>
                ):(<div className='word'><del><h5>Windows</h5></del></div>)}</Col>
                <Col>
                {game?.PlatformLinux==1?(
                    <div>
                        <h5 className='word'>Linux</h5>
                    </div>
                ):(<div className='word'><del><h5>Linux</h5></del></div>)}</Col>
                <Col>
                {game?.PlatformMac==1?(
                    <div >
                        <h5 className='word'>Mac</h5>
                    </div>
                ):(<div className='word'><del><h5>Mac</h5></del></div>)}</Col>
            </Row>
            </Row>
                </Col>
                
                <Col className='post2'>
                    <Row>
                        <h4 className='word'>Description</h4>
                        <text className='word' >{game?.DetailedDescription} </text>
                    </Row>
                    <Row className='post9'>
                        <h4 className='word'>People Recommend: {game?.SteamRecommendationCount}</h4>
                        <section className="Reviewform2">
                            <h5 className='word'>Average rating: {avgrating? avgrating[0].avgrate: 0}</h5>
                         </section>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            </section>
            <Row>
                <Col>
                {
                        <>
                            <Row>
                            <Col/>
                            <Col/>
                            <Col/>
                            <Col/>
                            <Col>
                            <label htmlFor="Rating" className='Rating'>Rating:</label>
                            </Col>
                            <Col>
                                
                                <input type="number" value={userrating} style={{"textAlign": 'center'}} onChange={(e) => setUserrating(Math.min(Math.max(e.target.value, 0), 10))} className="form-control form-control-sm" />
                            </Col>
                            <Col/>
                            <Col/>
                            <Col/>
                            <Col/>
                            <Col/>
                            </Row>
                            <Row className="post8">
                                <Col>
                                <ReviewForm handleSubmit={postReview}  revText={revText} labelText = "Write a Review?" />  
                                </Col>
                            </Row>
                           
            
                           
                        </>
                    }
                                
                </Col>
            </Row>
            
            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
            <Row>
                {
                        reviews?.map((r) => {
                            return(
                                <div style={{"padding-bottom":"10px"}}>
                                    <Row>
                                        <Col sm="2">{r.Username}</Col>
                                        <Col sm="10">{new Date(r.time).toLocaleString()}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="2"> </Col>
                                        <Col sm="10">{r.ReviewComment}</Col>
                                    </Row>  
                                    <Row>
                                        <Col sm="2"> </Col>
                                        <Col sm="10">
                                        <section className="Reviewform">
                                        <h5>Rating {r.Rating}</h5>
                                        </section>
                                        </Col>        
                                    </Row>   
                                    <hr/>                    
                                </div>
                            )
                        })
                    }
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>        
        </Container>
    </div>
    )
}


export default Reviews


