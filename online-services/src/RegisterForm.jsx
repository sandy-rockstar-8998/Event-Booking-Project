import { useState, useEffect, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";

const EVENT_TYPE_OPTIONS = [
    { label: "Birthday Event", value: "birthday" },
    { label: "Marriage Event", value: "marriage" },
    { label: "Baby Shower Event", value: "babyshower" },
    { label: "Cultural Event", value: "cultural" },
];

function FormExample() {
    const navigate = useNavigate();
    const location = useLocation();
    const [allEvents, setAllEvents] = useState([]);
    const [selectedEventType, setSelectedEventType] = useState("");

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        category: "",
        price: "",
        e_date: "",
        mobilenumber: "",
        address: "",
        landmark: "",
        district: "",
        state: "",
        city: "",
        pincode: "",
    });

    const filteredEvents = useMemo(() => {
        if (!selectedEventType) return [];
        return allEvents.filter((e) => e.event_type === selectedEventType);
    }, [allEvents, selectedEventType]);

    useEffect(() => {
        const fetchEventList = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/events/");
                const data = await res.json();
                setAllEvents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error loading events:", error);
            }
        };
        fetchEventList();
    }, []);

    useEffect(() => {
        if (location.state) {
            setFormData(location.state);
        }
    }, [location.state]);

    useEffect(() => {
        if (!allEvents.length || !formData.category) return;
        const match = allEvents.find((e) => e.title === formData.category);
        if (match?.event_type) {
            setSelectedEventType(match.event_type);
        }
    }, [allEvents, formData.category]);

    useEffect(() => {
        if (formData.category) {
            const selectedEvent = allEvents.find((eventItem) => eventItem.title === formData.category);
            setFormData((prev) => ({
                ...prev,
                price: selectedEvent ? `Rs. ${selectedEvent.price}/-` : "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                price: "",
            }));
        }
    }, [formData.category, allEvents]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "eventType") {
            setSelectedEventType(value);
            setFormData((prev) => ({
                ...prev,
                category: "",
                price: "",
            }));
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = formData.id ? "PUT" : "POST";
            const res = await fetch('http://127.0.0.1:8000/registerEvent/', {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            let payload = { ...formData };
            if (method === "POST") {
                payload.id = data.id;
            }
            navigate("/preview", { state: payload });
            alert("Form Submitted Successfully...")

        } catch (error) {
            console.error(error);
            alert("Error submitting form")
        }
    };
    const inputStyle = {
        padding: "8px",
        margin: "10px",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid black"
    };
    return (
        <div className="container" style={{ padding: "20px", fontFamily: "times" }}>
            <h2>Book your Event</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Name : </strong></label>
                    <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Event type :</strong></label>
                    <select style={inputStyle} name="eventType" value={selectedEventType} onChange={handleChange} required>
                        <option value="">Select event type</option>
                        {EVENT_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Category :</strong></label>
                    <select style={inputStyle} name="category" value={formData.category} onChange={handleChange} required disabled={!selectedEventType} >
                        <option value="">
                            {selectedEventType ? "Select Your Choice" : "Select an event type first"}
                        </option>
                        {filteredEvents.map((eventItem) => (
                            <option key={eventItem.id} value={eventItem.title}>
                                {eventItem.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Price :</strong></label>
                    <input style={inputStyle} type="text" name="price" value={formData.price} readOnly />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Event Date :</strong></label>
                    <input style={inputStyle} type="date" name="e_date" value={formData.e_date} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Mobile Number :</strong></label>
                    <input style={inputStyle} type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> House No./Flat No. and Street Name :</strong></label>
                    <input style={inputStyle} type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> LandMark :</strong></label>
                    <input style={inputStyle} type="text" name="landmark" value={formData.landmark} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Grama/Village/City :</strong></label>
                    <input style={inputStyle} type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong>District  :</strong></label>
                    <input style={inputStyle} type="text" name="district" value={formData.district} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> State :</strong></label>
                    <input style={inputStyle} type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label><strong> Pincode :</strong></label>
                    <input style={inputStyle} type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
                <Button variant="outline-primary" type="submit">{formData.id ? "Update" : "Submit"}</Button>
            </form>
        </div>
    )
}

export default FormExample;
