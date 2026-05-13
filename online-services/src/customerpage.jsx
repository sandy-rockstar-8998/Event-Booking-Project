import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';


function CustomerEvent({type}){
    const [events, setEvents]= useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/events/?type=${type}`)
        .then(res => res.json())
        .then((data) => {
            console.log("DATA:", data);
            setEvents(data);
        })
        .catch((err) => console.error(err));
    }, [type]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/form");
  }; 

    return(
        <>
        <Button style={{marginLeft:"800px"}} variant="success" onClick={handleSubmit}>Book Your Event</Button>
        <div style={{display:"flex", flexWrap:"wrap", gap:"40px"}}>
            {events.map((e) => (
                <div key={e.id}>
                    <Row style={{gap:"20px"}}>
                    <Card style={{ width: '18rem'}} className='my-2'>
                        <Card.Img variant="top" src={e.image} height="200px" width="180px"/>
                        <Card.Body>
                            <Card.Title>{e.title || "No Title"}</Card.Title><hr/>
                            <Card.Text as="div">
                            <h6>Includes: {e.description || "No Description"}  </h6>
                            <strong style={{textDecoration:"underline"}}>PRICE:</strong>
                            <h5 style={{textDecoration:"line-through", color:"red", fontWeight:"700"}}>Rs.{e.price || 0}/-</h5>
                            Offer Price : <h3 style={{color:"green", fontWeight:"800"}}>Rs.{e.offer_price || 0}/-</h3>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                     </Row>
                </div>
            ))}
           
        </div>
        
        </>
    )
}
export default CustomerEvent;