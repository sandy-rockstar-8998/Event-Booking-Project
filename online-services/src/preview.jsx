import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function PreviewData() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state || {};

  const handleEdit = () => {
        navigate("/form", {state: booking});
        
  };

  return (
    <div className='container mt-5'>  
    <h1 style={{textAlign:"center"}}>Preview Data</h1> 
    <hr/>   
      <Table striped>
      <tbody>
        <tr>
          <td>Name :</td>
          <td>{booking.name}</td>
        </tr>
        <tr>
          <td>Category :</td>
          <td>{booking.category}</td>
        </tr>
        <tr>
          <td>Mobile Number :</td>
          <td>{booking.mobilenumber}</td>
        </tr>
        <tr>
          <td>Event Date :</td>
          <td>{booking.e_date}</td>
        </tr>
        <tr>
          <td>House No./Flat No. and Street Name :</td>
          <td>{booking.address}</td>
        </tr>
        <tr>
          <td>LandMark :</td>
          <td>{booking.landmark}</td>
        </tr>
        <tr>
          <td>Grama/Village/City :</td>
          <td>{booking.city}</td>
        </tr>
        <tr>
          <td>District :</td>
          <td>{booking.district}</td>
        </tr>
        <tr>
          <td>State :</td>
          <td>{booking.state}</td>
        </tr>
        <tr>
          <td>Pincode :</td>
          <td>{booking.pincode}</td>
        </tr>
        <tr>
          <td>Price :</td>
          <td style={{color:"green", fontWeight:"1000", fontSize:"30px"}}>{booking.price}</td>
        </tr>
      </tbody>
    </Table>
      <Button className="me-5"variant="primary" onClick={handleEdit}>Edit</Button>
      <a href='' style={{textDecoration:"none"}}onClick={() => navigate("/")}>Click here</a> to Home Page 
    </div>
  );
}

export default PreviewData;