import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Signup(){

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://127.0.0.1:8000/signup/", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert("Signup Successfully...");
                navigate("/login")
            }else{
                setError(data.error);
            }
        }catch(err){
            console.error(err)
        }
    };

    return(
        <div className="container">
            <h2 style={{margin:"30px"}}>Sign Up </h2><hr/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address :</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email address" onChange={handleChange} />
                </Form.Group>
                {error && <p style={{color:'red'}}>{error}</p>}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username :</Form.Label>
                        <Form.Control  name="username" placeholder="Username" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password :</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Button variant="success" type="submit">Sign Up</Button>
            </Form>
        </div>
    )
};
export default Signup;