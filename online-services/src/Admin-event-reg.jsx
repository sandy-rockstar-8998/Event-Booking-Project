import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function EventEntry(){

    const [event, setEvent] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [form, setForm]= useState({
        title:"",
        description:"",
        event_type:"",
        price:"",
        offer_price:"",
        image:"",
    });

    const [editId, setEditId] = useState(null);

    const fetchEvents = async () => {
        try{
        const res = await fetch("http://127.0.0.1:8000/events/");
        const data = await res.json();
        setEvent(data);
        setFilteredData(data);
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const applyFilter = (type) => {
        setFilterType(type);
        if (type === "all"){
            setFilteredData(event);
        }else {
            const filtered = event.filter((item) => item.event_type === type);
            setFilteredData(filtered);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await fetch(`http://127.0.0.1:8000/update-event/${editId}/`,{
                method: "PUT",
                headers: {"Content-Type": "applicatiob/json"},
                body: JSON.stringify(form)
            });
            setEditId(null);
        }else {
            await fetch("http://127.0.0.1:8000/create-event/", {
                method: "POST",
                headers:{"Content-Type": "applicatiob/json"},
                body: JSON.stringify(form)
            });
        }

        setForm({
            title:"",
            description:"",
            event_type:"",
            price:"",
            offer_price:"",
            image:"",
        });
        fetchEvents();
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`http://127.0.0.1:8000/delete-event/${id}/`, {
            method: "DELETE"
        });
        fetchEvents();
    };


    return(
        <div>
            <h2>Event Register</h2><hr/>
            <form onSubmit={handleSubmit}>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Title">
                        <Form.Control name="title" value={form.title || ""} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Event Type">
                            <Form.Select aria-label="Floating label select example" 
                                name="event_type" value={form.event_type || ""} onChange={handleChange}>
                                <option value="">Select Type</option>
                                    <option value="birthday">Birthday</option>
                                    <option value="babyshower">Baby Shower</option>
                                    <option value="marriage">Marriage</option>
                                    <option value="cultural">Cultural</option>
                            </Form.Select>
                        </FloatingLabel>                        
                    </Col>
                </Row><br/>
                <Row className="g-2">
                    <Col md>
                        <InputGroup>
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" rows="6" cols="100" 
                            name="description" value={form.description || ""} onChange={handleChange}/>
                        </InputGroup>
                    </Col>
                    </Row><br/>
                    <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Price">
                        <Form.Control name="price" value={form.price || ""} 
                        onChange={(e) => setForm({...form, price: Number(e.target.value)})} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Offer Price">
                        <Form.Control name="offer_price" value={form.offer_price || ""} 
                        onChange={(e) => setForm({...form, offer_price: Number(e.target.value)})} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Image">
                        <Form.Control name="image" value={form.image || ""} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                </Row><br/>
                <Button style={{marginLeft:"900px"}} variant="success" type="submit">{editId ? "Update Event" : "Create Event"}</Button>
            </form>
            <hr/>
            <div>
                <h2 style={{marginBottom:"25px"}}>Event Details</h2>
            <div style={{ marginBottom:"10px", textAlign:"center" }}>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => applyFilter("all")}>All Events</Button>
                    <Button variant="secondary" onClick={() => applyFilter("birthday")}>Birthday Events</Button>
                    <Button variant="secondary" onClick={() => applyFilter("marriage")}>Marriage Events</Button>
                    <Button variant="secondary" onClick={() => applyFilter("babyshower")}>Baby Shower Events</Button>
                    <Button variant="secondary" onClick={() => applyFilter("cultural")}>Cultural Events</Button>
                </ButtonGroup>
            </div>
                <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Event Type</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((e) => (
                            <tr key={e.id}>
                            <td>{e.title}</td>
                            <td>{e.description}</td>
                            <td>{e.event_type}</td>
                            <td>{e.price}</td>
                            <td>{e.offer_price}</td>
                            <td>
                                <Button className='mb-2 mt-2' variant="info"  onClick={() => handleEdit(e)}><FaEdit /></Button> 
                                <Button variant="danger" onClick={() => handleDelete(e.id)}><MdDelete /></Button>
                            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9"> No Event Found</td>
                        </tr>
                    )}
                </tbody>
            </Table>  
            </div>       
        </div>  
    );
}
export default EventEntry;