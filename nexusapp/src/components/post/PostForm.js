import {Form,Button} from 'react-bootstrap';

const PostForm = ({handleSubmit,revText,labelText,defaultValue}) => {
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
    </Form>   

  )
}

export default PostForm
// import { useEffect, useState } from 'react';
// import {Form,Button} from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import api from "../../api/axiosConfig"

// const ReviewForm = ( {handleSubmit, revText}) => {

// return (
//   <Form>
//     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Write your comment here:</Form.Label>
//         <Form.Control rev={revText} as="textarea" rows={3} defaultValue={null} />
//     </Form.Group>
//     <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
//   </Form>   

// )
// }

// export default PostForm
