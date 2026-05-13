import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function EmployeeDetails(){
    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/add_employee")
    };
    
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [filterData, setFilterData] = useState([]);

    const fetchEmployees = async () => {
        try{
            const res = await fetch("http://127.0.0.1:8000/employees/");
            const result = await res.json();
            setData(result);
            setFilterData(result);
        }catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [])

    const filteredData = data.filter((emp) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase());
        const matchesDept =
            departmentFilter === "" || emp.department === departmentFilter;
            
        return matchesSearch && matchesDept;    
    });
    
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete employee..?")) return;
        try{
            await fetch("http://127.0.0.1:8000/employees/", {
                method : "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id}),
            });
            fetchEmployees();
        }catch(err) {
            console.error(err);
        }
    };

    const handleEdit = (emp) => {
        setEditData({...emp});
    };

    const handleCancel = () => {
        setEditData(null);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            await fetch("http://127.0.0.1:8000/employees/", {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editData),
            });
            setEditData(null);
            fetchEmployees();
        }catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
    <div>
        <div className='container' style={{display:"flex"}}>
                <h3 style={{paddingRight:"100px"}}>EMPLOYEE DETAILS</h3>
                <input type='text' placeholder='Search by name or email' value={search} onChange={(e) => setSearch(e.target.value)}
                style={{marginRight:"50px", borderRadius:"10px", width:"250px"}}/>
                <select name="department" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Security and Compliance">Security & Compliance</option>
                    <option value="Notification and Communication">Notification & Communication</option>
                    <option value="Finance">Finance</option>
                </select> 
                <Button variant='dark' style={{marginLeft:"70px"}} onClick={handleAdd}><FaPlus /> Add Employee</Button>
        </div><hr/>
        {editData !== null && (
            <form onSubmit={handleUpdate} style={{marginBottom:"20px", border:"1px solid #ccc", padding:"15px", borderRadius:"8px"}}>
            <h3>Edit Employee</h3>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Name">
                        <Form.Control name='name' value={editData.name} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Email">
                        <Form.Control name='email' value={editData.email} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <label>Gender :</label>
                        <input className="mx-2" type="radio" name="gender" value="Male" checked={editData.gender === "Male"} onChange={handleChange} /> Male
                        <input className="mx-2" type="radio" name="gender" value="Female" checked={editData.gender === "Female"} onChange={handleChange}/> Female
                        <input className="mx-2" type="radio" name="gender" value="Others" checked={editData.gender === "Others"} onChange={handleChange} /> Others
                    </Col>
                </Row>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Date Of Birth">
                        <Form.Control name='dob' value={editData.dob} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Age">
                        <Form.Control name='age' value={editData.age} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Qualification">
                        <Form.Control name='qualification' value={editData.qualification} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Mobile Number">
                        <Form.Control name='phone' value={editData.phone} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Alter Mobile Number">
                        <Form.Control name='alternumber' value={editData.alternumber} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Marital Status">
                            <Form.Select aria-label="Floating label select example" 
                                    name="status" value={editData.status} onChange={handleChange}>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                                <option value="Widow">Widow</option>
                            </Form.Select>
                        </FloatingLabel>                        
                    </Col>
                </Row>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Address">
                        <Form.Control name='address' value={editData.address} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Department">
                            <Form.Select aria-label="Floating label select example" 
                                        name="department" value={editData.department} onChange={handleChange}>
                                <option value="Event Management">Event Management</option>
                                <option value="Security and Compliance">Security & Compliance</option>
                                <option value="Notification and Communication">Notification & Communication</option>
                                <option value="Finance">Finance</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Salary">
                            <Form.Control name='salary' value={editData.salary} onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Join Date">
                            <Form.Control name='join_date' value={editData.join_date} onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <Button style={{margin:"20px",marginLeft:"150px"}} variant="success" type='submit'>Update</Button>
                            <Button style={{marginLeft:"30px"}}variant="danger" type='button' onClick={handleCancel}>Cancel</Button>
                        </Col>
                </Row>
            </form>
        )}
        
            <div>
            <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Date Of Birth</th>
                    <th>Age</th>
                    <th>Educational Qualification</th>
                    <th>Mobile Number</th>
                    {/* <th>Alternate Number</th> */}
                    <th>Address</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Salary</th>
                    <th>Joining Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((emp) => (
                        <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.dob}</td>
                        <td>{emp.age}</td>
                        <td>{emp.qualification}</td>
                        <td>{emp.phone}</td>
                        {/* <td>{emp.alternumber}</td> */}
                        <td>{emp.address}</td>
                        <td>{emp.department}</td>
                        <td>{emp.status}</td>
                        <td>{emp.salary}</td>
                        <td>{emp.join_date}</td>
                        <td>
                            <Button className='mb-2 mt-2' variant="info"  onClick={() => handleEdit(emp)}><FaEdit /></Button> 
                            <Button variant="danger" onClick={() => handleDelete(emp.id)}><MdDelete /></Button>
                        </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9"> No Employees Found</td>
                    </tr>
                )}
            </tbody>
        </Table>         
        </div>
    </div>
    );
}
export default EmployeeDetails;



