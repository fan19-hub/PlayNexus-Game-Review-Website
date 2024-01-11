import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axiosConfig.js"
import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import MepostForm from './MepostForm.js';
import Header from "../header/Header.js";

const Mepost = () => {
    //Use hooks
    const [game, setGame] = useState();
    const [reviews, setReviews] = useState([]);
    const GameID = useParams().GameID;
    const revText = useRef();
    

    //Get the game information
    const getGame = async (GameID) =>{
        try {
            const response = await api.get(`/api/v1/games/${GameID}`);
            debugger
            setGame(response.data[0]);
            // const response = await api.get(`/api/v1/reviews/${GameID}`);
            // setReviews(response.data.reviews)
        }
        catch(err) {
            console.log(err);
        }
    }

    //Post the reviews
    const postReview = async (e) =>{
        e.preventDefault();
        const textarea = revText.current;
        const userkey = localStorage.getItem("userkey");
        const content=textarea.value;
        debugger
        const response = await api.post("/api/v1/mepost",{headers: {
            Authorization: `Bearer ${userkey}`,
          },content});

        // const updatedReviews = [...reviews, {body:textarea.value}];

        textarea.value = "";

        // setReviews(updatedReviews);
    
    }

    //The function to run when mounted
    // useEffect(() => {getGame(GameID);},[])

    return (
        <div style={{"--img": `url(https://i.ytimg.com/vi/pL0SLptf00I/maxresdefault.jpg)`, "background-image": "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), var(--img)", "height":"100vh"}}>
        <Header/>
        <Container className='mepost' style={{"margin-top":"40px"}}>
            <Row>
                <Col><h1 style={{"color":"white","font-weight":"bold"}}>Post something?</h1></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                <MepostForm handleSubmit={postReview} revText={revText}  />  
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return(
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>                       
                                </>
                            )
                        })
                    }
                </Col>
            </Row>  
        </Container>
    </div>
    )
}


export default Mepost


