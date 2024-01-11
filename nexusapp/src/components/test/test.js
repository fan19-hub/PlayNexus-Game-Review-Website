import React, { useState, useMemo, useCallback } from 'react';
// Import the DataListInput component
import DataListInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css'
import "./test.css"
import { Col, Form, Row } from 'react-bootstrap';
// Your data source



const Test = () => {
  const [minPrice,setMinPrice]=useState(0);
  const [maxPrice,setMaxPrice]=useState(1000000000);
  const onMinPriceChange=(e)=>{
    setMinPrice(e.target.value);
  };
  const onMaxPriceChange=(e)=>{
    setMinPrice(e.target.value);
  };

  return (
    <Form>
    <Form.Group as={Row}>
      <Form.Label column sm="3">
        Price Range:
      </Form.Label>
      <Col sm="4">
        <Form.Control type="number" placeholder="Min Price" value={minPrice} onChange={onMinPriceChange} />
      </Col>
      <Col sm="1">
        <Form.Text className="text-center">
        <hr/>
        </Form.Text>
      </Col>
      <Col sm="4">
        <Form.Control type="number" placeholder="Max Price" value={maxPrice} onChange={onMaxPriceChange} />
      </Col>
    </Form.Group>
    </Form>
);
};
export default Test;


// import React from 'react';
// import { Dropdown, Image } from 'react-bootstrap';

// function APP() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="light" id="dropdown-basic">
//         <Image src="path/to/profile-picture.jpg" roundedCircle />
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Add profile</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Your repositories</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Your organizations</Dropdown.Item>
//         <Dropdown.Item href="#/action-4">Your enterprises</Dropdown.Item>
//         <Dropdown.Item href="#/action-5">Your sponsors</Dropdown.Item>
//         <Dropdown.Item href="#/action-6">Try Enterprise</Dropdown.Item>
//         <Dropdown.Item href="#/action-7">Upgrade</Dropdown.Item>
//         <Dropdown.Item href="#/action-8">Logout</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }
// export default APP;