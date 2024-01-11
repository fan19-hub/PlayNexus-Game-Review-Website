import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axiosConfig.js"
import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
// import ReviewForm from './ReviewForm';
import Header from "../header/Header.js";
import "./profile.css";

const Profile = () => {
    //Use hooks
    const [proinfo, setProfile] = useState();
    // const [reviews, setReviews] = useState([]);
    // const [userrating, setUserrating] = useState("");
    // const [avgrating, setAvgrating]=useState();
    // const GameID = useParams().GameID;
    // const revText = useRef();

    //Get the game information
    const getStart = async () =>{
        const userkey = localStorage.getItem("userkey");
        debugger
        const response = await api.get('/api/v1/profile',{headers: {
            Authorization: `Bearer ${userkey}`,
        }});
       
        setProfile(response.data[0]);
        // const response1=await api.get(`/api/v1/reviews/${GameID}`);
       
        // setReviews(response1.data);
        // const response2=await api.get(`/api/v1/averating/${GameID}`);
        // setAvgrating(response2.data);
        // 
       
        // const response3=await api.post('/api/v1/updateHistory',{
        //     headers: {
        //         Authorization: `Bearer ${userkey}`,
        //     },GameID
        // });
       
            
    }

    //Post the reviews
    // const postReview = async (e) =>{
    //     e.preventDefault();
    //     const textarea = revText.current;
    //     const userkey = localStorage.getItem("userkey");
    //     const response = await api.post("/api/v1/reviews",{headers: {
    //         Authorization: `Bearer ${userkey}`,
    //       },reviewBody:textarea.value,GameID:GameID,userrating:userrating});

        
    //     alert(response.data);
        
    //     const updatedReviews = [...reviews, {body:textarea.value}];

    //     textarea.value = "";

    //     setReviews(updatedReviews);
    //     setUserrating(0);
    
    // }

    //The function to run when mounted
    useEffect(() => {getStart();},[])
    
    return (
        <div >
        <Header/>
        <div className="bg" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_52683-66117.jpg?w=996&t=st=1700201506~exp=1700202106~hmac=584b782e34941423408c68320c1a6cc5302e221bfaa19892876307aba99a814e")` }}>
        <Container style={{"margin":"20px"}}>
            <Row >
                <h1 className='info1' style={{"padding-bottom":"20px"}}>Profile</h1>
            </Row>
            <Row>
                <Col>
                </Col>
                <Col>
                <h4 className='info2'>
                    Username: {proinfo?.Username}
                </h4>
                </Col>
                <Col>
                </Col>
            </Row>    
            <Row>
                <Col>
                </Col>
                <Col>
                <h4 className='info2'>
                    Email: {proinfo?.Email}
                </h4>
                </Col>
                <Col>
                </Col>
            </Row>  
            <Row>
                <Col>
                </Col>
                <Col>
                {proinfo?.Gender==1 ? (
                            <div>
                               <h4 className='info2'>
                                 Gender: Female
                                </h4>
                            </div>
                            ):(
                                <div>
                                <h4 className='info2'>
                                  Gender: Male
                                 </h4>
                             </div> 
                            )}
                
                </Col>
                <Col>
                </Col>
            </Row>  
            <Row>
                <Col>
                </Col>
                <Col>
                <h4 className='info2'>
                    Age: {proinfo?.Age}
                </h4>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
                <Col>
                <h4 className='info2'>
                    Prefered Game Language: {proinfo?.UserLanguage}
                </h4>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    </div>
    </div>
    )
}


export default Profile


