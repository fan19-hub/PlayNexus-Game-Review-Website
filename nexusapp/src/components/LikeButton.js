import React, { useState } from 'react';
import api from "../api/axiosConfig"
const LikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeClick = async ()  => {
    setLikes(likes + 1);
    var numlike=(likes+1);
    const response = await api.post('/api/v1/savelike', { postId, numlike});
  };

  return (
    <div>
      <button onClick={handleLikeClick}>Like</button>
      <p>{likes} {likes === 1 ? 'like' : 'likes'}</p>
    </div>
  );
};

export default LikeButton;