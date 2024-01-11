import './Trailer.css'
import React from 'react'
import {useParams} from 'react-router-dom'
// import ReactPlayer from 'react-player'

const Trailer = () => {
    const Param = useParams()
    const trailerId = Param.ytTrailerId
    return (
        <div className="react-player-container">
        {
        (trailerId!=null)?
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true" ></iframe>
        :null
        // (trailerId!=null)?
        // <ReactPlayer controls="true" playing={true} url ={`https://www.youtube.com/watch?v=${trailerId}`} width="100%" height="100%"/>
        // :null
        }
        </div>
    )
}

export default Trailer