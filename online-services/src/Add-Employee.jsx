import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddEmployee(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        gender: "",
        dob:"",
        age:"",
        address:"",
        qualification:"",
        alternumber:"",
        status:"",
        salary:"",
        join_date:"",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Valid email required";
        if (formData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
        if (formData.alternumber.length !== 10) newErrors.alternumber = "Phone number must be 10 digits";
        if (!formData.department) newErrors.department = "Select department";
        if (!formData.qualification) newErrors.qualication = "Enter Your Qualification";
        if (!formData.address) newErrors.address = "Enter Your Address";
        if (!formData.gender) newErrors.gender = "Select gender";
        if (!formData.age) newErrors.age = "Enter Your Valid Age ";
        if (!formData.salary === 0) newErrors.salary = "Enter Your Salary ";
        if (!formData.join_date) newErrors.join_date = "Enter Your Joining Date ";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try{
            const res = await fetch ("http://127.0.0.1:8000/employees/", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            alert(data.message);
            setFormData({
                name: "",
                email: "",
                phone: "",
                department: "",
                gender: "",
                dob:"",
                age:"",
                address:"",
                qualification:"",
                alternumber:"",
                status:"",
                salary:"",
                join_date:"",
            });
            setErrors({});
        } catch (err) {
            console.error(err);
        }
    };
        const inputStyle = {
            padding : "8px",
            margin: "10px",
            width: "100%",
            borderRadius:"4px",
            border:"1px solid black"
        };

    return(
        <div className="container">
      <h2 className="mt-3">Employee Register Form</h2><hr/>
        <div style={{padding :"20px", fontFamily:"times"}}>
        <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Name : </strong></label>
                <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.name}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Email :</strong></label>
                <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <p style={{color:"red"}}>{errors.email}</p>
            <div>
            <label><strong>Gender :</strong></label>
                <input className="mx-2" type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
                <input className="mx-2" type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />Female
                <input className="mx-2" type="radio" name="gender" value="Others" checked={formData.gender === "Others"} onChange={handleChange} />Others
            </div>
            <p style={{color:"red"}}>{errors.gender}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Date Of Birth :</strong></label>
                <input style={inputStyle} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.dob}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Age :</strong></label>
                <input style={inputStyle} type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.age}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Full Address :</strong></label>
                <textarea style={inputStyle} id="address" cols="155" rows="5" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.address}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Educational Qualification :</strong></label>
                <input style={inputStyle} type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.qualication}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Mobile Number :</strong></label>
                <input style={inputStyle} type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.phone}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Emergency/Alternate Contact Number :</strong></label>
                <input style={inputStyle} type="text" name="alternumber" value={formData.alternumber} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.alternumber}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Marital Status :</strong></label>
                <select  style={inputStyle} name="status" value={formData.status} onChange={handleChange}>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Widow">Widow</option>
                </select>
            </div>
            <p style={{color:"red"}}>{errors.status}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Department :</strong></label>
                <select  style={inputStyle} name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select Your Department</option>
                <option value="Event Management">Event Management</option>
                <option value="Security and Compliance">Security & Compliance</option>
                <option value="Notification and Communication">Notification & Communication</option>
                <option value="Finance">Finance</option>
                </select>
            </div>
            <p style={{color:"red"}}>{errors.department}</p>            
            <div style={{marginBottom:"10px"}}>
                <label><strong> Salary :</strong></label>
                <input style={inputStyle} type="number" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.salary}</p>
            <div style={{marginBottom:"10px"}}>
                <label><strong> Joining Date :</strong></label>
                <input style={inputStyle} type="date" name="join_date" value={formData.join_date} onChange={handleChange} required />
            </div>
            <p style={{color:"red"}}>{errors.join_date}</p>
            <Button variant="primary" type="submit">Add Employee</Button>
        </form>
    </div>
    </div>
    )
}
export default AddEmployee;


  

