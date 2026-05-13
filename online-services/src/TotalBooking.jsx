import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function TotalBooking() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState("all");

    const fetchData = async () =>{
        try{
            const res = await fetch ("http://127.0.0.1:8000/registerEvent/");
            const result = await res.json();
            setData(result);
            setFilteredData(result);
        }catch (err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const applyFilter = (type) => {
        setFilterType(type);
        const today = new Date().toISOString().split("T")[0];
        if (type === "upcoming"){
            const upcoming = data.filter((item) => item.e_date >= today);
            setFilteredData(upcoming);
        }else if (type === "past"){
            const past = data.filter((item) => item.e_date < today);
            setFilteredData(past);
        }else {
            setFilteredData(data);
        }
    };

    return(
        <div>
        <h2>Total Booking's</h2>
        <div style={{ marginBottom:"10px", textAlign:"center" }}>
            <ButtonGroup aria-label="Basic example">
               <Button variant="secondary" onClick={() => applyFilter("all")}>All Events</Button>
               <Button variant="secondary" onClick={() => applyFilter("upcoming")}>Upcming Events</Button>
               <Button variant="secondary" onClick={() => applyFilter("past")}>Past Events</Button>
            </ButtonGroup>
        </div>
        <hr/>
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Event Date</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Landmark</th>
                    <th>City</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Pincode</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length > 0 ?(
                    filteredData.map((item) =>(
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.e_date}</td>
                        <td>{item.mobilenumber}</td>
                        <td>{item.address}</td>
                        <td>{item.landmark}</td>
                        <td>{item.city}</td>
                        <td>{item.district}</td>
                        <td>{item.state}</td>
                        <td>{item.pincode}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No data found</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    )
    
};
export default TotalBooking;