import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import EmployeeDetails from './Emp-Profile';
import TotalBooking from './TotalBooking';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaPowerOff } from "react-icons/fa6";
// import CreateEvent from './create-events';
import EventEntry from './Admin-event-reg';
import ContactMessages from './ContactMessages';

function AdminDashboard(){
   const navigate = useNavigate();
   const [user, setUser] = useState("");
    
   useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/");
    } else{
      setUser(username);
    }
   },[])

   const handleLogout = async () => {
    try{
    await fetch("http:127.0.0.1:8000/logout/");
    }catch (err) {
      console.error(err);
    }
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

    return(
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h3 className='m-4'>Admin Dashboard</h3>
          <div style={{margin:"30px"}}>
            <span style={{marginRight:"10px", fontSize:"20px", color:"Highlight"}}>
              Welcome, {user}
            </span>
            <Button variant="danger" onClick={handleLogout} style={{marginLeft:"10px"}}><FaPowerOff /> Logout</Button>
          </div>
        </div><hr/>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column ms-5 mt-2">
            <Nav.Item>
              <Nav.Link eventKey="first">Total Bookings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Employee Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Create Events</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Contact Messages</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><TotalBooking/></Tab.Pane>
            <Tab.Pane eventKey="second"><EmployeeDetails/></Tab.Pane>
            <Tab.Pane eventKey="third"><EventEntry/></Tab.Pane>
            <Tab.Pane eventKey="fourth"><ContactMessages/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    )
}
export default AdminDashboard;